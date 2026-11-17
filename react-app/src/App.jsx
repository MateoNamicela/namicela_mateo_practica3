import { useState, useEffect } from 'react';
import './App.css';
import TarjetaPersonaje from './components/TarjetaPersonaje';
import { filtrarPersonajes } from './utils/filtrarPersonajes';

const URL_API = 'https://thesimpsonsapi.com/api/characters';

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    let activo = true;

    fetch(`${URL_API}?page=${pagina}`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al consultar la API`);
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (!activo) return;
        setPersonajes(datos.results);
        setTotalPaginas(datos.pages);
      })
      .catch((err) => {
        if (!activo) return;
        setError(err.message);
      })
      .finally(() => {
        if (!activo) return;
        setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [pagina]);

  const cambiarPagina = (nuevaPagina) => {
    setCargando(true);
    setError(null);
    setPagina(nuevaPagina);
  };

  const alternarFavorito = (id) => {
    setFavoritos((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((favoritoId) => favoritoId !== id)
        : [...anteriores, id]
    );
  };

  const personajesFiltrados = filtrarPersonajes(personajes, busqueda);

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Personajes de Los Simpson</h1>
        <p className="contador">Favoritos: {favoritos.length}</p>
      </header>

      <div className="barra">
        <label htmlFor="busqueda">Buscar por nombre</label>
        <input
          id="busqueda"
          type="search"
          placeholder="Ej.: Homer"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {cargando && <p className="mensaje">Cargando…</p>}

      {error && (
        <p className="mensaje error" role="alert">
          No se pudieron cargar los personajes. {error}
        </p>
      )}

      {!cargando && !error && (
        <>
          {personajesFiltrados.length === 0 ? (
            <p className="mensaje">No hay personajes que coincidan con "{busqueda}" en esta página.</p>
          ) : (
            <section className="grilla">
              {personajesFiltrados.map((personaje) => (
                <TarjetaPersonaje
                  key={personaje.id}
                  personaje={personaje}
                  esFavorito={favoritos.includes(personaje.id)}
                  alAlternarFavorito={alternarFavorito}
                />
              ))}
            </section>
          )}
        </>
      )}

      <nav className="paginacion" aria-label="Paginación">
        <button
          type="button"
          onClick={() => cambiarPagina(pagina - 1)}
          disabled={cargando || pagina === 1}
        >
          Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button
          type="button"
          onClick={() => cambiarPagina(pagina + 1)}
          disabled={cargando || pagina === totalPaginas}
        >
          Siguiente
        </button>
      </nav>
    </main>
  );
}

export default App;
