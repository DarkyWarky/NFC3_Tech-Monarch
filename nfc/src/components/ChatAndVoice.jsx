import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, TextField, Button, List, ListItem, Typography,
  IconButton, Paper, ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SendIcon from '@mui/icons-material/Send';

const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#0a1929',
      paper: '#102a43',
    },
  },
});

const ChatAndVoice = ({ roomId, userId, username, socket, messages, setMessages }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const localAudioRef = useRef();
  const remoteAudioRef = useRef();
  const peerConnectionRef = useRef();
  const localStreamRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('offer', async (offer) => {
        if (!peerConnectionRef.current) {
          await setupPeerConnection();
        }
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit('answer', { roomId, answer });
      });

      socket.on('answer', async (answer) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on('ice-candidate', async (candidate) => {
        if (peerConnectionRef.current) {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('chat message');
        socket.off('offer');
        socket.off('answer');
        socket.off('ice-candidate');
      }
    };
  }, [socket, setMessages, roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (inputMessage.trim() && socket) {
      const message = { text: inputMessage.trim(), userId, username, timestamp: new Date().toLocaleTimeString() };
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

  const setupPeerConnection = async () => {
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

    setIsCallActive(true);
  };

  const startCall = async () => {
    try {
      await setupPeerConnection();
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit('offer', { roomId, offer });
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 600, margin: 'auto' }}>
        <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2, mb: 2, overflow: 'hidden' }}>
          <Typography variant="h6" gutterBottom>
            Chat Room: {roomId}
          </Typography>
          <List sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ flexDirection: 'column', alignItems: msg.userId === userId ? 'flex-end' : 'flex-start' }}>
                <Paper elevation={1} sx={{ p: 1, maxWidth: '70%', bgcolor: msg.userId === userId ? 'primary.main' : 'background.paper' }}>
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
                <Typography variant="caption" sx={{ mt: 0.5 }}>
                  {msg.username} • {msg.timestamp}
                </Typography>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              sx={{ mr: 1 }}
            />
            <IconButton color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {!isCallActive && (
            <Button variant="contained" onClick={startCall} sx={{ mr: 2 }}>
              Start Call
            </Button>
          )}
          <IconButton onClick={toggleMute} disabled={!isCallActive} color="primary">
            {isMuted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
        </Box>
        <Box sx={{ display: 'none' }}>
          <audio ref={localAudioRef} autoPlay muted />
          <audio ref={remoteAudioRef} autoPlay />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatAndVoice;
