import React from 'react';

const ShowErrorMessages = (props) => {

      if ( props.errors.session.responseJson ){

      return (
         <p className="error-messages">
        {props.errors.session.responseJSON.join(", ")}
         </p>
      )
      } else {
         return null;
      }
}

export default ShowErrorMessages;