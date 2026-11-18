<script setup>
import { ref, onMounted } from 'vue'

const URL_API = 'https://thesimpsonsapi.com/api/characters'

const personajes = ref([])
const cargando = ref(true)
const error = ref(null)

onMounted(() => {
  fetch(URL_API)
    .then((respuesta) => {
      if(!respuesta.ok) {
        throw new Error(`Error ${respuesta.status} al consultar la API`)
      }
      return respuesta.json()
    })
    .then((datos) => {
      personajes.value = datos.results
    })
    .then((err) => {
      error.value = err.message
    })
    .finally(() => {
      cargando.value = false
    })
})
</script>

<template>
  <main class="contenedor">
    <h1>Personajes de los Simpsons</h1>

    <p v-if="cargando" class="mensaje">Cargando...</p>
    <p v-else-if="error" class="mensaje error" role="alert">No se pudeiron cargar los personajes. {{ error }}</p>

    <ul v-else>
      <li v-for="personaje in personajes" :key="personaje.id">{{ personaje.name }}</li>
    </ul>
  </main>
</template>

<style scoped></style>
