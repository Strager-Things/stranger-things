//this navigation bar will be shared across all page
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header id="navbar" className="container">
        <span id="logo">Logo</span>
        <nav id="nav-list" className="container">
          {
            //Links to different routes
          }{" "}
          <Link to={"/"}>home</Link>
          <Link to={"/posts"}>posts</Link>
          <Link to={"/login"}>login</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
