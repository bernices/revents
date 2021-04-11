import React from "react";
import { useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import AccountPage from "../../features/auth/AcountPage";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDashboard/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventDashboard/eventForm/EventForm";
import NavBar from "../../features/events/eventDashboard/nav/NavBar";
import HomePage from "../../features/home/HomePage";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";
import Sandbox from "../../features/sandbox/Sandbox";
import ErrorComponent from "../common/errors/ErrorComponent";
import ModalManager from "../common/modals/ModalManager";
import LoadingComponent from "./LoadingComponent";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content="Loading app..." />;

  return (
    <div className="App">
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route exact path="/events/:id" component={EventDetailedPage} />
              <PrivateRoute
                exact
                path={["/createEvent", "/manage/:id"]}
                key={key}
                component={EventForm}
              />
              <PrivateRoute path="/account" component={AccountPage} />
              <PrivateRoute path="/profile/:id" component={ProfilePage} />
              <Route path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </div>
  );
}

export default App;
