import { createStore } from 'vuex'

const store = createStore({
    state: () => ({
        count: 0
    }),
    mutations: {
        increment(state: any) {
            state.count++
        }
    }
})

export default store
