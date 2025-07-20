import React from 'react';
import FighterList from './components/FighterList';
import MatchupList from './components/MatchupList';

function App() {
  return (
    <div className="App">
      <h1>🥊 FightClub.AI</h1>
      <FighterList />
      <hr />
      <MatchupList />
    </div>
  );
}

export default App;
