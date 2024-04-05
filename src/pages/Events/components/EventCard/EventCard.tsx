import styles from "./EventCard.module.css";
import Moment from "moment";
import { Link } from "react-router-dom";
import { eventStatusDisplayName } from "../../../../helpers/event";
import { IEvent } from "../../../../types/event";

type EventCardProps = {
  event: IEvent;
  viewRef: ((node?: Element | null | undefined) => void) | null;
};

const EventCard = ({ event, viewRef }: EventCardProps) => {
  let eventTypeClassName = styles.eventAvailable;
  if (event.event_status === "IN_PROGRESS") {
    eventTypeClassName = styles.eventInProgress;
  }
  if (event.event_status === "BOOKED") {
    eventTypeClassName = styles.eventBooked;
  }

  return (
    <div
      key={event.id}
      className={`${styles.event} ${eventTypeClassName}`}
      ref={viewRef}
    >
      <p>Date: {Moment(event.date).format("DD/MM/YYYY")}</p>
      <p>Event {Moment(event.date).fromNow()}</p>
      <p>Status: {eventStatusDisplayName[event.event_status]}</p>
      {event.event_status !== "BOOKED" && (
        <Link to={`/events/${event.id}/slots`} className={styles.viewSlots}>
          View Slots
        </Link>
      )}
    </div>
  );
};

export default EventCard;
