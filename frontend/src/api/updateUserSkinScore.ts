

export const updateUserSkinScore = async (acne:number,darkSpots:number,hydration:number) => {
  const API_URL = import.meta.env.VITE_API_URL;

     try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ acne,darkSpots,hydrationLevel:hydration }),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      const data = await response.json();

      if (data) {
        console.log(data)
        return;
      } else {
        throw new Error('update failed. Please try again.');
      }
    } catch (error: any) {
      console.log(error.message || 'An error occurred. Please try again later.');
    }
}