import React, { useEffect, useState } from "react";
import "./users.scss";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
        
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setError("Avtorizatsiya talab qilinadi!");
                setLoading(false);
                return;
            }
        
            try {
                const res = await fetch("https://online.raqamliavlod.uz/protected/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
        
                if (res.status === 401 || res.status === 403) { 
                    localStorage.removeItem("accessToken");
                    navigate("/not-found"); // Login sahifasiga yo'naltirish
                    return;
                }
        
                if (!res.ok) throw new Error("Foydalanuvchilarni yuklashda xatolik");
                
                const users = await res.json();
                setUsers(users.results);
        
                const checkedUsers = users.results.filter(user => user.see).map(user => user.id);
                setSelectedRows(checkedUsers);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
    
        fetchUsers();
    }, []);
    

    const toggleRowSelection = async (userId) => {
        const isCurrentlySelected = selectedRows.includes(userId);
        const newSelectedRows = isCurrentlySelected
            ? selectedRows.filter((id) => id !== userId)
            : [...selectedRows, userId];
    
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("Avtorizatsiya talab qilinadi!");
            return;
        }
    
        try {
            const response = await fetch(`https://online.raqamliavlod.uz/register/${userId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Tokenni qo'shish
                },
                body: JSON.stringify({ see: !isCurrentlySelected }),
            });
    
            if (!response.ok) {
                throw new Error("Ma'lumotni yangilashda xatolik yuz berdi");
            }
    
            setSelectedRows(newSelectedRows);
            setUsers(users.map(user =>
                user.id === userId ? { ...user, see: !isCurrentlySelected } : user
            ));
        } catch (error) {
            console.error("Xatolik:", error);
            setError(error.message);
        }
    };

    const handleExportExcel = () => {
        window.location.href = "https://online.raqamliavlod.uz/export_excel_data?password=root_user_12";
    };


    return (
        <div className="all-users">
            <h2>Ro'yxatdan o'tgan foydalanuvchilar 
                <button onClick={handleExportExcel}>
                    Excel faylni yuklab olish
                </button>
            </h2>
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
                                <td><Link to={`/users-list/${user.id}`}>{user.name}</Link></td>
                                <td><Link to={`/users-list/${user.id}`}>{user.surename}</Link></td>
                                <td><Link to={`/users-list/${user.id}`}>{user.middle_name}</Link></td>
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