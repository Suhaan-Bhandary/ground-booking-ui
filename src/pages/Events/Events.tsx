import { useState } from "react";
import toast from "react-hot-toast";
import { eventStatusOptions } from "../../helpers/event";
import useInfiniteQueryEvents from "../../hooks/useInfiniteQueryEvents";
import { TEventStatus } from "../../types/event";
import styles from "./Events.module.css";
import EventCard from "./components/EventCard/EventCard";
import EventsSkeletonLoader from "./components/EventsSkeletonLoader/EventsSkeletonLoader";

const Events = () => {
  const [eventStatus, setEventStatus] = useState<TEventStatus | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    events,
    isLoading,
    isError,
    isFetchingNextPage,
    ref: eventsRef,
  } = useInfiniteQueryEvents({
    eventStatus,
    startDate,
    endDate,
  });

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
        {events?.map((event, index) => (
          <EventCard
            event={event}
            viewRef={index === events.length - 1 ? eventsRef : null}
          />
        ))}

        {isLoading ? <EventsSkeletonLoader eventCount={7} /> : null}

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
