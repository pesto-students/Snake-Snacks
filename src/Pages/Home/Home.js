import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../Components/Presenters/Button/Button';
import Title from '../../Components/Title/Title';
import styles from './Home.module.css';

export default function Home() {
  const history = useHistory();
  const redirectToGame = () => history.push('/game');

  return (
    <div className={styles.board}>
      <div className="title-container">
        <Title name="Snake" className={['title-8', 'white']} />
        <Title name="Snack" className={['title-7', 'white-gray']} />
      </div>
      <div className={styles.buttons}>
        <Button
          title="Start game as guest"
          handleClick={redirectToGame}
          classNames={['white']}
        />
        <Button
          isDisabled
          title="Start game as Multiplayer"
          classNames={['white']}
        />
      </div>
    </div>
  );
}
