import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../api/event";
import { IEvent } from "../../types/event";
import DeleteEventModal from "../DeleteEventButton/DeleteEventModal";
import Table from "../Table/Table";

const AdminEventsTable = () => {
  const [deleteEventModalData, setDeleteEventModalData] =
    useState<IEvent | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["admin-events"],
      queryFn: ({ pageParam }) => fetchEvents(pageParam),

      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.events.length > 0 ? allPages.length + 1 : undefined;
      },
    });

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.pages.length) {
    return <div>No events found!!</div>;
  }

  // Making the data flat
  const events = data?.pages.flatMap((page) => page.events);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Event Date</th>
            <th>Status</th>
            <th>Slots</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            // Conditionally adding ref
            const refProp = index === events.length - 1 ? { ref: ref } : {};
            return (
              <tr key={event.id} {...refProp}>
                <td>{event.date}</td>
                <td>{event.event_status}</td>
                <td>
                  <Link to={`/admin/events/${event.id}/slots`}>View</Link>
                </td>
                <td>
                  <button>Update</button>
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
      <div>{isFetchingNextPage && <p>Fetching Events...</p>}</div>

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
