import './FilmList.scss';
import React, { FunctionComponent, useState, useEffect, ReactElement } from 'react';
import { map as _map } from 'lodash';
import { Film } from '../../types';
import filmsService from '../../services/films.service';
import FilmRow from '../film-row/FilmRow';
import FilmDetail from '../film-detail/FilmDetail';
import Loader, { LoadStatus } from '../loader/Loader';

const FilmList: FunctionComponent = () => {
  const [filmList, setFilmList] = useState<Film[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING);
  const [selectedFilm, setSelectedFilm] = useState<string | undefined>();

  const columns: Partial<Record<keyof Film, string>> = {
    title: 'Title',
    description: 'Description',
    director: 'Director',
    producer: 'Producer',
    release_date: 'Release date',
    rt_score: 'Rating',
  };

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

  function renderModal(): ReactElement | undefined {
    return selectedFilm ? <FilmDetail id={selectedFilm} onClose={() => setSelectedFilm(undefined)} /> : undefined;
  }

  return (
    <>
      <section className="film-list">
        <header className="film-row film-list__header">
          {_map(columns, (title, key) => (
            <div className="film-list__column" key={key}>
              {title}
            </div>
          ))}
        </header>
        <Loader status={loadStatus} />
        {filmList.map((film) => (
          <FilmRow
            key={film.id}
            film={film}
            columns={columns}
            selected={selectedFilm}
            onClick={(id) => {
              setSelectedFilm(id);
            }}
          />
        ))}
      </section>
      {renderModal()}
    </>
  );
};

export default FilmList;
