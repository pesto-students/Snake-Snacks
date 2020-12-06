import React from 'react';
import Button from '../Presenters/Button/Button';
import InputElement from '../Presenters/InputElement/InputElement';
import Title from '../Title/Title';
import styles from './Board.module.css';

export default function Board() {
  return (
    <div className={styles.board}>
      <div className="title-container">
        <Title name="Snake" className={['title-8', 'white']} />
        <Title name="Snack" className={['title-7', 'white-gray']} />
      </div>
      <div className={styles.buttons}>
        <Button title="Start game as guest" classNames={['white']} />
        <Button title="Start game as Multiplayer" classNames={['white', 'tango']} />
        <div className={styles['user-actions']}>
          <Button title="Login" classNames={['white', 'tango']} />
          <Button title="SignUp" classNames={['white', 'tango']} />
        </div>
        <InputElement placeholder="Enter Placeholder Here" type="text" />
      </div>
    </div>
  );
}
