import React, { useEffect } from 'react';
import { getScore } from '../../../firebase';
import HeaderBar from '../../common/HeaderBar';

function Ranking() {
  useEffect(() => {
    getScore();
  }, []);

  return (
    <div>
      <HeaderBar />
      Ranking
    </div>
  );
}

export default Ranking;