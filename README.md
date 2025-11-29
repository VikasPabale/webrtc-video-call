-WebRTC Video Calling App

A simple peer-to-peer video calling application built using WebRTC, Socket.IO, Node.js, and React.

- Features

Real-time video calling between two peers

WebRTC peer-to-peer streaming

Socket.IO signaling server

Simple modern UI

Works on mobile + desktop

- Tech Stack
  Frontend

React.js

Styled-Components

WebRTC APIs

Backend

Node.js

Express

Socket.IO

- Project Structure
  webrtc-video-call/
  ├── server/ # Node.js + Socket.IO signaling server
  ├── client/ # React frontend
  └── README.md

⚙️ Installation & Setup
1️ Install backend dependencies
cd server
npm install

2️ Install frontend dependencies
cd client
npm install

- Running the App
  Start backend server
  cd server
  node index.js

Start frontend (React)
cd client
npm start

- How to Test Video Call

Open the app in two different devices (laptop + mobile)

Enter the same room ID

Click Join

Allow camera and microphone access

Video will connect peer-to-peer

- Demo Video
  A demo of the WebRTC Video Call application can be viewed/downloaded here:
  https://github.com//VikasPabale/webrtc-video-call/releases/download/v1.0.0/Screen.Recording.2025-11-30.040636.mp4

- Author
  Vikas Pabale
