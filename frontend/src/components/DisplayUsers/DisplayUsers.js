import React, { useState, useEffect } from "react";
import { getUsers, deleteUsers, updateUsersAdmin } from "../../services/api";

function DisplayUsers({ token }) {
  const [listeUsers, setListeUsers] = useState([]);
  const [popupDeleteNom, setPopupDeleteNom] = useState("");
  const [popupDeleteId, setPopupDeleteId] = useState("");

  useEffect(() => {
    const fetchUser = () => {
      getUsers(token)
        .then((result) => {
          setListeUsers(result);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des utilisateurs :", error);
        });
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

 
  const handleDeleteUser = (userid, username) => {
    setPopupDeleteNom(username);
    setPopupDeleteId(userid);
  };


  const closePopupDelete = () => {
    setPopupDeleteId(""); /
  };

  const handleAdmin = (userId, userAdmin) => {
    if (!userAdmin) {
      updateUsersAdmin(token, userId)
        .then(() => {
          fetchUser();
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de l'admin :", error);
        });
    }
  };


  const deleteUserById = (userId) => {
    deleteUsers(token, userId)
      .then(() => {
        fetchUser();
        closePopupDelete();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
      });
  };

 
  const fetchUser = () => {
    getUsers(token)
      .then((result) => {
        setListeUsers(result);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  };


  const displayUsers = () => {
    return listeUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.email}</td>
        <td>{user.admin ? "Yes" : "No"}</td>
        <td>
          {user.pseudo !== "admin" && (
            <button
              className="btn-supprimer"
              onClick={() => handleDeleteUser(user.id, user.pseudo)}
            >
              Delete
            </button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>User Management</h2>
      <div className="divtab">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Administrator</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{displayUsers()}</tbody>
        </table>

        {popupDeleteId && (
          <div className="popup-bg active">
            <div className="popupDelete">
              <p>
                Are you sure you want to delete this user:{" "}
                <strong>{popupDeleteNom}</strong>?
              </p>
              <div className="btns">
                <button
                  className="btn-supprimer"
                  onClick={() => deleteUserById(popupDeleteId)}
                >
                  Delete
                </button>
                <button
                  className="btn-annuler"
                  onClick={closePopupDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayUsers;
