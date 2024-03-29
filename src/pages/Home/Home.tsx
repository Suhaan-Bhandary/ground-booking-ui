import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section>
        <h1>Ground Booking App</h1>
        <p>Ground Booking</p>
        <Link to="/events">Events</Link>
      </section>

      <section>
        <h2>Features</h2>
      </section>

      <section>
        <h2>Footer</h2>
      </section>
    </main>
  );
};

export default Home;
