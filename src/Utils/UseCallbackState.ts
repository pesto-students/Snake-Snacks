import { useEffect, useRef, useState } from 'react';

export default function UseCallbackState(initialState: any) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<Function | null>(null);


  const setStateAndCallback = (newState: any, cb: Function) => {
    cbRef.current = cb;
    setState(newState);
  };


  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [ state, setStateAndCallback ];
}

