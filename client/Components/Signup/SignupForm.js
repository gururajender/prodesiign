import React from 'react';
import timezones from '../../data/timezones'
import map from 'lodash/map'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import Redirect from 'react-router-dom';


class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkuserExits = this.checkuserExits.bind(this);
  }

  checkuserExits(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] =   'There is user with such ' + field;
          invalid = true;
        } else{
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onChange(e){
    this.setState({ [e.target.name]:e.target.value});
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.userSignupRequest(this.state).then(
        () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Welcome Your Account Created Successfully Please login to Continue'
        });
        this.props.history.push('/');
      },
      ( err ) => this.setState({ errors: err.response.data, isLoading: false})
      );
    }
  }

  render(){
    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={val} value={key}>{key}</option>
    );
    return (
      <form onSubmit={this.onSubmit}>
        <h3> Sign Up </h3>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            className={classnames("form-control", {'is-invalid': errors.username})}
            value={this.state.username}
            onChange={this.onChange}
            onBlur={this.checkuserExits}
            type="text"
            name="username"/>
            {errors.username && <span className="invalid-feedback">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label className="control-label">E-mail</label>
          <input
            className={classnames("form-control", {'is-invalid': errors.email})}
            value={this.state.email}
            onChange={this.onChange}
            onBlur={this.checkuserExits}
            type="text"
            name="email"/>
            {errors.email && <span className="invalid-feedback">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            className={classnames("form-control", {'is-invalid': errors.password})}
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"/>
            {errors.password && <span className="invalid-feedback">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label className="control-label">Password Confirmation</label>
          <input
            className={classnames("form-control", {'is-invalid': errors.passwordConfirmation})}
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            type="password"
            name="passwordConfirmation"/>
            {errors.passwordConfirmation && <span className="invalid-feedback">{errors.passwordConfirmation}</span>}
        </div>
        <div className="form-group">
          <label className="control-label">Choose Your Timezone</label>
          <select
            className={classnames("form-control", {'is-invalid': errors.timezone})}
            value={this.state.timezone}
            onChange={this.onChange}
            name="timezone">
              <option value="" disabled>Choose your Timezone</option>
              {options}
          </select>
          {errors.timezone && <span className="invalid-feedback">{errors.timezone}</span>}
        </div>
        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid } className="btn btn-primary btn-md">SignUp</button>
        </div>
      </form>
    );
  }
 }

 SignupForm.propTypes = {
   userSignupRequest:PropTypes.func.isRequired,
   history:PropTypes.object.isRequired,
   addFlashMessage:PropTypes.func.isRequired,
   isUserExists:PropTypes.func.isRequired
 }

export default SignupForm;
