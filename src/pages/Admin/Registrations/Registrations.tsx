import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";
import { fetchRegisterations } from "../../../api/event";
import Table from "../../../components/Table/Table";
import {
  registrationStatusDisplayName,
  registrationStatusOptions,
} from "../../../helpers/event";

const Registrations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const user_id = searchParams.get("user_id") || "";
  const status = searchParams.get("status") || "";
  const slot_id = searchParams.get("slot_id") || "";

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
    queryKey: ["admin-registerations", user_id, slot_id, status],
    queryFn: ({ pageParam }) =>
      fetchRegisterations({
        user_id,
        slot_id,
        status,
        page: pageParam,
      }),

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
  const registrations = data?.pages.flatMap((page) => page.registrations);

  return (
    <div>
      <div className="container">
        <div>
          <h1>Registrations</h1>
        </div>

        <div>
          <div>
            <div>
              <label>User Id</label>
              <input
                type="text"
                value={user_id}
                onChange={(event) =>
                  setSearchParams({
                    ...searchParams,
                    user_id: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Slot Id</label>
              <input
                type="text"
                value={slot_id}
                onChange={(event) =>
                  setSearchParams({
                    ...searchParams,
                    slot_id: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="registration_status">Status</label>
              <select
                name="registration_status"
                value={status}
                onChange={(event) =>
                  setSearchParams({
                    ...searchParams,
                    status: event.target.value,
                  })
                }
              >
                <option value="">All</option>
                {registrationStatusOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            {registrations && registrations.length !== 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>User Id</th>
                    <th>Slot Id</th>
                    <th>Status</th>
                    <th>Registered On</th>
                    <th>Payment Id</th>
                    <th>Receipt Url</th>
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
                        <td>{registration.user_id}</td>
                        <td>{registration.slot_id}</td>
                        <td>
                          {registrationStatusDisplayName[registration.status]}
                        </td>
                        <td>{registration.created_at}</td>

                        <td>{registration.payment_id || "NA"}</td>
                        <td>{registration.receipt_url || "NA"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}

            {isError && (
              <p className="text-center">Error loading registrations</p>
            )}
            {isLoading && <p className="text-center">Loading...</p>}
            {isFetchingNextPage && (
              <p className="text-center">Fetching registrations...</p>
            )}
            {!isError && !registrations?.length && (
              <p className="text-center">No registrations found!!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrations;
