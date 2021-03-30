# README
***
## What is Disorder?

Disorder is a fullstack single-page web application that closely follows the design and features of the popular gaming live-chat system, Discord. Users can securely log in, create and edit servers and channels, and chat in real time with other logged-in users.

### Relevant Technologies
* Frontend
  * React-Redux - Javascript library with reusable UI components
  * HTML/CSS - style and formatting
* Backend
  * Ruby on Rails - MVC framework
  * PostgreSQL - database
  
## Features
  ### Live Chat 
Users are able to chat in real-time with each other using channels.
# IMG
Live chat is the primary feature of this application. It utilizes Rails Action Cable, subscribing users to a chat channel that constantly scans for and organizes new information to broadcast back to all known members of that channel.
# IMG
The frontend component for the chat system then grabs this organized information and updates state to trigger an instant re-render and display the new message.
  ### SERVER
  Users are able to create, edit, and delete servers as well as upload an image from their local storage as a server's cover photo using AWS's S3 Storage System, securely saving their media.
# IMG
Users are also able to create, edit, and delete channels within servers to diversify their conversation funnels.
# Reusable Components 
   ### Icon Button
      Reusable react components that takes in styling props for styles, props to trigger on hover transitions, and can contain either text or image links.