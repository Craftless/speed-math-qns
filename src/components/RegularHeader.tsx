import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegularHeader.module.css";

function RegularHeader()
{
  const [hasClicked, setHasClicked] = useState(false);


  return (
    <div>
      <div>
        <p>{String(hasClicked)}</p>
      </div>
      <button onClick={() => {
        setHasClicked(cur => !cur)
      }}>fsdjf,</button>
      <div>
        <div>
          <ul>
            <li>
              <Link to="/quiz">Start quiz</Link>
            </li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>
        <div>
          <ul>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RegularHeader;
