import { useState } from 'react';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { login, logout } from '../../firebase';
import film from './film.png';
import './HeaderBar.css';

function HeaderBar(props) {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user.displayName);
      console.log(user);
    } else {
      setUser(null);
      console.log('logout');
    }
  });

  return (
    <div className="HeaderBar">
      <div className="nav">
        <Link to="/">
          <img alt="" src={film} />
        </Link>
        <Link to="/"><div>영화퀴즈</div></Link>
        <Link to="/ranking"><div>랭킹</div></Link>
      </div>
      <div className="AboutUser">
        { user
          ? <><div>안녕하세요 {user}님</div><button onClick={logout}>로그아웃</button></>
          : <button onClick={login}>로그인</button> }
      </div>
    </div>
  );
}

export default HeaderBar;