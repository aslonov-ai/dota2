import { Link } from "react-router-dom";
function Headers() {
  return (
    <div>
      <ul className="flex">
        <Link to={"/users"}>Users</Link>
        <Link to={"/main"}>Main</Link>
      </ul>
    </div>
  );
}

export default Headers;
