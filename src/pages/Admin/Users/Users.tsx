import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUsers } from "../../../api/user";
import Table from "../../../components/Table/Table";

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
      return lastPage.users.length > 0 ? allPages.length + 1 : undefined;
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
          <form onSubmit={handleUsernameSearch}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={inputUsername}
                onChange={(event) => setInputUsername(event.target.value)}
              />
            </div>
            <button type="submit">Search</button>
          </form>

          <div>
            {users && users.length !== 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th>Access Id</th>
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
                        <td>{user.access_role_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}

            {isError && <p>Error loading users</p>}
            {isLoading && <div>Loading...</div>}
            {isFetchingNextPage && <p>Fetching users...</p>}
            {!isError && !users?.length && <div>No users found!!</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
