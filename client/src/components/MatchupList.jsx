// client/src/components/MatchupList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MatchupList.css';

const MatchupList = () => {
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [trashTalks, setTrashTalks] = useState({});

  const [userName, setUser] = useState('');
  const [opponent, setOpponent] = useState('');
  const [coach, setCoach] = useState('');
  const [coachAdvice, setCoachAdvice] = useState('');


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

  const generateTrashTalk = async (fighterA, fighterB, index) => {
    try {
      const response = await axios.post('http://localhost:5000/api/trash-talk', {
        fighter1: fighterA,
        fighter2: fighterB
      });
      const newTrashTalks = { ...trashTalks };
      newTrashTalks[index] = response.data.trashTalk;
      setTrashTalks(newTrashTalks);
    } catch (err) {
      console.error("Trash talk error:", err);
      setTrashTalks((prev) => ({ ...prev, [index]: "❌ Error generating trash talk." }));
    }
  };


  const getCoachingAdvice = async () => {
    setCoachAdvice("Loading...");
    try {
          const response = await axios.post(
          'http://localhost:5000/api/coach',
          { userName, opponent, coach },
          { headers: { "Content-Type": "application/json" } }
        );

        setCoachAdvice(response.data.advice);
    } catch (err) {
      console.error("Coach advice error:", err);
      setCoachAdvice("❌ Error getting coaching advice.");
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

            <button onClick={() => generateTrashTalk(match.fighterA, match.fighterB, index)}>
              🔥 Trash Talk
            </button>

            {trashTalks[index] && (
              <p className="trash-talk">🗣️ {trashTalks[index]}</p>
            )}

          </div>
        ))}
      </div>
      {/* 🧠 AI Coach Section */}
      <div className="coach-section">
        <h3>🧠 Get Coaching Advice</h3>
        <input
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Opponent's name"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Choose a coach (e.g. Mike Tyson)"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
        />
        <button onClick={getCoachingAdvice}>🏋️ Get Advice</button>
        {coachAdvice && (
          <div className="coach-response" dangerouslySetInnerHTML={{ __html: coachAdvice.replace(/\n/g, "<br/>") }} />
        )}

      </div>


      {loading && <p>⚔️ Simulating...</p>}
      
    </div>
  );
};

export default MatchupList;
