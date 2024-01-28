import { useContext } from "react";
import { UserContext } from "../context/usersContext";
import { Link } from "react-router-dom";

const UsersList = () => {
  const { users } = useContext(UserContext);

  // console.log(users);
  const addusers = () => {
    return (
      users &&
      users.map((usr) => {
        const { id, name, country, rank } = usr;
        return (
          <tr key={id}>
            <td className="border">{id}</td>
            <td className="border">{rank}</td>
            <td className="border">{name}</td>
            <td className="border">{country}</td>
            <td className="border d-flex justify-content-center align-items-center gap-3">
              <Link to={`/user/${id}/edit`} className="btn btn-primary ">
                Edit
              </Link>
              <Link to={`/user/${id}/delete`} className="btn btn-danger">
                Delete
              </Link>
            </td>
          </tr>
        );
      })
    );
  };
  return (
    <>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col" className="border">
              #id
            </th>
            <th scope="col" className="border">
              #rankId
            </th>
            <th scope="col" className="border">
              Name
            </th>
            <th scope="col" className="border">
              Country
            </th>
          </tr>
        </thead>
        <tbody>{addusers()}</tbody>
      </table>
    </>
  );
};

export default UsersList;
