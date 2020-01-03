<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <!-- llamamos a la propiedad events que es igual a la variable que esta almacenda en el store.js-->
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }"
        >Prev Page</router-link
      >
      <template> | </template>

      <router-link
        v-if="hasNextPage"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'event-card',
  components: { EventCard },

  created() {
    // Ya que tenemos activado el Module Namespacing, en el dispatch podemos hacer esto: event/fetchEvents
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page // este this.page  es una variable computada
    })
  },
  computed: {
    page() {
      //Asi se calcula el numero de pagina que debe mostrar
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.page * this.perPage * 3 < this.event.totalEvents
    },
    // se alteran los nombres de Computed debido a que estan ahora en un Modulo Vuex
    ...mapState(['event', 'user'])
  }
}
</script>
