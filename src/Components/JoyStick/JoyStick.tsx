/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './JoyStick.css';

export default function JoyStick() {

  const handleClick = (key: string) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { 'key':  key }));
  };

  return (
    <div className="joystick-container  p-2  w-full box-border">
      <div className="w-full h-full shadow-inner p-2">
        <div className=" p-2 box-border bg-bermudaGray h-full shadow relative">
          <button type="button" onClick={() => handleClick('ArrowUp')} className="btn-up bg-gray-900 text-white absolute  w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
            <span className="transform rotate-90 text-2xl">{'<'}</span>
          </button>
          <button type="button" onClick={() => handleClick('ArrowLeft')} className="btn-left bg-gray-900 text-white absolute  w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
            <span className="text-2xl">{'<'}</span>
          </button>
          <button type="button" onClick={() => handleClick('ArrowRight')} className="btn-right bg-gray-900 text-white absolute w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
            <span className="text-2xl">{'>'}</span>
          </button>
          <button type="button" onClick={() => handleClick('ArrowDown')} className="btn-down bg-gray-900 text-white absolute w-12 md:w-8 h-12 md:h-8 btn-box-shadow rounded-full flex flex-col items-center text-center justify-center">
            <span className="transform rotate-90 text-2xl">{'>'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
