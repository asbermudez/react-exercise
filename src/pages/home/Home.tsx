import React, { ReactElement } from 'react';
import './Home.css';
import FilmList from '../../components/film-list/FilmList';

function Home(): ReactElement {
  return (
    <div className="App">
      <FilmList />
    </div>
  );
}

export default Home;
