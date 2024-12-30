

export const updateUserSkinScore = async (acne:number,darkSpots:number,hydration:number) => {
  const API_URL = import.meta.env.VITE_API_URL;

     try {
      const userId = JSON.parse(localStorage.getItem("user") as string)
      const response = await fetch(`http://localhost:4000/api/user/update/skin-data/677289e061e52c39c42c7780`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({skinData:{ acne,darkSpots,hydrationLevel:hydration }}),
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