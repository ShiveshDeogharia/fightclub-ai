// client/src/api/simulateFight.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const simulateFight = async (fighter1, fighter2) => {
  try {
    const response = await fetch(`${API_URL}/api/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fighter1, fighter2 }),
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error simulating fight:', error);
    return 'Something went wrong while simulating the fight.';
  }
};
