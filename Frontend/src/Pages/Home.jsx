import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>You've successfully logged in!</p>
      <Link to="/asanas"></Link>
    </div>
  );
};

export default Home;