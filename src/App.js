import { useEffect, useReducer } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import NextQuestion from "./components/NextQuestion";
import Finished from "./components/Finished";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const Timersecs = 30;

const initialstate = {
  questions: [],
  // loading, success, error, active, finished,
  status: "loading",
  index: 0,
  chosenAnswer: null,
  point: 0,
  highscore: 0,
  time: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "Success":
      return { ...state, questions: action.payload, status: "success" };

    case "Error":
      return { ...state, status: "error" };

    case "Start":
      return {
        ...state,
        status: "active",
        time: Timersecs * state.questions.length,
      };

    case "chooseAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        chosenAnswer: action.payload,
        point:
          question.correctOption === action.payload
            ? state.point + question.points
            : state.point,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, chosenAnswer: null };

    case "Finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.point > state.highscore ? state.point : state.highscore,
      };

    case "Restart":
      return {
        ...initialstate,
        status: "success",
        highscore: state.highscore,
        questions: state.questions,
      };

    case "Timer":
      return {
        ...state,
        status: state.time === 0 ? "finished" : state.status,
        time: state.time - 1,
      };

    default:
      throw new Error("Unknown action");
  }
}

export function App() {
  const [
    { questions, status, index, chosenAnswer, time, point, highscore },
    dispatch,
  ] = useReducer(reducer, initialstate);

  const questionNum = questions.length;
  const max = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((questions) => dispatch({ type: "Success", payload: questions }))
      .catch((err) => dispatch({ type: "Error" }));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "success" && (
          <StartScreen num={questionNum} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questionNum={questionNum}
              index={index}
              point={point}
              TotalQuestionPoints={max}
              answer={chosenAnswer}
            />
            <Question
              questionBox={questions[index]}
              dispatch={dispatch}
              chosenAnswer={chosenAnswer}
            />
            <Footer>
              <Timer dispatch={dispatch} time={time} />
              <NextQuestion
                answer={chosenAnswer}
                dispatch={dispatch}
                index={index}
                questionNum={questionNum}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            point={point}
            maxPoint={max}
            hscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
// additional features are to keep the highscore so when the user comes back they can still see there previous high score
//  also have there prevoius answer available to practise and see their mistakes
// you may allow the user to choose th level of difficulty and number of questions
