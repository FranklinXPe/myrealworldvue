<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import datepicker from 'vuejs-datepicker'
export default {
  components: {
    datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    //Creamos el evento para realizar el dispatch
    createEvent() {
      this.$store
        // Ya que tenemos activado el Module Namespacing, en el dispatch podemos hacer esto: event/createEvent
        .dispatch('event/createEvent', this.event)
        .then(() => {
          //Una vez que el evento ha sido creado, debemos rutearlo
          //para mostrarlo en la página EventShow

          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })

          // Limpiamos el objeto event
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          // En este caso cuando ocurra un error en el envio el formulario, no haremos nada.
          //Sera el usuario el que intara reenviar el formulario
        })
    },
    createFreshEventObject() {
      // Obtiene el usuario del Store
      const user = this.$store.state.user.user
      // Crea aleatoreamente un Id para el EVENTO
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id, // asigna el Id creado aleatoreamente
        user: user, // asigna el valor del user que esta en el storage
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
