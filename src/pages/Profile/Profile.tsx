import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { fetchUserRegisterations } from "../../api/event";
import { useDeleteRegistrationMutation } from "../../app/features/registrationApi";
import PaymentDetailModal from "../../components/PaymentDetailModal/PaymentDetailModal";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import Table from "../../components/Table/Table";
import { isApiErrorMessage } from "../../helpers/api";
import { registrationStatusDisplayName } from "../../helpers/event";
import { useAppSelector } from "../../hooks/redux";
import { IRegistration } from "../../types/event";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state.userState.user);
  const [deleteRegistration, deleteRegistrationResult] =
    useDeleteRegistrationMutation();

  const [paymentModalRegistration, setPaymentModalRegistration] =
    useState<IRegistration | null>(null);
  const [paymentDetailModalRegistration, setPaymentDetailModalRegistration] =
    useState<IRegistration | null>(null);

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

  // Making the data flat
  const registrations = data?.pages.flatMap((page) => page.users);

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleDeleteRegistration = async (registration: IRegistration) => {
    try {
      await deleteRegistration({ registrationId: registration.id }).unwrap();

      toast.success("Registration Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["profile-registerations"] });
    } catch (error) {
      console.error("Rejected:", error);
      if (isApiErrorMessage(error)) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className={`container ${styles.profile}`}>
      <div className={styles.detail}>
        <h1>Profile</h1>
        <p>Username: {user?.user_name}</p>
        <p>Mobile: {user?.mobile_no}</p>
      </div>
      <div>
        <h2>Registrations</h2>
        <ul>
          {registrations && registrations.length !== 0 && (
            <Table className={styles.table}>
              <thead>
                <tr>
                  <th>Registration</th>
                  <th>Slot</th>
                  <th>Status</th>
                  <th>Registered On</th>
                  <th>Payment Id</th>
                  <th>Receipt</th>
                  <th>Payment</th>
                  <th>Cancel Registration</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((registration, index) => {
                  let registrationTypeClassName = styles.registrationConfirmed;
                  if (registration.status === "PENDING") {
                    registrationTypeClassName = styles.registrationPending;
                  }
                  if (registration.status === "CANCELED") {
                    registrationTypeClassName = styles.registrationCanceled;
                  }

                  // Conditionally adding ref
                  const refProp =
                    index === registrations.length - 1 ? { ref: ref } : {};
                  return (
                    <tr key={registration.id} {...refProp}>
                      <td>{registration.id}</td>
                      <td>{registration.slot_id}</td>
                      <td>
                        <p
                          className={`${styles.registrationStatus} ${registrationTypeClassName}`}
                        >
                          {registrationStatusDisplayName[registration.status]}
                        </p>
                      </td>
                      <td>
                        {Moment(registration.created_at).format("DD/MM/YYYY")}
                      </td>

                      <td>{registration.payment_id || "NA"}</td>
                      <td>
                        {registration.receipt_url ? (
                          <Link to={registration.receipt_url}>Receipt</Link>
                        ) : (
                          "NA"
                        )}
                      </td>
                      <td>
                        {registration.status === "PENDING" && (
                          <button
                            className={`${styles.button} ${styles.payButton}`}
                            onClick={() =>
                              setPaymentModalRegistration(registration)
                            }
                          >
                            Pay
                          </button>
                        )}

                        {registration.status === "CONFIRMED" && (
                          <button
                            className={`${styles.button} ${styles.viewButton}`}
                            onClick={() =>
                              setPaymentDetailModalRegistration(registration)
                            }
                          >
                            View
                          </button>
                        )}
                      </td>
                      <td>
                        {registration.status === "PENDING" ? (
                          <button
                            className={`${styles.button} ${styles.deleteButton}`}
                            onClick={() =>
                              handleDeleteRegistration(registration)
                            }
                            disabled={deleteRegistrationResult.isLoading}
                          >
                            Cancel
                          </button>
                        ) : (
                          <p>Cannot Cancel</p>
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

      {/* Modals */}
      {paymentModalRegistration ? (
        <PaymentModal
          registration={paymentModalRegistration}
          closeModalCallback={() => setPaymentModalRegistration(null)}
        />
      ) : null}

      {paymentDetailModalRegistration ? (
        <PaymentDetailModal
          registration={paymentDetailModalRegistration}
          closeModalCallback={() => setPaymentDetailModalRegistration(null)}
        />
      ) : null}
    </div>
  );
};

export default Profile;
