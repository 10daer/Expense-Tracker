function Finished({ point, hscore, maxPoint, dispatch }) {
  const percentage = (point / maxPoint) * 100;
  let emoji;
  if (percentage >= 1) emoji = "😞";
  if (percentage >= 25) emoji = "😔";
  if (percentage >= 50) emoji = "😊";
  if (percentage >= 75) emoji = "🍾";
  if (percentage === 100) emoji = "🏅";
  return (
    <>
      <p className="result">
        {emoji} You Scored {point} Out Of {maxPoint} Points (
        {Math.ceil(percentage)})%
      </p>
      <p className="highscore">(HighScore: {hscore} Points )</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finished;
