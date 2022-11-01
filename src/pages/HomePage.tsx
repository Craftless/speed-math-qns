import { Link } from "react-router-dom";
import "./HomePage.module.css";

function HomePage() {
  return (
    <div className="NavBar">
  		<span>Home</span>
  		&nbsp;
  		<Link to="/auth">Login</Link>
  		&nbsp;
  		<Link to="/login">Sign Up!</Link>
		</div>
  );
}

export default HomePage


