import React, { useEffect, useState } from 'react';
import "./user-detail.scss";
import { Link, useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("accessToken");
            if (!token) {
                setError("Avtorizatsiya talab qilinadi!");
                navigate("/not-found");
                return;
            }

            try {
                const res = await fetch(`https://online.raqamliavlod.uz/protected/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("accessToken");
                    navigate("/not-found");
                    return;
                }

                if (!res.ok) {
                    throw new Error("Foydalanuvchini yuklashda xatolik");
                }

                const users = await res.json();
                const fdata = users.results.find(user => Number(user.id) === Number(id));

                if (!fdata) {
                    throw new Error("Foydalanuvchi topilmadi!");
                }

                setUser(fdata);
                const checkedUsers = users.results.filter(user => user.see).map(user => user.id);
                setSelectedRows(checkedUsers);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, navigate]);

    const toggleRowSelection = async (userId) => {
        const isCurrentlySelected = selectedRows.includes(userId);
        const newSelectedRows = isCurrentlySelected
            ? selectedRows.filter((id) => id !== userId)
            : [...selectedRows, userId];

        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("Avtorizatsiya talab qilinadi!");
            navigate("/not-found");
            return;
        }

        try {
            const response = await fetch(`https://online.raqamliavlod.uz/register/${userId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    see: !isCurrentlySelected
                }),
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem("accessToken");
                navigate("/not-found");
                return;
            }

            if (!response.ok) {
                throw new Error("Ma'lumotni yangilashda xatolik yuz berdi");
            }

            setSelectedRows(newSelectedRows);
            setUser(prevUser => ({ ...prevUser, see: !isCurrentlySelected }));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id='user-detail'>
            {error && <h2 className="error">{error}</h2>}
            <h2>{user?.name} - ma'lumotlari</h2>
            <div id='row'>
                <Link to="/users-list">Ortga qaytish</Link>
                <label htmlFor={`ch-${user?.id}`}>
                    <input
                        type="checkbox"
                        id={`ch-${user?.id}`}
                        checked={selectedRows.includes(user?.id)}
                        onChange={() => toggleRowSelection(user?.id)}
                    />
                    Ko'rilgan deb belgilash
                </label>
            </div>
            <div className="user-inner">
                {!loading ? (
                    user ? (
                        <table>
                            <thead>
                                <tr><th>Ism</th><th>{user.name}</th></tr>
                                <tr><th>Familiya</th><th>{user.surename}</th></tr>
                                <tr><th>Sharif</th><th>{user.middle_name}</th></tr>
                                <tr><th>Telefon raqami</th><th>{user.phone_number}</th></tr>
                                <tr><th>Tug'ilgan sanasi</th><th>{user.b_day}</th></tr>
                                <tr><th>Telegram (@username)</th><th>{user.tg_username}</th></tr>
                                <tr><th>Email</th><th>{user.email}</th></tr>
                                <tr><th>O'qish joyi</th><th>{user.place_of_study}</th></tr>
                                <tr><th>Yo'nalish</th><th>{user.direction}</th></tr>
                                <tr>
                                    <th>Tavsiyanoma</th>
                                    <th>
                                        <a href={`https://online.raqamliavlod.uz${user.file}`} target='_blank' rel="noreferrer">
                                            {user.file && user.file.split("/").pop()}
                                        </a>
                                    </th>
                                </tr>
                                <tr><th>Viloyat</th><th>{user.province}</th></tr>
                                <tr><th>Tuman</th><th>{user.district}</th></tr>
                                <tr>
                                    <th>Loyiha fayli</th>
                                    <th>
                                        <a href={`https://online.raqamliavlod.uz${user.project_file}`} target='_blank' rel="noreferrer">
                                            {user.project_file && user.project_file.split("/").pop()}
                                        </a>
                                    </th>
                                </tr>
                                <tr><th>Loyiha haqida</th><th>{user.about}</th></tr>
                            </thead>
                        </table>
                    ) : (
                        <h2>Foydalanuvchi topilmadi</h2>
                    )
                ) : (
                    <h2>Yuklanmoqda...</h2>
                )}
            </div>
        </div>
    );
}

export default UserDetail;
