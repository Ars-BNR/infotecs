import React from 'react'
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Page from './Components/Page'
import UsersTable from './Components/UsersTable/UsersTable';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<UsersTable />} />
        <Route path="*" element={"Not Found"} />
      </Route>
    </Routes>
  )
}

export default App