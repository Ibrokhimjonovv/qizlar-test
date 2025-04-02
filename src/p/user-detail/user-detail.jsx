import React, { useEffect, useState } from 'react';
import "./user-detail.scss";
import { Link, useParams } from 'react-router-dom';
import "./user-detail.scss"

const UserDetail = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const res = await fetch(`https://online.raqamliavlod.uz/register/`);
                if (!res.ok) {
                    throw new Error("Foydalanuvchini yuklashda xatolik")
                }

                const users = await res.json();
                const fdata = users.find(user => Number(user.id) === Number(id))
                setUsers(fdata);

                const checkedUsers = users.filter(user => user.see).map(user => user.id);
                setSelectedRows(checkedUsers);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers();
    }, []);

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
        <div id='user-detail'>
            <h2>{users.name} - ma'lumotlari</h2>
            <div id='row'>
                <Link to="/users-list">Ortga qaytish</Link>
                <label htmlFor={`ch-${users.id}`}>
                    <input
                        type="checkbox"
                        id={`ch-${users.id}`}
                        checked={selectedRows.includes(users.id)}
                        onChange={() => toggleRowSelection(users.id)}
                    />
                    Ko'rilgan deb belgilash
                </label>
            </div>
            <div className="user-inner">
                {
                    !loading ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Ism
                                    </th>
                                    <th>
                                        {users.name}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Familiya
                                    </th>
                                    <th>
                                        {users.surename}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Sharif
                                    </th>
                                    <th>
                                        {users.middle_name}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Telefon raqami
                                    </th>
                                    <th>
                                        {users.phone_number}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Tug'ulgan sanasi
                                    </th>
                                    <th>
                                        {users.b_day}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Telegram (@username)
                                    </th>
                                    <th>
                                        {users.tg_username}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        {users.email}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        O'qish joyi
                                    </th>
                                    <th>
                                        {users.place_of_study}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Yo'nalish
                                    </th>
                                    <th>
                                        {users.direction}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Tavsiyanoma
                                    </th>
                                    <th>
                                        <a href={`https://online.raqamliavlod.uz${users.file}`} target='_blank'>
                                            {users.file && users.file.split("/").pop()}
                                        </a>
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Viloyat
                                    </th>
                                    <th>
                                        {users.province}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Tuman
                                    </th>
                                    <th>
                                        {users.district}
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Loyiha fayli
                                    </th>
                                    <th>
                                        <a href={`https://online.raqamliavlod.uz${users.project_file}`} target='_blank'>
                                            {users.project_file && users.project_file.split("/").pop()}
                                        </a>
                                    </th>
                                </tr>
                                <tr>
                                    <th>
                                        Loyiha haqida
                                    </th>
                                    <th>
                                        {users.about}
                                    </th>
                                </tr>

                            </thead>
                        </table>
                    ) : (
                        <h2>Yuklanmoqda</h2>
                    )
                }
            </div>
        </div>
    )
}

export default UserDetail