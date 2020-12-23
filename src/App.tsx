import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import Game from './Pages/Game/Game';


const Home = () => <div>Home</div>;

function App() {
  return (
    <div className="bg-springRain60 w-screen h-screen">
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
