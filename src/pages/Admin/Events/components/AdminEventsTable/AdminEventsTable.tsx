import Moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiSquareRemove } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Table from "../../../../../components/Table/Table";
import {
  eventStatusDisplayName,
  eventStatusOptions,
} from "../../../../../helpers/event";
import useInfiniteQueryEvents from "../../../../../hooks/useInfiniteQueryEvents";
import { IEvent, TEventStatus } from "../../../../../types/event";
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal";
import styles from "./AdminEventsTable.module.css";

const AdminEventsTable = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventStatus, setEventStatus] = useState<TEventStatus | "">("");

  const [deleteEventModalData, setDeleteEventModalData] =
    useState<IEvent | null>(null);

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

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

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
    <div className={styles.AdminEventsTable}>
      <div className={styles.filterContainer}>
        <div className={styles.inputField}>
          <label htmlFor="event_status">Event Status</label>
          <select
            name="event_status"
            className={styles.inputField}
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
          <div className={styles.inputField}>
            <label htmlFor="start_date">From</label>
            <input
              aria-label="Start Date"
              type="date"
              name="start_date"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>

          <div className={styles.inputField}>
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

      <div className={styles.tableWrapper}>
        {events && events.length !== 0 && (
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Event Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => {
                // Conditionally adding ref
                const refProp =
                  index === events.length - 1 ? { ref: eventsRef } : {};
                return (
                  <tr key={event.id} {...refProp}>
                    <td>{event.id}</td>
                    <td>{Moment(event.date).format("Do MMMM YYYY")}</td>
                    <td>{eventStatusDisplayName[event.event_status]}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link
                          className={styles.viewLink}
                          to={`/events/${event.id}/slots`}
                        >
                          <IoListOutline />
                        </Link>

                        <CiSquareRemove
                          className={styles.deleteIcon}
                          onClick={() => setDeleteEventModalData(event)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>

      {!isError && !events?.length ? (
        <div className="text-center">No events found!!</div>
      ) : null}
      {isError && <p className="text-center">Error loading events</p>}
      {isFetchingNextPage && <p className="text-center">Fetching events...</p>}

      {/* Modals */}
      {deleteEventModalData ? (
        <DeleteEventModal
          event={deleteEventModalData}
          closeModalCallback={() => setDeleteEventModalData(null)}
        />
      ) : null}
    </div>
  );
};

export default AdminEventsTable;
