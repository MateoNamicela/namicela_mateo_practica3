const URL_IMAGENES = "https://cdn.thesimpsonsapi.com/200";

const ESTADOS = {
  Alive: "Vivo",
  Deceased: "Fallecido",
};

function TarjetaPersonaje({ personaje, esFavorito, alAlternarFavorito }) {
  const edad = personaje.age ?? "Desconocida";
  const estado = ESTADOS[personaje.status] ?? personaje.status;

  return (
    <article className="tarjeta">
      <img
        className="tarjeta-foto"
        src={`${URL_IMAGENES}${personaje.portrait_path}`}
        alt={`Retrato de ${personaje.name}`}
        loading="lazy"
      />

      <div className="tarjeta-cuerpo">
        <h2 className="tarjeta-nombre">{personaje.name}</h2>
        <p>
          <strong>Ocupación:</strong> {personaje.occupation || "Desconocida"}
        </p>
        <p>
          <strong>Edad:</strong> {edad}
        </p>
        <p>
          <strong>Estado:</strong> {estado}
        </p>
      </div>

      <button
        type="button"
        className="boton-favorito"
        aria-pressed={esFavorito}
        onClick={() => alAlternarFavorito(personaje.id)}
      >
        {esFavorito ? "* Favorito" : "° Favorito"}
      </button>
    </article>
  );
}

export default TarjetaPersonaje;
