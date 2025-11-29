import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  color: #0077ff;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #0077ff;
  border-radius: 5px;
  width: 250px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005fcc;
  }
`;

const Instructions = styled.p`
  margin-top: 30px;
  color: #555;
  text-align: center;
  max-width: 400px;
`;

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const id = uuidv4();
    navigate(`/call/${id}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== "") {
      navigate(`/call/${roomId}`);
    } else {
      alert("Please enter a valid Room ID");
    }
  };

  return (
    <Container>
      <Title>WebRTC Video Call</Title>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button onClick={handleJoinRoom}>Join Room</Button>
      </InputWrapper>
      <Button onClick={handleCreateRoom}>Create Room</Button>
      <Instructions>
        Click "Create Room" to start a new video call. Share the Room ID with
        another participant to join. Or enter an existing Room ID to join a
        call.
      </Instructions>
    </Container>
  );
}
