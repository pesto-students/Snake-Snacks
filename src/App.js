import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Game from './Pages/Game/Game';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import userContext from './Utils/userContext';

function App() {
  const [username, setUsername] = useState();
  const [id, setId] = useState();

  return (
    <userContext.Provider value={{
      username, setUsername, id, setId,
    }}
    >
      <div data-testid="App" className="App">
        <Router>
          <Switch>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
