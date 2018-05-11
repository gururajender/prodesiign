import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MyProfilePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username : this.props.user.username,
      cover : ''
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(e){
    this.setState({ [e.target.name]:e.target.value});
  }

  render(){
    return (
      <div className="container">
        <div className="row justify-content-md-center pt-5">
          <div className="col-md-4 text-left">
            <form>
              <img src="" className="mx-auto img-fluid rounded-circle" alt="cover"/>
              <h6 className="mt-3">Upload a different photo</h6>
              <div className="form-group">
                <label htmlFor="cover" className="control-label">Url</label>
                <input className="form-control" name="cover" value={this.state.cover}/>
              </div>
              <button className="btn btn-primary btn-md mt-3">Change</button>
            </form>
          </div>
          <div className="col-md-6">
            <h3> Welcome {this.state.username}! </h3>
            <form role="form">
              <h4 className="m-y-2">Edit Username</h4>
              <div className="form-group">
                <label className="control-label">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={this.onChange}
                    name="username"
                    value={this.props.user.username} />
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                  <input className="form-control" type="password" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-md">Change</button>
              </div>
            </form>
            <form role="form">
              <h4 className="m-y-2">Change Password</h4>
              <div className="form-group">
                <label className="control-label">Current Password</label>
                  <input className="form-control" type="text"/>
              </div>
              <div className="form-group">
                <label className="control-label">New Password</label>
                  <input className="form-control" type="password" defaultValue={11111122333} />
              </div>
              <div className="form-group">
                <label className="control-label">Confirm password</label>
                  <input className="form-control" type="password" defaultValue={11111122333} />
              </div>
              <div className="form-group">
                <label className="control-label" />
                  <button className="btn btn-primary btn-md">Change</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
 }

 MyProfilePage.propTypes = {
   auth: PropTypes.object.isRequired
 }


 function mapStateToProps(state) {
   console.log(state.auth);
   return {
     auth: state.auth,
     user: state.auth.user
   };
 }

export default connect(mapStateToProps)(MyProfilePage);
