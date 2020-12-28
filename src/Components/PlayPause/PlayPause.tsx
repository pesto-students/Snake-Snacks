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
    <div className="play-pause p-2 box-border shadow-inner m-auto" style={{ width: '200px' }}>
      <div className="play-pause-inner-container m-auto">
        <div className="w-full text-center">
          <button 
            type="button" 
            onClick={() => handleRestart()}
            className="p-2 box-border rounded-sm m-4 w-28 move-btn text-white bg-black"
          >re start
          </button>
        </div>
        <div className="m-auto text-center">
          <button type="button" onClick={() => handlePlay()} className="p-2 rounded-sm m-4 w-12 move-btn text-white bg-black">play</button>
          <button type="button" onClick={() => handlePause()} className="p-2 rounded-sm m-4 w-12 move-btn text-white bg-black">pause</button>
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
