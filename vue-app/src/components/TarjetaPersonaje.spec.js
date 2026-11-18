import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TarjetaPersonaje from './TarjetaPersonaje.vue'

describe('TarjetaPersonaje', () => {
  const personaje = {
    id: 1,
    name: 'Homer Simpson',
    occupation: 'Safety Inspector',
    age: 39,
    status: 'Alive',
    portrait_path: '/character/1.webp',
  }

  it('muestra los datos del personaje', () => {
    const wrapper = mount(TarjetaPersonaje, { props: { personaje } })

    expect(wrapper.text()).toContain('Homer Simpson')
    expect(wrapper.text()).toContain('Safety Inspector')
    expect(wrapper.text()).toContain('Vivo')
  })

  it('emite alternar-favorito con el id al pulsar el botón', async () => {
    const wrapper = mount(TarjetaPersonaje, { props: { personaje } })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('alternar-favorito')).toEqual([[1]])
  })
})
