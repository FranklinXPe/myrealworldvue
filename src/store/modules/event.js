//Necesitamos importar "EventService" para usarlo en el "Action"
import EventService from '@/services/EventService.js'
// Con esta sentencia activamos el ==> Vuex Module Namespacing
// Todas las mutaciones, actions y getters seran namespaced bajo "event"
export const namespaced = true

export const state = {
  categories: [
    'sustainability',
    'nature',
    'animal welfare',
    'housing',
    'education',
    'food',
    'community'
  ],
  events: [],
  //la libreria json-servern en los request GET devuelve
  // en los datos de la cabecer el nroTotalDeEventos que tiene la coleccion
  //que se puede obtener con el parametro response.headers['x-total-count']
  totalEvents: 0,
  event: {}
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENTS(state, totalEvents) {
    state.totalEvents = totalEvents
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  // Este metodo se ejecuta en el EventShow.vue
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        // Ejecutas el commit
        commit('ADD_EVENT', event)

        // Necesito desde el action de Event.js disparar un action de Notification.js
        const notification = {
          type: 'success',
          message: 'Your event has been created'
        }
        //El ultimo parametro {root:true} permite al dispatcher ir al "root state"
        //encontrar el modulo 'notification' y ejecutar el action 'add'
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a probem creting your event' + error.message
        }

        dispatch('notification/add', notification, { root: true })
        // Neceitamos lanzar el error para propagarse y pueda ser atrapado por otro componente
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        // Obtenemos el total de elementos de la coleccion para validar el limite superior que debe tener
        commit('SET_TOTAL_EVENTS', parseInt(response.headers['x-total-count']))
        // Almacena el trozo de datos que devuelve de la paginacion indicada
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        // Necesito desde el action de Event.js disparar un action de Notification.js
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events:' + error.message
        }
        //El ultimo parametro {root:true} permite al dispatcher ir al "root state"
        //encontrar el modulo 'notification' y ejecutar el action 'add'
        dispatch('notification/add', notification, { root: true })
      })
  },

  // Ya que fetchEvents y fetchEvent hacen llamadas al mismo API para que retornen los mismos datos
  // se podría realizar un mecanismo de CACHE para que PRIMERO busque la información en el arreglo
  // y si no lo encuentra recien realice una llamada al API (recuerda que la propiedad "events"
  // solo tiene un pedazo de toda la informacion disponible en la base de datos, debido a que ahora
  // se a implementado la paginacion)
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          // Necesito desde el action de Event.js disparar un action de Notification.js
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event:' + error.message
          }
          //El ultimo parametro {root:true} permite al dispatcher ir al "root state"
          //encontrar el modulo 'notification' y ejecutar el action 'add'
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  },
  catLength: state => {
    return state.categories.length
  }
}
