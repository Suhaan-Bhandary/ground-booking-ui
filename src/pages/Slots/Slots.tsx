import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";
import { fetchSlots } from "../../api/slot";
import RegisterSlotModal from "../../components/RegisterSlotModal/RegisterSlotModal";
import { slotStatusDisplayName } from "../../helpers/slot";
import { useAppSelector } from "../../hooks/redux";
import { ISlot } from "../../types/event";
import styles from "./Slots.module.css";

const Slots = () => {
  const { eventId } = useParams();
  const { ref, inView } = useInView({ threshold: 0 });

  const userRole = useAppSelector((state) => state.userState.user?.role);

  const [slotSelectedForRegisteration, setSlotSelectedForRegisteration] =
    useState<ISlot | null>(null);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["slots"],
    queryFn: ({ pageParam }) =>
      fetchSlots({ page: pageParam, event_id: Number(eventId) }),

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1 <= lastPage.total_pages
        ? allPages.length + 1
        : undefined;
    },
  });

  // Making the data flat
  const slots = data?.pages.flatMap((page) => page.slots);

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isError && !slots?.length) {
    return <div>No slots found!!</div>;
  }

  return (
    <div className={`container ${styles.SlotsContainer}`}>
      <h1>Slots</h1>
      <div className={styles.slots}>
        {slots?.map((slot, index) => {
          const slotTypeClassName =
            slot.status === "AVAILABLE"
              ? styles.slotAvailable
              : styles.slotBooked;

          // Conditionally adding ref
          const refProp = index === slots.length - 1 ? { ref: ref } : {};
          return (
            <div key={slot.id} className={styles.slot} {...refProp}>
              <p>Time: {slot.time_slot}</p>
              <p>
                Status:{" "}
                <span className={slotTypeClassName}>
                  {slotStatusDisplayName[slot.status]}
                </span>
              </p>
              {slot.status === "AVAILABLE" ? (
                userRole ? (
                  <button
                    className={styles.registerSlotButton}
                    onClick={() => setSlotSelectedForRegisteration(slot)}
                  >
                    Book
                  </button>
                ) : (
                  <Link className={styles.registerSlotButton} to="/login">
                    Login to Book
                  </Link>
                )
              ) : null}
            </div>
          );
        })}

        {isError && <p>Error loading slots</p>}
        {isFetchingNextPage && <p>Fetching slots...</p>}
      </div>

      {slotSelectedForRegisteration ? (
        <RegisterSlotModal
          slot={slotSelectedForRegisteration}
          closeModalCallback={() => setSlotSelectedForRegisteration(null)}
        />
      ) : null}
    </div>
  );
};

export default Slots;
