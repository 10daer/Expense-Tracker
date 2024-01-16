import Answers from "./Answer";

function Question({ questionBox, dispatch, chosenAnswer }) {
  return (
    <>
      <h2>{questionBox.question}</h2>
      <Answers
        Answers={questionBox.options}
        dispatch={dispatch}
        chosenAnswer={chosenAnswer}
        correctAnswer={questionBox.correctOption}
      />
    </>
  );
}

export default Question;
