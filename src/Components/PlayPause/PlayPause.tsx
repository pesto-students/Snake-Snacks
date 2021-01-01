import React from 'react';


export default function PlayPause(props: IProps) {

  const handlePlay = () => {
    if (props.handlePlay) {
      props.handlePlay();
    }
  };

  const handlePause = () => {
    if (props.handlePause) {
      props.handlePause();
    }
  };

  const handleRestart = () => {
    if (props.handleRestart) {
      props.handleRestart();
    }
  };


  return (
    <div className="box-border h-full mt-0 m-auto flex flex-col justify-around">
      <div className="m-auto">
        <div className="w-full text-center">
          <button 
            type="button" 
            onClick={() => handleRestart()}
            className="p-2 box-border rounded-sm m-2 w-28 md:w-10 mmd:m-4 move-btn text-white bg-black"
          >re start
          </button>
        </div>
        <div className="m-auto text-center md:flex md:flex-col">
          <button type="button" onClick={() => handlePlay()} className="p-2 rounded-sm m-2 w-12 md:w-10 mmd:m-4 move-btn md-move-btn text-white bg-black">play</button>
          <button type="button" onClick={() => handlePause()} className="p-2 rounded-sm m-2 w-12 md:w-10 mmd:m-4 move-btn md-move-btn text-white bg-black">pause</button>
        </div>
      </div>
    </div>
  );
}

interface IProps {
  handlePlay?: Function;
  handlePause?: Function;
  handleRestart?: Function;
}

PlayPause.defaultProps = {
  handlePlay: () => {},
  handlePause: () => {},
  handleRestart: () => {},
};
