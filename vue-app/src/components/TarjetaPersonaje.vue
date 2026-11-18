<script setup>
import { computed } from 'vue'
const props = defineProps({
    personaje: { type: Object, required: true},
    esFavorito: { type: Boolean, defaaul: false},
})

const emit = defineEmits(['alternar-favorito'])

const URL_IMAGENES = 'https://cdn.thesimpsonsapi.com/200'
const ESTADOS = {
    Alive: 'Vivo',
    Deceased: 'Fallecido',
}

const edad = computed(() => props.personaje.age ?? 'Desconocida')
const estado = computed(() => ESTADOS[props.personaje.status] ?? props.personaje.status)
</script>

<template>
  <article class="tarjeta">
    <img
      class="tarjeta-foto"
      :src="`${URL_IMAGENES}${personaje.portrait_path}`"
      :alt="`Retrato de ${personaje.name}`"
      loading="lazy"
    />

    <div class="tarjeta-cuerpo">
      <h2 class="tarjeta-nombre">{{ personaje.name }}</h2>
      <p><strong>Ocupación:</strong> {{ personaje.occupation || 'Desconocida' }}</p>
      <p><strong>Edad:</strong> {{ edad }}</p>
      <p><strong>Estado:</strong> {{ estado }}</p>
    </div>

    <button
      type="button"
      class="boton-favorito"
      :aria-pressed="esFavorito"
      @click="emit('alternar-favorito', personaje.id)"
    >
      {{ esFavorito ? '* Favorito' : '° Favorito' }}
    </button>
  </article>
</template>

<style scoped></style>