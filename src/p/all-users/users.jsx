import React, { useEffect, useState } from "react";
import "./users.scss";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [uCount, setUCount] = useState(0)
    const [selectedRows, setSelectedRows] = useState([]);
    const [pagination, setPagination] = useState({
        next: null,
        previous: null,
        count: 0,
        currentPage: 1,
        totalPages: 0, // Buni 0 dan boshlaymiz
        itemsPerPage: 40 // Hardcode qilamiz, chunki API har doim 100 ta qaytarayotgan
    });
    const navigate = useNavigate()

    const fetchUsers = async (urlOrPage) => {
        let url;
        if (typeof urlOrPage === 'number') {
            url = `https://online.raqamliavlod.uz/protected/?page=${urlOrPage}`;
        } else {
            url = urlOrPage || "https://online.raqamliavlod.uz/protected/";
        }

        setLoading(true);
        setError(null);

        const token = localStorage.getItem("accessToken");
        if (!token) {
            setError("Avtorizatsiya talab qilinadi!");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(url, {
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

            if (!res.ok) throw new Error("Foydalanuvchilarni yuklashda xatolik");

            const data = await res.json();
            setUsers(data.results);

            const pageMatch = url.match(/page=(\d+)/);
            setUCount(data.count)
            const totalPages = Math.ceil(data.count / pagination.itemsPerPage);

            setPagination(prev => ({
                ...prev,
                next: data.next,
                previous: data.previous,
                count: data.count,
                currentPage: pageMatch ? parseInt(pageMatch[1]) : 1,
                totalPages: totalPages, // Bu yerda aniq hisoblaymiz
            }));

            const checkedUsers = data.results.filter(user => user.see).map(user => user.id);
            setSelectedRows(checkedUsers);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         setLoading(true);
    //         setError(null);

    //         const token = localStorage.getItem("accessToken");
    //         if (!token) {
    //             setError("Avtorizatsiya talab qilinadi!");
    //             setLoading(false);
    //             return;
    //         }

    //         try {
    //             const res = await fetch("https://online.raqamliavlod.uz/protected/", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`
    //                 }
    //             });

    //             if (res.status === 401 || res.status === 403) { 
    //                 localStorage.removeItem("accessToken");
    //                 navigate("/not-found"); // Login sahifasiga yo'naltirish
    //                 return;
    //             }

    //             if (!res.ok) throw new Error("Foydalanuvchilarni yuklashda xatolik");

    //             const users = await res.json();
    //             setUsers(users.results);

    //             const checkedUsers = users.results.filter(user => user.see).map(user => user.id);
    //             setSelectedRows(checkedUsers);
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };


    //     fetchUsers();
    // }, []);


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

    const getPageNumbers = () => {
        const { currentPage, totalPages } = pagination;
        const pages = [];
        const MAX_VISIBLE_PAGES = 5; // Ko'rsatiladigan maksimal sahifalar soni

        // Agar sahifalar soni 5 yoki kam bo'lsa, hammasini ko'rsatamiz
        if (totalPages <= MAX_VISIBLE_PAGES) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // Birinchi sahifa
        pages.push(1);

        // Joriy sahifa atrofidagi sahifalar
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        // Chap "..." qo'shamiz
        if (currentPage > 3) pages.push('...');
        else if (totalPages > MAX_VISIBLE_PAGES) start = 2;

        // Asosiy sahifalar
        for (let i = start; i <= end; i++) pages.push(i);

        // O'ng "..." qo'shamiz
        if (currentPage < totalPages - 2) pages.push('...');
        else if (end < totalPages - 1) end = totalPages - 1;

        // Oxirgi sahifa
        if (totalPages > 1) pages.push(totalPages);

        return pages;
    };


    return (
        <div className="all-users">
            <h2>Ro'yxatdan o'tgan foydalanuvchilar
                <button onClick={handleExportExcel}>
                    Excel faylni yuklab olish
                </button>
            </h2>
            <p>Barcha foydalanuvchilar soni: {uCount} ta</p>
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
                <div className="pagination">
                    <button
                        onClick={() => fetchUsers(pagination.previous)}
                        disabled={!pagination.previous}
                    >
                        &laquo;
                    </button>

                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`}>...</span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => fetchUsers(page)}
                                className={pagination.currentPage === page ? 'active' : ''}
                                disabled={page > pagination.totalPages} // BU YERDA MUHIM! Faqat mavjud sahifalar uchun
                            >
                                {page}
                            </button>
                        )
                    ))}

                    <button
                        onClick={() => fetchUsers(pagination.next)}
                        disabled={!pagination.next || pagination.currentPage >= pagination.totalPages} // BU YERDA HAM
                    >
                        &raquo;
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Users;