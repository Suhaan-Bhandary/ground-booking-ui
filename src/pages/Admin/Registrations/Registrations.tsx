import Moment from "moment";
import { IoReceiptOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import Table from "../../../components/Table/Table";
import {
  registrationStatusDisplayName,
  registrationStatusOptions,
} from "../../../helpers/event";
import useInfiniteQueryRegistrations from "../../../hooks/useInfiniteQueryRegistrations";
import styles from "./Registrations.module.css";

const Registrations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const user_id = searchParams.get("user_id") || "";
  const status = searchParams.get("status") || "";
  const slot_id = searchParams.get("slot_id") || "";

  const { registrations, isLoading, isError, isFetchingNextPage, ref } =
    useInfiniteQueryRegistrations({
      user_id,
      status,
      slot_id,
    });

  return (
    <div>
      <div className="container">
        <div>
          <h1>Registrations</h1>
        </div>

        <div>
          <div className={styles.inputFields}>
            <div className={styles.inputField}>
              <label>User Id</label>
              <input
                type="text"
                placeholder="User Id"
                value={user_id}
                onChange={(event) =>
                  setSearchParams({
                    ...searchParams,
                    user_id: event.target.value,
                  })
                }
              />
            </div>

            <div className={styles.inputField}>
              <label>Slot Id</label>
              <input
                type="text"
                placeholder="Slot Id"
                value={slot_id}
                onChange={(event) =>
                  setSearchParams({
                    ...searchParams,
                    slot_id: event.target.value,
                  })
                }
              />
            </div>

            <div className={styles.inputField}>
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
            <div className={styles.tableWrapper}>
              {registrations && registrations.length !== 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Event</th>
                      <th>Slot</th>
                      <th>Status</th>
                      <th>Registered On</th>
                      <th>Payment Id</th>
                      <th>Receipt Url</th>
                    </tr>
                  </thead>

                  <tbody>
                    {registrations.map((registration, index) => {
                      let registrationStatusClass =
                        styles.registrationConfirmed;
                      if (registration.status === "PENDING") {
                        registrationStatusClass = styles.registrationPending;
                      }
                      if (registration.status === "CANCELED") {
                        registrationStatusClass = styles.registrationCanceled;
                      }

                      // Conditionally adding ref
                      const refProp =
                        index === registrations.length - 1 ? { ref: ref } : {};
                      return (
                        <tr key={registration.id} {...refProp}>
                          <td>{registration.user_name}</td>
                          <td>
                            {Moment(registration.event_date).format(
                              "DD/MM/YYYY",
                            )}
                          </td>
                          <td>{registration.slot_time}</td>
                          <td className={registrationStatusClass}>
                            {registrationStatusDisplayName[registration.status]}
                          </td>
                          <td>
                            {Moment(registration.created_at).format(
                              "DD/MM/YYYY",
                            )}
                          </td>

                          <td>{registration.payment_id || "NA"}</td>
                          <td>
                            {registration.receipt_url ? (
                              <Link
                                to={registration.receipt_url}
                                className={styles.viewReceipt}
                              >
                                <IoReceiptOutline />
                              </Link>
                            ) : (
                              "NA"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </div>

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
