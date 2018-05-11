import React from 'react';
import FlashMessage from './FlashMessage'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import map from 'lodash/map'
import { deleteFlashMessage } from '../../actions/FlashMessages'

class FlashMessagesList extends React.Component {
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    );

    return (
        <div>{messages}</div>
    );
  }
 }

 FlashMessagesList.propTypes = {
   messages: PropTypes.array.isRequired,
   deleteFlashMessage: PropTypes.func.isRequired
 }
 function mapStateToProps (state) {
   return {
     messages: state.flashMessage
    }
 }

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
