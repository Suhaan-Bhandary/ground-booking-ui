import { useInfiniteQuery } from "@tanstack/react-query";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../api/event";
import EventsSkeletonLoader from "../../components/SkeletonLoaders/EventsSkeletonLoader/EventsSkeletonLoader";
import {
  eventStatusDisplayName,
  eventStatusOptions,
} from "../../helpers/event";
import { TEventStatus } from "../../types/event";
import styles from "./Events.module.css";
import toast from "react-hot-toast";

const Events = () => {
  const [eventStatus, setEventStatus] = useState<TEventStatus | "">("");
  const { ref, inView } = useInView({ threshold: 0 });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["events", eventStatus, startDate, endDate],
    queryFn: ({ pageParam }) =>
      fetchEvents({ page: pageParam, eventStatus, startDate, endDate }),

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

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (endDate && new Date(event.target.value) > new Date(endDate)) {
      toast.error("Start Date cannot be greater than end date");
      return;
    }

    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (startDate && new Date(startDate) > new Date(event.target.value)) {
      toast.error("End date cannot be less than start date");
      return;
    }

    setEndDate(event.target.value);
  };

  return (
    <div className={`container ${styles.EventsContainer}`}>
      <h1>Events</h1>
      <div>
        <div className={styles.filterContainer}>
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
          <div className={styles.dateContainer}>
            <div>
              <label htmlFor="start_date">From</label>
              <input
                aria-label="Start Date"
                type="date"
                name="start_date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <div>
              <label htmlFor="end_date">To</label>
              <input
                aria-label="Start Date"
                type="date"
                name="end_date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
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
              {event.event_status !== "BOOKED" && (
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

        {!isLoading && !isError && !events?.length && (
          <p className="text-center">No events Found</p>
        )}

        {isError && <p className="text-center">Error loading events</p>}
        {isFetchingNextPage && (
          <p className="text-center">Fetching events...</p>
        )}
      </div>
    </div>
  );
};

export default Events;
