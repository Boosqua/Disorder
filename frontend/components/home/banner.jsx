import React from 'react';

export default class Banner extends React.Component {

   render() {

      return (
         <div className='banner-outside'>
            <div className='banner-title'>
            general
            </div>
            <div className='social-links-container'>
            <div className='social-links'>
               github
            </div>
            <div className='social-links'>
               linkedIn
            </div>
            </div>
         </div>
      )
   }
}