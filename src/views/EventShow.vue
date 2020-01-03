<template>
  <div>
        <div class="event-header">
          <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
          <h1 class="title">{{ event.title }}</h1>
          <h5>Organized by {{ event.organizer? event.organizer.name :'' }}</h5>
          <h5>Category: {{ event.category }}</h5>
        </div>
        <BaseIcon name="map"><h2>Location</h2></BaseIcon>
        <address>{{ event.location }}</address>
        <h2>Event details</h2>
        <p>{{ event.description }}</p>
        <h2>Attendees
          <span class="badge -fill-gradient">{{ event.attendees? event.attendees.length:0 }}</span>
        </h2>
        <ul class="list-group">
          <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
            <b>{{ attendee.name }}</b>
          </li>
        </ul>
      </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  props: ['id'],
  created() {
  
  // Ya que tenemos activado el Module Namespacing, en el dispatch podemos hacer esto: event/fetchEvent
  
  // this.$store.dispatch('event/fetchEvent',this.id) <== esto era antes de usar el Module Namespacing

  //Ahora que utilizamos el "mapActions" y queremos acceder al Action de Event
  this.fetchEvent(this.id)

  },
  computed:mapState({
    //Para no cambiar todos los valores "event" que esta en la seccion "template"
    //por "event.event". Mejor el mapState lo represetamos como un objeto y ya no
    //como un arreglo
    event:state => state.event.event
  }),
  methods: mapActions('event',['fetchEvent']) // es lo mismo a mapActions(['event/fetchEvent'])

}
</script>
   <style scoped>
    .location {
      margin-bottom: 0;
    }
    .location > .icon {
      margin-left: 10px;
    }
    .event-header > .title {
      margin: 0;
    }
    .list-group {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .list-group > .list-item {
      padding: 1em 0;
      border-bottom: solid 1px #e5e5e5;
    }
