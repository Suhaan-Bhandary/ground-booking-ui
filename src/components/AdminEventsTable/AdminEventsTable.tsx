import { useInfiniteQuery } from "@tanstack/react-query";
import Moment from "moment";
import { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
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
    return <div className="text-center">Loading...</div>;
  }

  // Making the data flat
  const events = data?.pages.flatMap((page) => page.events);

  if (!isError && !events?.length) {
    return <div className="text-center">No events found!!</div>;
  }

  return (
    <div className={styles.AdminEventsTable}>
      <td colSpan={5} className={styles.eventStatusCell}>
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
      </td>

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
                const refProp = index === events.length - 1 ? { ref: ref } : {};
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
