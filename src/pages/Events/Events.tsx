import { useInfiniteQuery } from "@tanstack/react-query";
import Moment from "moment";
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
import EventsSkeletonLoader from "../../components/SkeletonLoaders/EventsSkeletonLoader/EventsSkeletonLoader";

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

  // Making the data flat
  const events = data?.pages.flatMap((page) => page.events);

  if (!isLoading && !isError && !events?.length) {
    return <div>No events found!!</div>;
  }

  return (
    <div className={`container ${styles.EventsContainer}`}>
      <h1>Events</h1>
      <div>
        <div>
          <select
            aria-label="event status"
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
          let eventTypeClassName = styles.eventAvailable;
          if (event.event_status === "IN_PROGRESS") {
            eventTypeClassName = styles.eventInProgress;
          }
          if (event.event_status === "BOOKED") {
            eventTypeClassName = styles.eventBooked;
          }

          // Conditionally adding ref
          const refProp = index === events.length - 1 ? { ref: ref } : {};
          return (
            <div
              key={event.id}
              className={`${styles.event} ${eventTypeClassName}`}
              {...refProp}
            >
              <p>Date: {Moment(event.date).format("DD/MM/YYYY")}</p>
              <p>Event {Moment(event.date).fromNow()}</p>
              <p>Status: {eventStatusDisplayName[event.event_status]}</p>
              {event.event_status === "AVAILABLE" && (
                <Link
                  to={`/events/${event.id}/slots`}
                  className={styles.viewSlots}
                >
                  View Slots
                </Link>
              )}
            </div>
          );
        })}

        {isLoading ? (
          <>
            <EventsSkeletonLoader />
            <EventsSkeletonLoader />
            <EventsSkeletonLoader />
            <EventsSkeletonLoader />
            <EventsSkeletonLoader />
            <EventsSkeletonLoader />
            <EventsSkeletonLoader />
          </>
        ) : null}

        {isError && <p className="text-center">Error loading events</p>}
        {isFetchingNextPage && (
          <p className="text-center">Fetching events...</p>
        )}
      </div>
    </div>
  );
};

export default Events;
