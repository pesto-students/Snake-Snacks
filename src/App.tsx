import React from 'react';
import { Router, Link } from '@reach/router';


const Home = () => <div>Home</div>;
const Game = () => <div>Dash</div>;

function App() {
  return (
    <div className="bg-springRain60 w-screen h-screen">
      <Router>
        <Home path="/" />
        <Game path="game" />
      </Router>
    </div>
  );
}

export default App;
