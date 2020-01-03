import Vue from 'vue'
import Vuex from 'vuex'

//Ya que estamos modularizando el Store, movemos la propiedad "user" del archivo "store.js"
// hacia "user.js", el cual contendra solo datos del usuario con el formato Vuex
import * as user from '@/store/modules/user.js'

import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // le digo a Vuex que tome en cuenta el modulo user
    user,
    event,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
