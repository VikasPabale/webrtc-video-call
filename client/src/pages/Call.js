import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../utils/socket";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideosWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const Video = styled.video`
  width: 300px;
  height: 200px;
  border: 2px solid #333;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005fcc;
  }
`;


export default function Call() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const localVideo = useRef();
  const remoteVideo = useRef();
  const pcRef = useRef(null);
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    pcRef.current = pc;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideo.current.srcObject = stream;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      })
      .catch(err => alert("Cannot access camera/mic: " + err));

    pc.ontrack = (e) => {
      remoteVideo.current.srcObject = e.streams[0];
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", { roomId, candidate: e.candidate });
      }
    };

    socket.emit("join-room", roomId);

    socket.on("peer-joined", async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { roomId, offer });
    });

    socket.on("offer", async ({ offer }) => {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { roomId, answer });
      setStatus("connected");
    });

    socket.on("answer", async ({ answer }) => {
      await pc.setRemoteDescription(answer);
      setStatus("connected");
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      try { await pc.addIceCandidate(candidate); } catch {}
    });

    socket.on("peer-left", () => {
      setStatus("disconnected");
      remoteVideo.current.srcObject = null;
    });

    return () => {
      pc.close();
      socket.emit("leave", roomId);
    };
  }, [roomId]);

  return (
      <Container>
        <h2>Room: {roomId}</h2>
        <p>Status: {status}</p>
        <VideosWrapper>
          <Video ref={localVideo} autoPlay playsInline muted />
          <Video ref={remoteVideo} autoPlay playsInline />
        </VideosWrapper>
        <Button onClick={() => navigate('/')}>End Call</Button>
      </Container>


  );
}
