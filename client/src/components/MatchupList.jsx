// client/src/components/MatchupList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MatchupList.css';

const MatchupList = () => {
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/matchups')
      .then(res => setMatchups(res.data))
      .catch(err => console.error(err));
  }, []);

  const refreshMatchups = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/matchups');
    setMatchups(res.data);
  } catch (err) {
    console.error("Failed to refresh matchups:", err);
  }
};

  const simulateFight = async (fighterA, fighterB) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/simulate', {
        fighter1: fighterA,
        fighter2: fighterB
      });
      await refreshMatchups();

    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="matchup-list">
      <h2>Fantasy Matchups</h2>
      <div className="matchup-cards">
        {matchups.map((match, index) => (
          <div className="matchup-card" key={index}>
            <h3>{match.fighterA ?? 'Unknown'} 🆚 {match.fighterB ?? 'Unknown'}</h3>
            <p><strong>Result:</strong> {match.result}</p>
            <button onClick={() => simulateFight(match.fighterA, match.fighterB)}>
              🔮 Simulate Fight with AI
            </button>
          </div>
        ))}
      </div>

      {loading && <p>⚔️ Simulating...</p>}
      
    </div>
  );
};

export default MatchupList;
