import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import Game from './Pages/Game/Game';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="bg-white w-screen h-screen box-border">
      <Router>
        <RouterPage path="/" pageComponent={<Home />} />
        <RouterPage path="/game" pageComponent={<Game />} />
      </Router>
    </div>
  );
}

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export default App;
