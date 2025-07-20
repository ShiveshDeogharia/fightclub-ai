import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FighterList.css'; 

const FighterList = () => {
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fighters')
      .then(res => setFighters(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="fighter-list">
      <h2>All Fighters</h2>
      <div className="fighter-cards">
        {fighters.map(fighter => (
          <div className="fighter-card" key={fighter._id}>
            <img src={fighter.imageUrl} alt={fighter.name} />
            <h3>{fighter.name}</h3>
            <p><strong>Sport:</strong> {fighter.sport}</p>
            <p><strong>Record:</strong> {fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FighterList;
