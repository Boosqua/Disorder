import React from 'react';

export default class Banner extends React.Component {

   render() {
      const {currentChannelName} = this.props
      return (
         <div className='banner-outside'>
            <div className='banner-title'>
            {currentChannelName}
            </div>
            <div className='social-links-container'>
            <div className='social-links'> <a id="fixer" href="https://github.com/Boosqua">
               <img id="socia-link-img"
            src="https://boosqua-disorder-dev.s3-us-west-1.amazonaws.com/github.png" /></a>
            </div>
            <div className='social-links'>
               <a id="fixer" href="https://www.linkedin.com/in/omar-hernandez-550a4375/">
               <img id="socia-link-img"
            src="https://boosqua-disorder-dev.s3-us-west-1.amazonaws.com/linked-in.png" /></a>
            </div>
            </div>
         </div>
      )
   }
}
