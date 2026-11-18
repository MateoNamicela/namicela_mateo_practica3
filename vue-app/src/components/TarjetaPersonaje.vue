<script setup>
import { computed } from 'vue'

const props = defineProps({
  personaje: { type: Object, required: true },
  esFavorito: { type: Boolean, default: false },
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

<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.tarjeta-foto {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: #dcfce7;
}

.tarjeta-cuerpo {
  flex: 1;
  padding: 12px 16px;
}

.tarjeta-nombre {
  margin: 0 0 8px;
  font-size: 1.15rem;
}

.tarjeta-cuerpo p {
  margin: 4px 0;
  font-size: 0.95rem;
}

.boton-favorito {
  margin: 0 16px 16px;
  padding: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  border: 2px solid #16a34a;
  border-radius: 8px;
  background-color: #ffffff;
  color: #166534;
  cursor: pointer;
}

.boton-favorito:hover {
  background-color: #dcfce7;
}

.boton-favorito[aria-pressed='true'] {
  background-color: #22c55e;
  color: #052e16;
}

.boton-favorito:focus-visible {
  outline: 3px solid #86efac;
  outline-offset: 2px;
}
</style>
