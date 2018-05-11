import React from 'react';
import EventForm from './EventForm';

class NewEventPage extends React.Component {
  render() {
    return (
      <div className="container pt-5">
        <div className="row justify-content-md-center">
          <div className="col-md-6 col-md-offset-2">
            <EventForm />
          </div>
        </div>
      </div>
    );
  }
}

export default NewEventPage;
