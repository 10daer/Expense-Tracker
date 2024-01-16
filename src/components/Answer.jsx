function Answers({ correctAnswer, Answers, dispatch, chosenAnswer }) {
  return (
    <div className="options">
      {Answers.map((el, i) => (
        <Answer
          answer={el}
          key={i}
          dispatch={dispatch}
          chosenAnswer={chosenAnswer}
          index={i}
          correctAnswer={correctAnswer}
        />
      ))}
    </div>
  );
}

function Answer({ correctAnswer, answer, dispatch, index, chosenAnswer }) {
  const hasAnswered = chosenAnswer !== null;
  return (
    <button
      className={`btn btn-option ${index === chosenAnswer ? "answer" : ""} ${
        hasAnswered ? (index === correctAnswer ? "correct" : "wrong") : ""
      }`}
      onClick={() => dispatch({ type: "chooseAnswer", payload: index })}
      disabled={hasAnswered}
    >
      {answer}
    </button>
  );
}

// i am adding a check or cross marker to identify if you got it right or wrong on the right of the answer ans it moves to the right

export default Answers;
