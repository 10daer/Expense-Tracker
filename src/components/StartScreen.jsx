function StartScreen({ num, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3>{num} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Start" })}
      >
        Let&apos;s Start
      </button>
    </div>
  );
}

export default StartScreen;
