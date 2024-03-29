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
    <div>
      <div className={styles.slots}>
        {slots?.map((slot, index) => {
          // Conditionally adding ref
          const refProp = index === slots.length - 1 ? { ref: ref } : {};
          return (
            <div key={slot.id} className={styles.event} {...refProp}>
              <p>{slot.time_slot}</p>
              <p>{slotStatusDisplayName[slot.status]}</p>
              {slot.status === "AVAILABLE" ? (
                userRole ? (
                  <button onClick={() => setSlotSelectedForRegisteration(slot)}>
                    Register
                  </button>
                ) : (
                  <Link to="/login">Login to Register</Link>
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
