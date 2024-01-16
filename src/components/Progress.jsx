function Progress({ index, questionNum, point, TotalQuestionPoints, answer }) {
  return (
    <div className="progress">
      <progress max={questionNum} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionNum}
      </p>
      <p>
        <strong>{point}</strong> / {TotalQuestionPoints}
      </p>
    </div>
  );
}

export default Progress;
