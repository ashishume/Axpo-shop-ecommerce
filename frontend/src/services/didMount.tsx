import { useEffect, useState } from "react";

const useDidMount = (initalState = false) => {
  const [didMount, setDidMount] = useState(initalState);
  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, []);

  return didMount;
};

export default useDidMount;
