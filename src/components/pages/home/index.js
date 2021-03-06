import React from 'react';
import styled from 'styled-components';

const S = {
  GameWrapper: styled.div`
    display: grid;
    padding: 12px;
    grid-gap: 6px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: center;
  `,
  Game: styled.div`
    width: 300px;
    height: 200px;
    border: 2px solid black;
    border-radius: 6px;
    background: var(--adaptiveGray50);

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      transform: translateY(-2.5%);
      background: var(--adaptiveGray600);
      transition: all 0.5s ease;
    }
  `,
};
function Home({ history }) {
  return (
    <>
      <S.GameWrapper>
        <S.Game onClick={() => history.push('/actor-quiz')}>
          영화 배우 퀴즈
        </S.Game>
        <S.Game onClick={() => history.push('/director-quiz')}>
          영화 감독 퀴즈
        </S.Game>
        <S.Game onClick={() => history.push('/initial-quiz')}>
          영화 초성 퀴즈
        </S.Game>
        <S.Game onClick={() => history.push('/movie-name-relay-quiz')}>
          영화 이름 끝말잇기
        </S.Game>
        <S.Game onClick={() => history.push('/movie-score-quiz')}>
          영화 점수 퀴즈
        </S.Game>
        <S.Game onClick={() => history.push('/movie-year-quiz')}>
          영화 년도 퀴즈
        </S.Game>
      </S.GameWrapper>
    </>
  );
}

export default Home;
