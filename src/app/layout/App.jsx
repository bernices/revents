import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDashboard/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventDashboard/eventForm/EventForm';
import NavBar from '../../features/events/eventDashboard/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import Sandbox from '../../features/sandbox/Sandbox';

function App() {
  const {key} = useLocation();


  return (
    <div className="App">
      <Route exact path='/' component={HomePage}/>
      <Route path={'/(.+)'} render={()=>(
          <>
            <NavBar/>
            <Container className='main'>
            <Route exact path='/events' component={EventDashboard}/>
            <Route exact path='/sandbox' component={Sandbox}/>
            <Route exact path='/events/:id' component={EventDetailedPage}/>
            <Route exact path={['/createEvent','/manage/:id']}  key={key} component={EventForm}/>
            </Container>
          </>
      )}/>
  
    </div>
  );
}

export default App;
