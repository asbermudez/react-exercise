import React, { FunctionComponent, useState, useEffect, ReactElement } from 'react';
import { FilmDTO } from '../../types';
import filmsService from '../../services/films.service';
import FilmRow from '../film-row/FilmRow';

export enum LoadStatus {
  DONE = 'SUCCESS',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

const FilmList: FunctionComponent = () => {
  const [filmList, setFilmList] = useState<FilmDTO[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING);

  useEffect(() => {
    async function fetch() {
      try {
        setFilmList(await filmsService.getFilms());
        setLoadStatus(LoadStatus.DONE);
      } catch {
        setLoadStatus(LoadStatus.ERROR);
      }
    }
    fetch();
  }, []);

  function showStatusMessage(status: LoadStatus): ReactElement | void {
    switch (status) {
      case LoadStatus.ERROR:
        return <div>Error</div>;
      case LoadStatus.LOADING:
        return <div>Loading</div>;
    }
  }

  return (
    <section>
      {showStatusMessage(loadStatus)}
      {filmList.map((film) => (
        <FilmRow key={film.id} film={film} />
      ))}
    </section>
  );
};

export default FilmList;
