import React from 'react'
import styles from './UsersTable.module.css'
import Search from '../Search/Search';
import Modal from '../Modal/Modal';
import { useUsersTable } from '../../hooks/useUsersTable';

const UsersTable = () => {
    const {
        data,
        loading,
        error,
        searchTerm,
        sortBy,
        modalActive,
        selectedUser,
        handleChange,
        handleSortChange,
        handleKeyPress,
        handleUserClick,
        handleSort,
        checkArrow,
        setModalActive,
    } = useUsersTable();
    if (loading) {
        return <h1 style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontSize: "30px",
        }}> Загрузка.....</h1>;
    }
    if (error) {
        return <h1 style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontSize: "30px",
        }}> Ошибка: {error.message}</h1>;
    }
    return (
        <>

            <div className={styles.Block}>
                <h1 className={styles.Title}>Таблица пользователей</h1>
                <Search
                    sortBy={sortBy}
                    handleSortChange={handleSortChange}
                    handleChange={handleChange}
                    handleKeyPress={handleKeyPress}
                    searchTerm={searchTerm}
                />
                {data.length > 0 ?
                    (
                        <>
                            <table className={styles.Table__block}>
                                <thead>
                                    <tr>
                                        <th
                                            className={[styles.Table__header, styles.sort].join(" ")}
                                            onClick={() => handleSort("firstName")}
                                        >
                                            ФИО {checkArrow("firstName")}
                                        </th>
                                        <th
                                            className={[styles.Table__header, styles.sort].join(" ")}
                                            onClick={() => handleSort("age")}
                                        >
                                            Возраст {checkArrow("age")}
                                        </th>
                                        <th
                                            className={[styles.Table__header, styles.sort].join(" ")}
                                            onClick={() => handleSort("gender")}
                                        >
                                            Пол {checkArrow("gender")}
                                        </th>
                                        <th className={styles.Table__header}
                                        >Номер телефона</th>
                                        <th
                                            className={[styles.Table__header, styles.sort].join(" ")}
                                            onClick={() => handleSort("address")}
                                        >
                                            Адрес (Город, Улица) {checkArrow("address")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className={styles.Table__cell} onClick={() => handleUserClick(item)}>{item.firstName} {item.lastName} {item.maidenName}</td>
                                            <td className={styles.Table__cell}>{item.age}</td>
                                            <td className={styles.Table__cell}>{item.gender}</td>
                                            <td className={styles.Table__cell}>{item.phone}</td>
                                            <td className={styles.Table__cell}>
                                                {item.address.city},  {item.address.address}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Modal active={modalActive} setActive={setModalActive} >
                                {selectedUser && (
                                    <div className={styles.User__block}>
                                        <h2 className={styles.User__item}> {selectedUser.firstName} {selectedUser.lastName} {selectedUser.maidenName}</h2>
                                        <p className={styles.User__item}>Возраст: {selectedUser.age}</p>
                                        <p className={styles.User__item}>Адрес: {selectedUser.address.city}, {selectedUser.address.address}</p>
                                        <p className={styles.User__item}>Рост: {selectedUser.height}</p>
                                        <p className={styles.User__item}>Вес: {selectedUser.weight}</p>
                                        <p className={styles.User__item}>Номер телефона: {selectedUser.phone}</p>
                                        <p className={styles.User__item}>Email: {selectedUser.email}</p>

                                    </div>
                                )}
                            </Modal>
                        </>
                    )
                    : (<p style={{
                        textAlign: "center",
                        fontSize: "20px",
                        marginTop: "20px"
                    }}>Пользователь не найден</p>)
                }
            </div>
        </>

    );
};


export default UsersTable




