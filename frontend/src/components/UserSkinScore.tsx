import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const UserSkinScore: React.FC = () => {
  const [skinData, setSkinData] = useState<{ acne: number; darkSpots: number; hydrationLevel: number }>({
    acne: 0,
    darkSpots: 0,
    hydrationLevel: 0,
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/api/user/data`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.user) {
        setSkinData(data.user.skinData);
      } else {
        console.error('Unexpected response format:', data);
      }
    } catch (error) {
      console.error('Error fetching live user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
    const socket = io(apiUrl, { transports: ['websocket', 'polling'] });

    socket.on('UserUpdated', () => {
      console.log('User data updated, refreshing...');
      fetchUser();
    });

    return () => {
      socket.disconnect();
    };
  }, [apiUrl]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center text-gray-800"
    >
      <h1 className="text-3xl font-bold mb-6">Your Skin Score</h1>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Acne Level:</span> {skinData.acne}
        </div>
        <div>
          <span className="font-semibold">Dark Spots:</span> {skinData.darkSpots}
        </div>
        <div>
          <span className="font-semibold">Hydration Level:</span> {skinData.hydrationLevel}
        </div>
      </div>
    </div>
  );
};

export default UserSkinScore;
