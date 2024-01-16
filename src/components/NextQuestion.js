function NextQuestion({ answer, dispatch, index, questionNum }) {
  if (answer === null) return null;
  if (index + 1 < questionNum)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  else if (index + 1 === questionNum)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Finish" })}
      >
        Finish
      </button>
    );
}

export default NextQuestion;
