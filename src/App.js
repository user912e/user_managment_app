import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./componetets/layout";
import UsersList from "./componetets/users_list";
import AddUser from "./componetets/add_user";
import DeleteUser from "./componetets/delete_user";
import ErrorPage from "./componetets/error_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UsersList />}></Route>
          <Route path="user/add" element={<AddUser />}></Route>
          <Route path="user/:id/delete" element={<DeleteUser />}></Route>
          <Route path="user/:id/edit" element={<AddUser />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
