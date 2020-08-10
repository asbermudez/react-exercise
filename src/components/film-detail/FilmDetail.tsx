import './FilmDetail.scss';
import React, { FunctionComponent, useEffect, useState, ReactElement } from 'react';
import { Film } from '../../types';
import filmsService from '../../services/films.service';
import Loader, { LoadStatus } from '../loader/Loader';

const FilmDetail: FunctionComponent<{ id: string; onClose: () => void }> = ({ id, onClose }) => {
  const [film, setFilm] = useState<Film | undefined>();
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.LOADING);

  useEffect(() => {
    async function fetch() {
      try {
        setFilm(await filmsService.getFilm(id));
        setLoadStatus(LoadStatus.DONE);
      } catch {
        setLoadStatus(LoadStatus.ERROR);
      }
    }
    fetch();
  }, [id]);

  function renderArticle(): ReactElement | void {
    if (film && loadStatus === LoadStatus.DONE) {
      const { title, release_date, director, producer, description, rt_score } = film;
      return (
        <>
          <header className="film-detail__header">
            <h1 className="film-detail__title">
              {title} ({release_date})
            </h1>
            <div className="film-detail__close" onClick={onClose} role="presentation">
              Close
            </div>
          </header>
          <section className="film-detail__info">
            <label className="film-detail__info-label">Director</label>
            {director}
          </section>
          <section className="film-detail__info">
            <label className="film-detail__info-label">Producer</label>
            {producer}
          </section>
          <section className="film-detail__info film-detail__info--description">
            <label className="film-detail__info-label">Description</label>
            {description}
          </section>
          <section className="film-detail__score">
            <label className="film-detail__score-label">Rating</label>
            {rt_score}/100
          </section>
        </>
      );
    }
  }

  return (
    <div className="film-detail">
      <div className="film-detail__background" role="presentation" onClick={onClose} />
      <article className="film-detail__modal">
        <Loader status={loadStatus} />
        {renderArticle()}
      </article>
    </div>
  );
};

export default FilmDetail;
