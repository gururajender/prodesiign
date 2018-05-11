import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/SignupAction'
import { addFlashMessage } from '../../actions/FlashMessages'
import PropTypes from 'prop-types';


class SignupPage extends React.Component{
  render(){
    const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-4 col-md-offset-4">
            <SignupForm userSignupRequest={userSignupRequest} history={this.props.history} addFlashMessage={addFlashMessage} isUserExists={isUserExists} />
          </div>
        </div>
      </div>
    );
  }
 }

 SignupPage.propTypes = {
   userSignupRequest: PropTypes.func.isRequired,
   addFlashMessage:PropTypes.func.isRequired,
   isUserExists:PropTypes.func.isRequired
 }

export default connect(null, {userSignupRequest, addFlashMessage, isUserExists })(SignupPage);
