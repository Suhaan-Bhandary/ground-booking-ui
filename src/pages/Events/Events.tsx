import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../api/event";
import {
  eventStatusDisplayName,
  eventStatusOptions,
} from "../../helpers/event";
import { TEventStatus } from "../../types/event";
import styles from "./Events.module.css";

const Events = () => {
  const [eventStatus, setEventStatus] = useState<TEventStatus | "">("");
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["events", eventStatus],
    queryFn: ({ pageParam }) => fetchEvents({ page: pageParam, eventStatus }),

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Making the data flat
  const events = data?.pages.flatMap((page) => page.events);

  if (!isError && !events?.length) {
    return <div>No events found!!</div>;
  }

  return (
    <div>
      <div>
        <div>
          <label htmlFor="event_status">Event Status</label>
          <select
            name="event_status"
            value={eventStatus}
            onChange={(event) =>
              setEventStatus(event.target.value as TEventStatus)
            }
          >
            <option value="" key="">
              All
            </option>
            {eventStatusOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.events}>
        {events?.map((event, index) => {
          // Conditionally adding ref
          const refProp = index === events.length - 1 ? { ref: ref } : {};
          return (
            <div key={event.id} className={styles.event} {...refProp}>
              <p>{event.date}</p>
              <p>{eventStatusDisplayName[event.event_status]}</p>
              {event.event_status === "AVAILABLE" && (
                <Link to={`/events/${event.id}/slots`}>View Slots</Link>
              )}
            </div>
          );
        })}

        {isError && <p>Error loading events</p>}
        {isFetchingNextPage && <p>Fetching events...</p>}
      </div>
    </div>
  );
};

export default Events;
