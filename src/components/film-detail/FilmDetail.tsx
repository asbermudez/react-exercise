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

  function renderArticle(): ReactElement | undefined {
    if (film && loadStatus === LoadStatus.DONE) {
      const { title, release_date: releaseDate, director, producer, description, rt_score: rtScore } = film;
      return (
        <>
          <header className="film-detail__header">
            <h1 className="film-detail__title">
              {title} ({releaseDate})
            </h1>
            <div className="film-detail__close" onClick={onClose} role="presentation">
              Close
            </div>
          </header>
          <section className="film-detail__info">
            <span className="film-detail__info-label">Director</span>
            {director}
          </section>
          <section className="film-detail__info">
            <span className="film-detail__info-label">Producer</span>
            {producer}
          </section>
          <section className="film-detail__info film-detail__info--description">
            <span className="film-detail__info-label">Description</span>
            {description}
          </section>
          <section className="film-detail__score">
            <span className="film-detail__score-label">Rating</span>
            {rtScore}/100
          </section>
        </>
      );
    }

    return undefined;
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
