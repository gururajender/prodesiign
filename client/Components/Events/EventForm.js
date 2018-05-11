import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/EventAction';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEvent(this.state);
  }

  render() {
    const { title, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Event</h1>
        <div className="form-group">
          <label className="control-label">Event Title</label>
          <input
            className="form-control"
            value={title}
            onChange={this.onChange}
            type="text"
            name="title"/>
            {errors.title && <span className="invalid-feedback">{errors.title}</span>}
        </div>
        <div className="form-group">
          <button disabled={isLoading} className="btn btn-primary btn-md">Create</button>
        </div>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);
