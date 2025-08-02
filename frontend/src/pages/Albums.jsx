// src/pages/Albums.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/albums')
      .then(res => setAlbums(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Albumy</h1>

      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-[200px]">
          {albums.length > 0 ? (
            albums.map(album => (
              <li key={album.id} className="border p-4 rounded">
                {album.title}
              </li>
            ))
          ) : (
            // placeholder zajmujący całą szerokość gridu, ale pusty
            <li className="col-span-full h-full flex items-center justify-center text-gray-400">
              Brak albumów – dodaj pierwszy album w panelu administratora
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
