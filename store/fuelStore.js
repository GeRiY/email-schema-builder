export const state = () => ({
    fuels: [],
})

export const getters = {
    getUserCarsFuels(state) {
        return state.fuels;
    }
}

export const mutations = {
    setUserCarsFuels(state, value) {
        state.fuels = value;
    },
}

export const actions = {
    setUserCarsFuels({ commit, state }, value) {
        commit('setUserCarsFuels', value);
    }
}