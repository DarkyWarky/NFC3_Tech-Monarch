import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  IconButton
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { styled } from '@mui/material/styles';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '80vh',
  width: '100%',
  maxWidth: 600,
  margin: 'auto',
  bgcolor: '#1E2A38', // Dark blue background
  color: '#FFFFFF', // White text
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  fontFamily: 'Arial, sans-serif',
}));

const MessageList = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  mb: theme.spacing(2),
  bgcolor: '#2C3E50', // Darker blue for message list background
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  bgcolor: '#34495E', // Medium blue for input
  borderRadius: theme.shape.borderRadius,
  '& input': {
    color: '#FFFFFF', // White text in input
  },
  '& fieldset': {
    borderColor: '#1E2A38', // Dark blue border
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  bgcolor: '#3498DB', // Bright blue button
  color: '#FFFFFF', // White text
  '&:hover': {
    bgcolor: '#2980B9', // Darker blue on hover
    transform: 'scale(1.05)',
    transition: '0.3s',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#3498DB', // Bright blue icon
  '&:hover': {
    color: '#2980B9', // Darker blue on hover
    transform: 'scale(1.1)',
    transition: '0.3s',
  },
}));

const ChatAndVoice = ({ roomId, userId, username }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [typingStatus, setTypingStatus] = useState('');

  const localAudioRef = useRef();
  const remoteAudioRef = useRef();
  const peerConnectionRef = useRef();
  const localStreamRef = useRef();

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Replace with your server URL
    setSocket(newSocket);

    newSocket.emit('join room', { roomId, userId, username });

    newSocket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('user joined', ({ userId, username }) => {
      console.log(`${username} joined the room`);
    });

    newSocket.on('offer', handleOffer);
    newSocket.on('answer', handleAnswer);
    newSocket.on('ice-candidate', handleNewICECandidateMsg);
    newSocket.on('typing', (username) => {
      setTypingStatus(`${username} is typing...`);
      setTimeout(() => setTypingStatus(''), 2000); // Hide typing status after 2 seconds
    });

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      newSocket.disconnect();
    };
  }, [roomId, userId, username]);

  const sendMessage = () => {
    if (inputMessage && socket) {
      const message = { text: inputMessage, userId, username, timestamp: new Date().toLocaleTimeString() };
      socket.emit('chat message', { roomId, message });
      setInputMessage('');
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks()[0].enabled = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const startCall = async () => {
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      localAudioRef.current.srcObject = localStreamRef.current;

      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      localStreamRef.current.getTracks().forEach(track => {
        peerConnectionRef.current.addTrack(track, localStreamRef.current);
      });

      peerConnectionRef.current.ontrack = (event) => {
        remoteAudioRef.current.srcObject = event.streams[0];
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { roomId, candidate: event.candidate });
        }
      };

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit('offer', { roomId, offer });

      setIsCallActive(true);
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const handleOffer = async (offer) => {
    if (!peerConnectionRef.current) {
      await startCall();
    }
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    socket.emit('answer', { roomId, answer });
  };

  const handleAnswer = async (answer) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleNewICECandidateMsg = async (candidate) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  const handleTyping = (e) => {
    if (socket) {
      socket.emit('typing', username);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100vw',
        bgcolor: '#1E2A38', // Dark blue background
        p: 3 
      }}
    >
      <ChatContainer>
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: '#FFFFFF' }}>
          Chat Room: {roomId}
        </Typography>
        
        <MessageList>
          <List>
            {messages.map((msg, index) => (
              <ListItem 
                key={index} 
                sx={{ 
                  borderBottom: '1px solid #34495E', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  py: 1
                }}
              >
                <ListItemText 
                  primary={`${msg.username}: ${msg.text}`} 
                  primaryTypographyProps={{ sx: { color: '#FFFFFF' } }}
                />
                <Typography sx={{ color: '#BDC3C7', fontSize: '0.75rem' }}>
                  {msg.timestamp}
                </Typography>
              </ListItem>
            ))}
          </List>
          {typingStatus && (
            <Typography sx={{ color: '#BDC3C7', fontStyle: 'italic', textAlign: 'center' }}>
              {typingStatus}
            </Typography>
          )}
        </MessageList>
        
        <Box sx={{ display: 'flex', mb: 2 }}>
          <StyledTextField
            fullWidth
            variant="outlined"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            onFocus={handleTyping}
          />
          <StyledButton variant="contained" onClick={sendMessage} sx={{ ml: 1 }}>
            Send
          </StyledButton>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!isCallActive && (
            <StyledButton 
              variant="contained" 
              onClick={startCall} 
              sx={{ mr: 2 }}
            >
              Start Call
            </StyledButton>
          )}
          <StyledIconButton onClick={toggleMute} disabled={!isCallActive}>
            {isMuted ? <MicOffIcon /> : <MicIcon />}
          </StyledIconButton>
        </Box>
        
        <Box sx={{ display: 'none' }}>
          <audio ref={localAudioRef} autoPlay muted />
          <audio ref={remoteAudioRef} autoPlay />
        </Box>
      </ChatContainer>
    </Box>
  );
};

export default ChatAndVoice;
