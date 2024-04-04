import AdminEventsTable from "./components/AdminEventsTable/AdminEventsTable";
import CreateEvent from "./components/CreateEvent/CreateEvent";

const Events = () => {
  return (
    <div>
      <div className="container">
        <div>
          <h1>Events</h1>
          <CreateEvent />
        </div>

        <div>
          <AdminEventsTable />
        </div>
      </div>
    </div>
  );
};

export default Events;
