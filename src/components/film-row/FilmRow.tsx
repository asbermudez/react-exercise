import './FilmRow.scss';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { keys as _keys, pick as _pick, map as _map } from 'lodash';
import { Film } from '../../types';

const FilmRow: FunctionComponent<{ film: Film; columns: Partial<Record<keyof Film, string>> }> = ({
  film,
  columns,
}) => {
  const [filmReduced, setFilmReduced] = useState<Partial<Film>>();
  useEffect(() => {
    setFilmReduced(_pick(film, _keys(columns)));
  }, [film, columns]);

  const openDetails = () => {
    console.log(film.id);
  };

  return (
    <div className="film-row" onClick={openDetails} role="presentation">
      {_map(filmReduced, (value, column) => (
        <div key={column} className={`film-row__cell film-row__${column}`}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default FilmRow;
