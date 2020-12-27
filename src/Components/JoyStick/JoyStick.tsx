/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

export default function JoyStick() {

  const handleClick = (key: string) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { 'key':  key }));
  };

  return (
    <div className="relative h-40 w-40 md:h-24 md:w-24 m-auto">
      <button type="button" onClick={() => handleClick('ArrowUp')} className="bg-gray-600 absolute left-12 md:left-8 w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
        <span className="transform rotate-90 text-2xl">{'<'}</span>
      </button>
      <button type="button" onClick={() => handleClick('ArrowLeft')} className="bg-gray-600 absolute left-0 top-10 md:top-6  w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
        <span className="text-2xl">{'<'}</span>
      </button>
      <button type="button" onClick={() => handleClick('ArrowRight')} className="bg-gray-600 absolute right-0 top-10 md:top-6 w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
        <span className="text-2xl">{'>'}</span>
      </button>
      <button type="button" onClick={() => handleClick('ArrowDown')} className="bg-gray-600 absolute left-12 md:left-8 bottom-2 w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
        <span className="transform rotate-90 text-2xl">{'>'}</span>
      </button>
    </div>
  );
}
