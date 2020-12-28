import React from 'react';
import JoyStick from '../../Components/JoyStick/JoyStick';
import PlayPause from '../../Components/PlayPause/PlayPause';
import ScoreBoard from '../../Components/ScoreBoard/ScoreBoard';
import { Title } from '../../Components/Title/Title';
import TitleAnimation from '../../Components/TitleAnimation/TitleAnimation';
import HomeActions from '../HomeActions/HomeActions';


export default function DigiBoard() {

  return (
    <div className="h-screen w-screen box-border c-linear-gradient rounded-xl c-box-shadow overflow-hidden">
      <div
        className="h-full align-top w-4/5 md:w-full md:h-4/5 sm:w-full sm:h-4/5 inline-block border-xl md:border-8 sm:border-8 border-black bg-springRain60 rounded-md box-border"
      >
        <div className="c-reflector" />
        <div className="h-full w-full p-8 relative flex flex-col justify-center items-center" id="board">
          <TitleAnimation />
          <HomeActions />
        </div>
      </div>
      <div className="h-full w-1/5 md:w-full md:h-1/5 sm:w-full sm:h-1/5 inline-block box-border bg-bermudaGray c-box-shadow overflow-hidden">
        <div className="h-full flex flex-col flex-wrap justify-between pb-8 pt-8 box-border">
          <div className="md:hidden">
            <Title />
          </div>
          {/* <div className="border-8 border-black m-1 bg-flaxShade relative shadow-inner overflow-hidden">
            <div className="absolute -top-8 bottom-0 right-0 left-0 c-glass transform -rotate-12" />
          </div> */}
          <ScoreBoard />
          <div className="flex-grow" />
          <div className="relative justify-self-end z-10">
            <PlayPause />
            <JoyStick />
          </div>
        </div>
      </div>
    </div>
  );
}
