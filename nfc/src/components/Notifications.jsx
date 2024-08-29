import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Badge, IconButton, Typography, Divider, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getFirestore, doc, updateDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth,db } from '../utils/firebase-config';

// Initialize Firestore

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const currentUserId = auth.currentUser.uid;
  console.log(auth.currentUser);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const friendRequestsRef = collection(db, 'friendRequests');
        const q = query(friendRequestsRef, where('receiverId', '==', currentUserId), where('status', '==', 'pending'));
        const querySnapshot = await getDocs(q);
        const requests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotifications(requests);
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
      }
    };

    fetchNotifications();
  }, [currentUserId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = async (notificationId, senderUid) => {
    try {
      console.log(senderUid, notificationId);
  
      // Update the friend request status to 'accepted'
      const friendRequestRef = doc(db, 'friendRequests', notificationId);
      await updateDoc(friendRequestRef, { status: 'accepted' });
      console.log('Friend request accepted');
  
      // Fetch the sender's user document
      const senderUser = await readDocumentByUid('users', senderUid);
      if (!senderUser) {
        throw new Error('Sender does not exist in the Firestore database');
      }
      console.log("Sender's user document:", senderUser);
  
      // Fetch the current user's document
      const currentUser = await readDocumentByUid('users', currentUserId);
      if (!currentUser) {
        throw new Error('Current user does not exist in the Firestore database');
      }
      
      // Update the friends list for both users
      const updatedSenderFriends = { ...senderUser.friends, [currentUserId]: `/users/${currentUserId}` };
      const updatedCurrentUserFriends = { ...currentUser.friends, [senderUid]: `/users/${senderUid}` };
  
      const currentUserRef = doc(db, 'users', currentUserId);
      const senderUserRef = doc(db, 'users', senderUid);
  
      await updateDoc(currentUserRef, { friends: updatedCurrentUserFriends });
      await updateDoc(senderUserRef, { friends: updatedSenderFriends });
  
      console.log('Friends list updated for both users');
  
      // Fetch updated notifications
      const friendRequestsRef = collection(db, 'friendRequests');
      const q = query(friendRequestsRef, where('receiverId', '==', currentUserId), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const updatedRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(updatedRequests);
  
    } catch (error) {
      console.error('Error accepting friend request:', error.message);
    }
  };
  
  const handleReject = async (notificationId) => {
    try {
      await updateDoc(doc(db, 'friendRequests', notificationId), { status: 'rejected' });
      console.log('Friend request rejected');

      // Fetch updated notifications
      const friendRequestsRef = collection(db, 'friendRequests');
      const q = query(friendRequestsRef, where('receiverId', '==', currentUserId), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      const updatedRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(updatedRequests);
    } catch (error) {
      console.error('Error rejecting friend request:', error.message);
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: 400, width: '300px' } }}
      >
        {notifications.length === 0 ? (
          <MenuItem>
            <Typography>No notifications</Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem key={notification.id}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant="body1">
                  {`Friend request from ${notification.senderId}`}
                </Typography>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary" onClick={() => handleAccept(notification.id, notification.senderId)}>
                    Accept
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleReject(notification.id)}>
                    Reject
                  </Button>
                </div>
                <Divider style={{ margin: '10px 0' }} />
              </div>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default Notifications;
