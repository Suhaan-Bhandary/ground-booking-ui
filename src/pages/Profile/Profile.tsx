import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUserRegisterations } from "../../api/event";
import Table from "../../components/Table/Table";
import { registrationStatusDisplayName } from "../../helpers/event";
import { useAppSelector } from "../../hooks/redux";

const Profile = () => {
  const user = useAppSelector((state) => state.userState.user);

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
    queryKey: ["profile-registerations"],
    queryFn: ({ pageParam }) => fetchUserRegisterations({ page: pageParam }),

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

  // Making the data flat
  const registrations = data?.pages.flatMap((page) => page.users);

  return (
    <div>
      <div>
        <h1>User Profile</h1>
        <p>Username: {user?.user_name}</p>
        <p>Mobile: {user?.mobile_no}</p>
      </div>

      <div>
        <h2>Registrations</h2>
        <ul>
          {registrations && registrations.length !== 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Registration Id</th>
                  <th>Slot Id</th>
                  <th>Status</th>
                  <th>Registered On</th>
                  <th>Payment Id</th>
                  <th>Receipt Url</th>
                  <th>Payment</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((registration, index) => {
                  // Conditionally adding ref
                  const refProp =
                    index === registrations.length - 1 ? { ref: ref } : {};
                  return (
                    <tr key={registration.id} {...refProp}>
                      <td>{registration.id}</td>
                      <td>{registration.slot_id}</td>
                      <td>
                        {registrationStatusDisplayName[registration.status]}
                      </td>
                      <td>{registration.created_at}</td>

                      <td>{registration.payment_id || "NA"}</td>
                      <td>{registration.receipt_url || "NA"}</td>
                      <td>
                        {registration.status === "PENDING" && (
                          <button>Pay</button>
                        )}

                        {registration.status === "CONFIRMED" && (
                          <button>View</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </ul>

        {isError && <p>Error loading user registrations</p>}
        {isLoading && <div>Loading...</div>}
        {isFetchingNextPage && <p>Fetching user registrations...</p>}
        {!isError && !registrations?.length && (
          <div>No user registrations found!!</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
