import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { movieApi } from '../../../api/movieApi';
import { adaptiveBackground, flexCentering } from '../../../style/mixin';
import extractKoPhonemes from '../../../utils/extractKoPhonemes';

const S = {
  Wrapper: styled.div`
    padding: 5vw;
  `,
  QuizTitle: styled.div`
    margin-bottom: 16px;
  `,
  QuizDesc: styled.div`
    margin-bottom: 16px;
  `,
  CharBoxWrapper: styled.div`
    display: flex;
    justify-content: space-around;
    background: var(--lightyellow);

    padding: 16px;
  `,
  CharBox: styled.div`
    ${flexCentering('row')};
    width: 50px;
    height: 50px;
    background: var(--yellow);
    color: var(--adaptiveGray900);
    font-weight: 900;
    font-size: 32px;
    border-radius: 6px;
  `,
  Hint: styled.button`
    margin: 16px;
    border: none;
    background: none;
    color: var(--adaptiveGray900);
    text-decoration: underline;
    cursor: pointer;
    line-height: 1.5;
  `,
  Synopsis: styled.div`
    padding-bottom: 16px;
    margin: 16px;
  `,
  InputWrapper: styled.div`
    ${flexCentering('column')};
    width: 100%;
    text-align: center;
    margin: 16px;
  `,
  Input: styled.input`
    padding: 16px;
    border-radius: 6px;
    width: 50vw;
    border: 2px solid var(--adaptiveGray900);
    margin-top: 16px;

    &:hover,
    &:focus {
      border: 2px solid var(--blue);
      transition: border 0.5s ease;
    }
  `,
  Button: styled.div`
    background: var(--adaptiveGray900);
    color: var(--adaptiveGray50);
    cursor: pointer;
    padding: 16px;

    width: 250px;
    text-align: center;
    border-radius: 6px;
    margin-top: 16px;
  `,
};

const getRandomNumber = (n) => Math.floor(Math.random() * n) + 1;
const getMostPopularMovie = (arr) =>
  arr.reduce((acc, cur) => (acc?.popularity <= cur?.popularity ? cur : acc));

function InitialQuiz(props) {
  const [movieData, setmovieData] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [userInputValue, setuserInputValue] = useState('');
  const [score, setScore] = useState(0);

  async function getMovieData() {
    try {
      const pageNumber = getRandomNumber(450);
      const {
        data: { results },
        status,
      } = await movieApi.popular(pageNumber);

      const mostPopularMovie = getMostPopularMovie(results);
      const cleanUpTitle = mostPopularMovie.title
        .trim()
        .replaceAll(/(\s|[0-9]|:|\/|\.|,|\?|!|-)/g, '');

      if (!cleanUpTitle) throw new Error('title is missing');
      if (status >= 400) throw new Error(`status ${status}`);

      mostPopularMovie.title = cleanUpTitle;

      setmovieData(mostPopularMovie);
      console.log(mostPopularMovie.title);
    } catch (error) {
      console.log(error);
      toast.error(`sorry. error occured ${error.message}`);
    }
  }

  useEffect(() => {
    getMovieData();
  }, []);

  const onSubmitAnswer = () => {
    if (props.isRank) {
      if (userInputValue === movieData.title) {
        props.quizCorrect();
      } else {
        props.quizWrong();
      }
    } else if (userInputValue === movieData.title) {
      toast.success('??????! ?????? + 1???');
      setScore((prev) => prev + 1);
    } else {
      toast.error('??????!');
    }
    setuserInputValue('');
    getMovieData();
  };

  return (
    <S.Wrapper>
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <S.QuizTitle>?????? ??????</S.QuizTitle>
      <S.QuizDesc>?????? ????????? ?????? ?????? ????????? ???????????????</S.QuizDesc>
      <S.QuizDesc>* ?????? ??????????????? ????????? ?????????????????????.</S.QuizDesc>
      <S.QuizDesc>* ???????????? ???????????? ???????????? ???????????????</S.QuizDesc>

      <div>
        {movieData && (
          <>
            <S.CharBoxWrapper>
              {[...movieData.title].map((char, i) => (
                <S.CharBox key={i}>
                  {extractKoPhonemes(char).initial
                    ? extractKoPhonemes(char).initial
                    : extractKoPhonemes(char)}
                </S.CharBox>
              ))}
            </S.CharBoxWrapper>

            <S.Hint onClick={() => setShowHint((prev) => !prev)}>
              ??????{showHint ? '??????' : '??????'} (????????????)
            </S.Hint>
            {showHint && (
              <S.Synopsis>
                {movieData.overview.length > 0 ? movieData.overview : '?????? ????'}
              </S.Synopsis>
            )}
          </>
        )}
      </div>

      <S.InputWrapper>
        <S.Input
          type="text"
          placeholder="?????? ???????????????"
          value={userInputValue}
          onChange={(e) => setuserInputValue(e.target.value)}
        />
        <S.Button onClick={onSubmitAnswer}>????????????</S.Button>
      </S.InputWrapper>
    </S.Wrapper>
  );
}

export default InitialQuiz;
