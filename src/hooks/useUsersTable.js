import { useEffect, useState } from "react";

export const useUsersTable = () => {
  // для юзеров
  const [data, setData] = useState([]);

  // статус загрузки
  const [loading, setLoading] = useState(true);

  // обработка ошибок
  const [error, setError] = useState(null);

  // поиск по значениям в таблице
  const [searchTerm, setSearchTerm] = useState("");

  // поиск по ключю для значений в таблице
  const [sortBy, setSortBy] = useState("firstName");

  // место где будут записываться для прокидывания запроса по параметру(берем из searchTerm)
  const [query, setQuery] = useState("");

  // для модального окна (показ/скрытие)
  const [modalActive, setModalActive] = useState(false);

  // хранение для выбранного пользователя
  const [selectedUser, setSelectedUser] = useState(null);

  // сортирочная колонка (Firstname,age,gender)
  const [sortColumn, setSortColumn] = useState(null);

  // сортровка по asc desc ""
  const [sortDirection, setSortDirection] = useState(null);

  // хранение данных, чтобы не обращаться к серверу за данными при сортировке
  const [ogData, setOgData] = useState([]);

  //func для запроса на сервере (в завсимости от параметра)

  const fetchData = async (query, sortBy) => {
    setLoading(true);
    try {
      let url = query
        ? `https://dummyjson.com/users/filter?key=${sortBy}&value=${encodeURIComponent(
            query
          )}`
        : "https://dummyjson.com/users";
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Проблема с запросом");
      }
      console.log(result);
      setData(result.users);

      //для сохранения оригинального массива данных при сортировке
      setOgData(result.users);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  //подгрузка данных в зависимоти от key и value в запросе на сервер
  useEffect(() => {
    fetchData(query, sortBy);
  }, [query]);

  //обработчик для поле инпута
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //обработчик для select выбора при поиск по определенному параметру
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  //отправка в query запрос только при нажатии enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setQuery(searchTerm);
    }
  };

  //при нажатии на ФИО пол-ля отправлять его данные в состояние
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setModalActive(true);
  };

  //сортировка в зависимости от выбранного заголовка, метод для сортировки asc-возр. desc-убывание. null-вернуть первоначальные данные (для этого и нужен был ogData)
  // в зависимости от выбранного заголовка выбирается фильтрация
  const handleSort = (column) => {
    console.log(column);
    let direction = "asc";
    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }
    if (sortColumn === column && sortDirection === "desc") {
      direction = null;
    }
    setSortColumn(column);
    setSortDirection(direction);

    //фильтрация прокидываем копию данных и фильтруем в зависимости от заголовка в данной фильтрации сравниваются две переменные и если меньше то по asc и если больше то по desc
    if (direction) {
      const sortedData = [...data].sort((a, b) => {
        if (column === "firstName") {
          //для ФИО отдельно из-за вложенных в него данных приходится фильтровать каждую переменную
          const aFullName = `${a.firstName} ${a.lastName} ${a.maidenName}`;
          const bFullName = `${b.firstName} ${b.lastName} ${b.maidenName}`;
          if (aFullName < bFullName) return direction === "asc" ? -1 : 1;
          if (aFullName > bFullName) return direction === "asc" ? 1 : -1;
          return 0; //случай когда переменные равны и им не нужна сортировка
        } else if (column === "address") {
          //для адреса отдельно из-за двух переменных в ячейке
          const aAddress = `${a.address.city}, ${a.address.address}`;
          const bAddress = `${b.address.city}, ${b.address.address}`;
          if (aAddress < bAddress) return direction === "asc" ? -1 : 1;
          if (aAddress > bAddress) return direction === "asc" ? 1 : -1;
          return 0; //случай когда переменные равны и им не нужна сортировка
        } else {
          //данная часть для остальных заголовках
          if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
          if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
          return 0; //случай когда переменные равны и им не нужна сортировка
        }
      });
      setData(sortedData);
    } else {
      setData(ogData);
    }
  };
  // отрисовка срелок в зависимости от сортировки
  const checkArrow = (nameColumn) => {
    return (
      sortColumn === nameColumn &&
      (sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "")
    );
  };
  return {
    data,
    loading,
    error,
    searchTerm,
    sortBy,
    query,
    modalActive,
    selectedUser,
    sortColumn,
    sortDirection,
    handleChange,
    handleSortChange,
    handleKeyPress,
    handleUserClick,
    handleSort,
    checkArrow,
    setModalActive,
  };
};
