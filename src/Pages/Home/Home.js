import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Dialog from '../../Components/Dialog/Dialog';
import Button from '../../Components/Presenters/Button/Button';
import Title from '../../Components/Title/Title';
import styles from './Home.module.css';
import menu from './menu.svg';

export default function Home() {
  const history = useHistory();
  const redirectToGame = () => history.push('/game');

  return (
    <div className={styles.board}>
      <button
        type="button"
        className={styles['menu-icon']}
        onClick={Dialog.open('custom-modal')}
      >
        <img src={menu} alt="menu" />
      </button>
      <Dialog id="custom-modal">
        <div className={styles['dialog-container']}>
          <div className={styles['dialog-title']}>
            <div>Snake Snacks</div>
            <button
              type="button"
              onClick={Dialog.close('custom-modal')}
              className={styles['close-dialog']}
            >
              X
            </button>
          </div>
          {
            localStorage.getItem('access_token')
              ? null : (
                <ul className={styles['dialog-content']}>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Signup</Link></li>
                </ul>
              )
          }
        </div>
      </Dialog>
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
