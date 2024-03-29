import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../api/event";
import {
  eventStatusDisplayName,
  eventStatusOptions,
} from "../../helpers/event";
import { IEvent, TEventStatus } from "../../types/event";
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal";
import Table from "../Table/Table";
import styles from "./AdminEventsTable.module.css";
import Moment from "moment";

const AdminEventsTable = () => {
  const [eventStatus, setEventStatus] = useState<TEventStatus | "">("");

  const [deleteEventModalData, setDeleteEventModalData] =
    useState<IEvent | null>(null);

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
    <div className={styles.AdminEventsTable}>
      {events && events.length !== 0 && (
        <Table>
          <thead>
            <tr>
              <td colSpan={5} className={styles.eventStatusCell}>
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
              </td>
            </tr>

            <tr>
              <th>Id</th>
              <th>Event Date</th>
              <th>Status</th>
              <th>Slots</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event, index) => {
              // Conditionally adding ref
              const refProp = index === events.length - 1 ? { ref: ref } : {};
              return (
                <tr key={event.id} {...refProp}>
                  <td>{event.id}</td>
                  <td>{Moment(event.date).format("Do MMMM YYYY")}</td>
                  <td>{eventStatusDisplayName[event.event_status]}</td>
                  <td>
                    <Link to={`/events/${event.id}/slots`}>View</Link>
                  </td>
                  <td>
                    <button onClick={() => setDeleteEventModalData(event)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {isError && <p>Error loading events</p>}
      {isFetchingNextPage && <p>Fetching events...</p>}

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
