import React, { useState, useEffect } from 'react';
import './movieNameRelayQuiz.css';
import { movieApi } from '../../../api/movieApi';
import HoonsModal from '../../common/HoonsModal';

function MovieNameRelayQuiz(props) {
  const [movieTitle, setTitle] = useState(null);
  const [titleHint, setHint] = useState(null);
  const [titleAnswer, setAnswer] = useState(null);
  const [answerLength, setLength] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setCorrect] = useState(false);
  const makeRandomNumber = (n) => (Math.floor(Math.random(0) * (n - 1) + 1));

  const popFailModal = () => {
    setCorrect(false);
    setShowModal(true);
  };

  const popCorrectModal = () => {
    setCorrect(true);
    setShowModal(true);
    setTimeout(() => { setShowModal(false); }, 700);
  };

  const setAnswerLength = (answer) => {
    setLength(answer);
  };

  const setQuizData = (title) => {
    setHint(title.substring(0, title.length / 2));
    setAnswer(title.substring(title.length / 2).replace(/ /gi, ''));
    setAnswerLength(title.substring(title.length / 2).replace(/ /gi, '').length);
  };

  const setData = async () => {
    const { data } = await movieApi.popular(makeRandomNumber(5));
    const title = data.results[makeRandomNumber(20)].title;
    setTitle(title);
    setQuizData(title);
  };

  const checkAnswer = (e) => {
    const answer = titleAnswer.toUpperCase().replace(/ /gi, '');
    const userAnswerModify = userAnswer.toUpperCase().replace(/ /gi, '');
    if (props.isRank) {
      if (userAnswerModify === answer) {
        props.quizCorrect();
      } else {
        props.quizWrong();
      }
    } else if (userAnswerModify === answer) {
      popCorrectModal();
      setScore(score + 1);
      setUserAnswer('');
    } else {
      popFailModal();
    }
  };

  const enterkey = () => {
    if (window.event.keyCode === 13) {
      checkAnswer();
    }
  };

  useEffect(() => {
    setData();
  }, [score]);

  return (
    <>
      <>
        {isCorrect ? <HoonsModal isCorrect={isCorrect} showModal={showModal} setshowModal={setShowModal} title="???????????????!" /> : <HoonsModal showModal={showModal} setshowModal={setShowModal} title="???????????????!" answer={movieTitle} />}
      </>
      <div>
        <div className="title">
          <div className="question-header">
            <div className="question-title">3. ?????? ???????????????</div>
            <div className="question-content">???????????? ?????? ????????? ???????????????.</div>
          </div>
          { props.isRank ? <div> </div> : <div className="current-score">?????? ?????? : { score } ???</div> }
        </div>
        <div className="question-box1">
          <div className="quiz-content-hint">{ titleHint }</div>
          <div className="quiz-content-quiz">{ '? '.repeat(answerLength) }</div>
        </div>
        <div className="answer-box">
          <div className="answer-box-title">???:</div>
          <input onKeyPress={enterkey} onChange={(e) => setUserAnswer(e.target.value)} type="text" value={userAnswer} className="answer-box-content" />
        </div>
        <div onClick={(e) => checkAnswer(e)} className="answer-button">
          <div> ?????? ?????? </div>
        </div>
      </div>
    </>
  );
}

export default MovieNameRelayQuiz;
