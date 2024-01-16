import { useEffect } from "react";

function Timer({ time, dispatch }) {
  const min = Math.floor(time / 60);
  const secs = time % 60;
  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "Timer" }), 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {`${min}`.padStart(2, 0)}:{`${secs}`.padStart(2, 0)}
    </div>
  );
}

export default Timer;
