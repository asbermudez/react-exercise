import React, { ReactElement } from 'react';
import './Home.scss';
import FilmList from '../../components/film-list/FilmList';

function Home(): ReactElement {
  return (
    <>
      <div className="home">
        <header className="home__header">
          <h2 className="home__title">Ghibli film DB</h2>
        </header>
        <FilmList children="home__body" />
      </div>
    </>
  );
}

export default Home;
