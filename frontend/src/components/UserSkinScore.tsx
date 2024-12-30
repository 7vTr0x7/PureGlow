import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import RecommendedProducts from './RecommendedProducts';

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

  return  skinData && (
    <div
      className="flex flex-col  justify-between items-center pb-10  bg-gray-100 text-center text-gray-800"
    >
      <h1 className="text-3xl font-bold mb-6">Your Skin Score</h1>
     <div className=" flex gap-10 items-center">
        <div>
          <span className="font-semibold">Acne Level:</span> {skinData?.acne}
        </div>
        <div>
          <span className="font-semibold">Dark Spots:</span> {skinData?.darkSpots}
        </div>
        <div>
          <span className="font-semibold">Hydration Level:</span> {skinData?.hydrationLevel}
        </div>
      </div>


        <h1 className='mb-3 text-xl flex justify-start px-20 mt-8 text-start w-full font-semibold'>/Recommended Products</h1>

      <RecommendedProducts acneLevel={skinData?.acne} darkSpots={skinData?.darkSpots} hydrationLevel={skinData?.hydrationLevel} />
    </div>
  );
};

export default UserSkinScore;
