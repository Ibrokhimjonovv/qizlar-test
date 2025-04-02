import React, { useEffect, useState } from "react";
import "./users.scss";
import { Link } from "react-router-dom";

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://online.raqamliavlod.uz/register/");
                if (!res.ok) throw new Error("Foydalanuvchilarni yuklashda xatolik");
                const users = await res.json();
                setUsers(users);

                // Serverdan kelgan foydalanuvchilardan see=true bo'lganlarni tanlanganlar ro'yxatiga qo'shamiz
                const checkedUsers = users.filter(user => user.see).map(user => user.id);
                setSelectedRows(checkedUsers);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Tanlangan qatorlarni yangilash va serverga yuborish
    const toggleRowSelection = async (userId) => {
        const isCurrentlySelected = selectedRows.includes(userId);
        const newSelectedRows = isCurrentlySelected
            ? selectedRows.filter((id) => id !== userId)
            : [...selectedRows, userId];

        try {
            // Serverga faqat o'zgartirilayotgan foydalanuvchini yuboramiz
            const response = await fetch(`https://online.raqamliavlod.uz/register/${userId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    see: !isCurrentlySelected
                }),
            });

            if (!response.ok) {
                throw new Error("Ma'lumotni yangilashda xatolik yuz berdi");
            }

            // Agar serverdan javob OK bo'lsa, state ni yangilaymiz
            setSelectedRows(newSelectedRows);

            // Users state ni ham yangilaymiz
            setUsers(users.map(user =>
                user.id === userId ? { ...user, see: !isCurrentlySelected } : user
            ));
        } catch (error) {
            console.error("Xatolik:", error);
            setError(error.message, "Internet muammosi");
        }
    };

    return (
        <div className="all-users">
            <h2>Ro'yxatdan o'tgan foydalanuvchilar</h2>
            {error && <div className="error">{error}</div>}
            {loading && <div>Yuklanmoqda...</div>}
            <div className="users-inner">
                <table>
                    <thead>
                        <tr>
                            <th>Ism</th>
                            <th>Familiya</th>
                            <th>Sharifi</th>
                            <th>Ko'rilgan deb belgilash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className={selectedRows.includes(user.id) ? "active" : ""}
                            >
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td><Link to={`/users/${user.id}`}>{user.surename}</Link></td>
                                <td><Link to={`/users/${user.id}`}>{user.middle_name}</Link></td>
                                <td>
                                    <label htmlFor={`ch-${user.id}`}>
                                        <input
                                            type="checkbox"
                                            id={`ch-${user.id}`}
                                            checked={selectedRows.includes(user.id)}
                                            onChange={() => toggleRowSelection(user.id)}
                                        />
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;