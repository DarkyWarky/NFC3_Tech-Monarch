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
