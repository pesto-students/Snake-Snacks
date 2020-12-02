import React from 'react';
import Button from '../Button/Button';
import Title from '../Title/Title';

export default function Board() {
  return (
    <div className="board">
      <Title name="Snake" className={['title-6', 'white']} />
      <Title name="Snack" className={['title-5', 'white-gray']} />
      <Button title="Start game as guest" classNames={['white']} />
    </div>
  );
}
