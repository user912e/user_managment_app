import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/usersContext";

const AddUser = () => {
  const nameRef = useRef();
  const countryRef = useRef();
  const {
    users,
    lastId,
    updateLastId,
    actions: { addUser, updateUser },
  } = useContext(UserContext);

  const [errors, setErrors] = useState({ name: "", country: "" });
  const navigate = useNavigate();
  const { id: urlId } = useParams();

  const id = users?.find((e) => e.id.toString() === urlId?.toString())
    ? urlId
    : null;

  const getUserById = useCallback(
    (userId) => {
      if (userId) {
        return (
          users?.find((d) => d.id.toString() === userId.toString()) || null
        );
      } else {
        return null;
      }
    },
    [users]
  );
  useEffect(() => {
    if (id) {
      const { name, country } = getUserById(id);
      nameRef.current.value = name;
      countryRef.current.value = country;
    }
  }, [users, id, getUserById]);

  const handleAdd = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const country = countryRef.current.value.trim();
    const randomId = Math.floor(Math.random() * 100000) + 1000000;

    if (
      getUserById(id)?.country === country &&
      getUserById(id)?.name === name
    ) {
      setErrors((prevErr) => {
        return { ...prevErr, nochange: "Didn't update any of your data" };
      });
    } else {
      if (id) {
        // console.log(getUserById(id));
        updateUser({ id, name, country });
      } else {
        addUser({ id: randomId, name, country });
        // increment rank id by (1)
        updateLastId(1);
      }
      navigate("/");
    }
  };

  const validateForm = () => {
    const name = nameRef.current.value.trim();
    const country = countryRef.current.value.trim();
    setErrors({});
    if (!name) {
      setErrors((prev) => {
        return { ...prev, name: "Empty name" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, name: "" };
      });
    }

    if (country === "none") {
      setErrors((prev) => {
        return { ...prev, country: "Empty country" };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, country: "" };
      });
    }
  };
  const showErrors = () => {
    return Object.keys(errors).map((ob, i) => {
      return errors[ob] && <li key={i}>{errors[ob]}</li>;
    });
  };
  const handleCancle = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleAdd} onChange={validateForm}>
        {errors.name || errors.country || errors.nochange ? (
          <div className="alert alert-danger">
            <strong>Errors:</strong>
            <ul>{showErrors()}</ul>
          </div>
        ) : (
          ""
        )}
        {urlId && !id ? (
          <div className="alert alert-warning">User not found. Add new ?</div>
        ) : (
          ""
        )}
        {id && (
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              Id
            </label>
            <input
              type="disabled"
              value={id}
              className="form-control"
              id="id"
              disabled
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="User Name"
            ref={nameRef}
          />
        </div>
        <select className="form-select form-select mb-2" ref={countryRef}>
          <option value="none">Select Country</option>
          <option value="Moroco">Moroco</option>
          <option value="Australia">Australia</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
        </select>
        <button className="btn btn-primary" type="submit" onClick={handleAdd}>
          {id ? "Update User" : "Add User"}
        </button>
        {id && (
          <button className="btn btn-secondary mx-3" onClick={handleCancle}>
            cancel
          </button>
        )}
      </form>
    </>
  );
};

export default AddUser;
