// src/dummyData.js

const dummyGameSessions = [
    {
      id: '1',
      gameTitle: 'Valorant',
      sessionDate: '2024-08-29',
      duration: '2 hours',
      players: [
        { username: 'Ashok', rank: 'Gold' },
        { username: 'Karan', rank: 'Silver' }
      ],
      status: 'Completed'
    },
    {
      id: '2',
      gameTitle: 'Apex Legends',
      sessionDate: '2024-08-28',
      duration: '1.5 hours',
      players: [
        { username: 'Rajeev', rank: 'Platinum' },
        { username: 'Neha', rank: 'Gold' }
      ],
      status: 'Ongoing'
    },
    {
      id: '3',
      gameTitle: 'Fortnite',
      sessionDate: '2024-08-27',
      duration: '3 hours',
      players: [
        { username: 'Raghav', rank: 'Diamond' },
        { username: 'Pankaj', rank: 'Platinum' }
      ],
      status: 'Cancelled'
    },
    // Add more dummy sessions as needed
  ];
  
  export default dummyGameSessions;
  