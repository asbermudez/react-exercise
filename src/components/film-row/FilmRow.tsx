import './FilmRow.scss';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { keys as _keys, pick as _pick, map as _map } from 'lodash';
import { Film } from '../../types';

const FilmRow: FunctionComponent<{
  film: Film;
  columns: Partial<Record<keyof Film, string>>;
  onClick: (id: string) => void;
  selected?: string;
}> = ({ film, columns, selected, onClick }) => {
  const [filmReduced, setFilmReduced] = useState<Partial<Film>>();
  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    setFilmReduced(_pick(film, _keys(columns)));
  }, [film, columns]);

  useEffect(() => {
    setSelectedClass(selected === film.id ? 'film-row--selected' : '');
  }, [selected, film]);

  return (
    <div className={`film-row ${selectedClass}`} onClick={() => onClick(film.id)} role="presentation">
      {_map(filmReduced, (value, column) => (
        <div key={column} className={`film-row__cell film-row__${column}`}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default FilmRow;
