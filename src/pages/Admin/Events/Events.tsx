import CreateEvent from "../../../components/CreateEvent/CreateEvent";
import Table from "../../../components/Table/Table";

const Events = () => {
  return (
    <div>
      <div className="container">
        <div>
          <h1>Events</h1>
          <CreateEvent />
        </div>

        <div>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Event 1</td>
              </tr>
              <tr>
                <td>Event 2</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Events;
