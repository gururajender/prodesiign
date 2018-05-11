import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/Login';
import { connect } from 'react-redux';
import { login } from '../../actions/LoginAction'
import PropTypes from 'prop-types';


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors:{},
      isLoading: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  isValid(){
    const { errors, isValid } = validateInput(this.state);
    if(!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        ( res ) => this.props.history.push('/new-event'),
        ( err ) => this.setState({ errors: err.response.data.errors, isLoading: false})
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { identifier, password, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h3> Login </h3>
        {errors.form && <span className="alert alert-danger"> {errors.form} </span>}
        <div className="form-group">
          <label className="control-label">Username / Email</label>
          <input
            className={classnames("form-control", {'is-invalid': errors.identifier})}
            value={identifier}
            onChange={this.onChange}
            type="text"
            name="identifier"/>
            {errors.identifier && <span className="invalid-feedback">{errors.identifier}</span>}
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            className={classnames("form-control", {'is-invalid': errors.password})}
            value={password}
            onChange={this.onChange}
            type="password"
            name="password"/>
            {errors.password && <span className="invalid-feedback">{errors.password}</span>}
        </div>
        <div className="form-group">
          <button disabled={isLoading} className="btn btn-primary btn-md">Login</button>
        </div>
      </form>
    );
  }
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
