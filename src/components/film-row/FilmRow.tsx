import React, { FunctionComponent, useEffect, useState } from 'react';
import { Film, FilmDTO } from '../../types';
import { map as _map } from 'lodash';

const FilmRow: FunctionComponent<{ film: FilmDTO }> = ({ film: filmDTO }) => {
  const [film, setFilm] = useState<Film>();
  useEffect(() => {
    const { id, title, description, director, producer, release_date, rt_score } = filmDTO;
    setFilm({ id, title, description, director, producer, release_date, rt_score });
  });
  return (
    <div className="film-row">
      {_map(film, (value, column) => (
        <div key={column} className={`film-row__${column}`}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default FilmRow;
