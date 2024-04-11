import { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import useInfiniteQueryUsers from "../../../hooks/useInfiniteQueryUsers";
import styles from "./Users.module.css";

const Users = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [searchUsername, setSearchUsername] = useState("");

  const { users, isLoading, isError, isFetchingNextPage, ref } =
    useInfiniteQueryUsers({ username: searchUsername });

  const handleUsernameSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchUsername(inputUsername);
  };

  return (
    <div>
      <div className="container">
        <div>
          <h1>Users</h1>
        </div>

        <div>
          <form className={styles.inputField} onSubmit={handleUsernameSearch}>
            <input
              type="text"
              placeholder="Username"
              value={inputUsername}
              onChange={(event) => setInputUsername(event.target.value)}
            />
            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </form>

          <div className={styles.tableContainer}>
            {users && users.length !== 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th>Role</th>
                    <th>Registrations</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => {
                    // Conditionally adding ref
                    const refProp =
                      index === users.length - 1 ? { ref: ref } : {};
                    return (
                      <tr key={user.mobile_no} {...refProp}>
                        <td>{user.user_name}</td>
                        <td>{user.mobile_no}</td>
                        <td>{user.user_role}</td>
                        <td>
                          <Link
                            className={styles.viewButton}
                            to={`/registrations?user_id=${user.id}`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}

            {isError && <p className="text-center">Error loading users</p>}
            {isLoading && <p className="text-center">Loading...</p>}
            {isFetchingNextPage && (
              <p className="text-center">Fetching users...</p>
            )}
            {!isError && !users?.length && (
              <p className="text-center">No users found!!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
