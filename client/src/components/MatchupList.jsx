import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MatchupList.css';

const MatchupList = () => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/matchups')
      .then(res => setMatchups(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="matchup-list">
      <h2>Fantasy Matchups</h2>
      <div className="matchup-cards">
        {matchups.map((match, index) => (
          <div className="matchup-card" key={index}>
            <h3>{match.fighterA?.name ?? 'Unknown'} 🆚 {match.fighterB?.name ?? 'Unknown'}</h3>
            <p><strong>Result:</strong> {match.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchupList;
