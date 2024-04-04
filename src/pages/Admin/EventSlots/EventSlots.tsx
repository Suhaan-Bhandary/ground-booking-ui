import AdminSlotsTable from "./components/AdminSlotsTable/AdminSlotsTable";
import CreateSlot from "./components/CreateSlot/CreateSlot";

const EventSlots = () => {
  return (
    <div>
      <div className="container">
        <div>
          <h1>Slots</h1>
          <CreateSlot />
        </div>

        <div>
          <AdminSlotsTable />
        </div>
      </div>
    </div>
  );
};

export default EventSlots;
