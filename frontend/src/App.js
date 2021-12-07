import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Wrestlers from "./components/wrestlers";
import WrestlersList from "./components/wrestlers-list";
import Social from "./components/social";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <div className="bg-dark text-white .bg-warning.bg-gradient">
      <nav className="navbar sticky-top navbar-expand-lg  bg-secondary">
        <a href="/wrestlers">
          <img
            src={
              "https://ca-times.brightspotcdn.com/dims4/default/e4c47c6/2147483647/strip/true/crop/737x387+0+14/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F7f%2F78%2F5b2d933d4c65a57a775306e4284d%2Faew-logo-2.jpg"
            }
            alt="Wrestler"
            width="150"
            height="75"
          ></img>
        </a>

        <div className="nav-item">
          <Link to={"/social"} className="nav-link text-light">
            Videos
          </Link>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/wrestlers"]} component={WrestlersList} />
          {/* <Route
            path="/wrestlers/:id/comment"
            render={(props) => <AddComment {...props} user={user} />}
          /> */}
          <Route
            path="/wrestlers/:id"
            render={(props) => <Wrestlers {...props} user={user} />}
          />
          <Route
            path="/social"
            render={(props) => <Social {...props} user={user} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
