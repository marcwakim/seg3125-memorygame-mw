import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); 
  const [speed, setSpeed] = useState(1000); 
  const [sequence, setSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  
  const generateSequence = (currentScore) => {
    const length = currentScore + 1; 
    let newSeq = '';
    for (let i = 0; i < length; i++) {
      newSeq += Math.floor(Math.random() * 10).toString();
    }
    return newSeq;
  };

  const startGame = () => {
    setScore(0);
    nextRound(0);
  };

  const nextRound = (currentScore) => {
    const newSequence = generateSequence(currentScore);
    setSequence(newSequence);
    setGameState('playing');
    setUserInput('');

    
    setTimeout(() => {
      setGameState('guessing');
    }, speed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === sequence) {
      const newScore = score + 1;
      setScore(newScore);
      nextRound(newScore);
    } else {
      if (score > highScore) setHighScore(score);
      setGameState('gameover');
    }
  };

  return (
    <div className="app-container">
      {gameState === 'menu' && (
        <div className="menu-screen">
          <h1>MEMORY_BENCHMARK</h1>
          <div className="config-box">
            <p>SELECT SPEED</p>
            <div className="speed-toggles">
              <button 
                className={speed === 5000 ? 'active' : ''} 
                onClick={() => setSpeed(5000)}>5 SECONDS (RELAXED)
              </button>
              <button 
                className={speed === 1000 ? 'active' : ''} 
                onClick={() => setSpeed(1000)}>1 SECOND (BLITZ)
              </button>
            </div>
            <button className="start-btn" onClick={startGame}>START TEST</button>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="playing-screen">
          <div className="score-display">SCORE: {score}</div>
          <div className="flash-box">
            <h2 className="sequence-text">{sequence}</h2>
            <div className="progress-bar" style={{ animationDuration: `${speed}ms` }}></div>
          </div>
        </div>
      )}

      {gameState === 'guessing' && (
        <div className="guessing-screen">
          <div className="score-display">SCORE: {score}</div>
          <form onSubmit={handleSubmit} className="input-form">
            <label>What was the number?</label>
            <input 
              type="number" 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)} 
              autoFocus 
            />
            <button type="submit" className="start-btn">SUBMIT</button>
          </form>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="gameover-screen">
          <h1>GAME OVER</h1>
          <div className="stats-box">
            <p className="final-score">Final Score: {score}</p>
            <p className="high-score">Personal Best: {highScore}</p>
          </div>
          <div className="action-buttons">
            <button onClick={() => setGameState('menu')}>MAIN MENU</button>
            <button className="start-btn" onClick={startGame}>TRY AGAIN</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;