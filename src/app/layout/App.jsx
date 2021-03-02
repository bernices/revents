import React, { useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/events/eventDashboard/nav/NavBar';

function App() {

  const [formOpen,setFormOpen] = useState(false);
  const [selectedEvent,setSelectedEvent] = useState(null);

  function handleSelectEvent(event){
    setSelectedEvent(event);
    setFormOpen(true);
}

  function handleCreateFormOpen(event){
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <div className="App">
      <h1>Revents</h1>
      <NavBar setFormOpen={handleCreateFormOpen}/>
      <Container className='main'>
      <EventDashboard formOpen={formOpen}
       setFormOpen={setFormOpen}
       selectEvent={handleSelectEvent}
       selectedEvent={selectedEvent}
       />
      </Container>
    </div>
  );
}

export default App;
