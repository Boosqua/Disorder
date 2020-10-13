import React from 'react';

const ShowErrorMessages = (props) => {
   
      if ( Object.keys(props.errors.session).length > 0 ){

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