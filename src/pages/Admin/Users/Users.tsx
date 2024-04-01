import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUsers } from "../../../api/user";
import Table from "../../../components/Table/Table";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";

const Users = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [searchUsername, setSearchUsername] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["admin-users", searchUsername],
    // TODO: add username or mobile search
    queryFn: ({ pageParam }) =>
      fetchUsers({ page: pageParam, username: searchUsername }),

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1 <= lastPage.total_pages
        ? allPages.length + 1
        : undefined;
    },
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleUsernameSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchUsername(inputUsername);
  };

  // Making the data flat
  const users = data?.pages.flatMap((page) => page.users);

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
                    <th>User Id</th>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th>Access Id</th>
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
                        <td>{user.id}</td>
                        <td>{user.user_name}</td>
                        <td>{user.mobile_no}</td>
                        <td>{user.access_role_id}</td>
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
