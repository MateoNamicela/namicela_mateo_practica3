<script setup>
import { ref, computed, watch } from 'vue'
import TarjetaPersonaje from './components/TarjetaPersonaje.vue'
import { filtrarPersonajes } from './utils/filtrarPersonajes'

const URL_API = 'https://thesimpsonsapi.com/api/characters'

const personajes = ref([])
const cargando = ref(true)
const error = ref(null)
const busqueda = ref('')
const favoritos = ref([])
const pagina = ref(1)
const totalPaginas = ref(1)

watch(
  pagina,
  (nuevaPagina, paginaAnterior, onCleanup) => {
    let activo = true
    onCleanup(() => {
      activo = false
    })

    cargando.value = true
    error.value = null

    fetch(`${URL_API}?page=${nuevaPagina}`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al consultar la API`)
        }
        return respuesta.json()
      })
      .then((datos) => {
        if (!activo) return
        personajes.value = datos.results
        totalPaginas.value = datos.pages
      })
      .catch((err) => {
        if (!activo) return
        error.value = err.message
      })
      .finally(() => {
        if (!activo) return
        cargando.value = false
      })
  },
  { immediate: true },
)

const alternarFavorito = (id) => {
  if (favoritos.value.includes(id)) {
    favoritos.value = favoritos.value.filter((favoritoId) => favoritoId !== id)
  } else {
    favoritos.value.push(id)
  }
}

const personajesFiltrados = computed(() => filtrarPersonajes(personajes.value, busqueda.value))
</script>

<template>
  <main class="contenedor">
    <header class="encabezado">
      <h1>Personajes de Los Simpson</h1>
      <p class="contador">Favoritos: {{ favoritos.length }}</p>
    </header>

    <div class="barra">
      <label for="busqueda">Buscar por nombre</label>
      <input id="busqueda" v-model="busqueda" type="search" placeholder="Ej.: Homer" />
    </div>

    <p v-if="cargando" class="mensaje">Cargando…</p>

    <p v-else-if="error" class="mensaje error" role="alert">
      No se pudieron cargar los personajes. {{ error }}
    </p>

    <p v-else-if="personajesFiltrados.length === 0" class="mensaje">
      No hay personajes que coincidan con "{{ busqueda }}" en esta página.
    </p>

    <section v-else class="grilla">
      <TarjetaPersonaje
        v-for="personaje in personajesFiltrados"
        :key="personaje.id"
        :personaje="personaje"
        :es-favorito="favoritos.includes(personaje.id)"
        @alternar-favorito="alternarFavorito"
      />
    </section>

    <nav class="paginacion" aria-label="Paginación">
      <button type="button" :disabled="cargando || pagina === 1" @click="pagina--">
        Anterior
      </button>
      <span>Página {{ pagina }} de {{ totalPaginas }}</span>
      <button type="button" :disabled="cargando || pagina === totalPaginas" @click="pagina++">
        Siguiente
      </button>
    </nav>
  </main>
</template>

<style scoped>
.contenedor {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.encabezado {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.encabezado h1 {
  margin: 0;
  font-size: 1.8rem;
}

.contador {
  margin: 0;
  padding: 6px 14px;
  border-radius: 999px;
  background-color: #86efac;
  font-weight: 700;
}

.barra {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin: 20px 0;
}

.barra label {
  font-weight: 600;
}

.barra input {
  flex: 1;
  min-width: 0;
  max-width: 360px;
  padding: 10px 12px;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.barra input:focus {
  outline: 3px solid #86efac;
  border-color: #16a34a;
}

.grilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.mensaje {
  padding: 16px;
  text-align: center;
  font-size: 1.05rem;
}

.error {
  background-color: #fee2e2;
  color: #991b1b;
  border-radius: 8px;
}

.paginacion {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

.paginacion button {
  padding: 8px 16px;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
}

.paginacion button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.paginacion button:focus-visible {
  outline: 3px solid #86efac;
  outline-offset: 2px;
}
</style>
