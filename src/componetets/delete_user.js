import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/usersContext";
import { useContext, useEffect } from "react";

const DeleteUser = () => {
  const { id } = useParams();
  const {
    users,
    actions: { deleteUser },
  } = useContext(UserContext);

  const navigate = useNavigate();
  const user = users.find((u) => u.id.toString() === id.toString());

  useEffect(() => {
    if (!user) {
      navigate("/error");
    }
  }, [user, navigate]);

  const handleDelete = () => {
    deleteUser(id);
    navigate("/");
  };
  return (
    <>
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Warning:</h4>
        <p>You can't revert after delete</p>
      </div>
      <div className="btn btn-danger" onClick={handleDelete}>
        Delete
      </div>
    </>
  );
};

export default DeleteUser;
