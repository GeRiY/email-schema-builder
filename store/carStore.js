export const state = () => ({
    cars: [],
    selectedCarId: null,
    selectedCar: null
})

export const getters = {
    getUserCars(state) {
        return state.cars;
    },
    getSelectedCarId(state) {
        return state.selectedCarId;
    },
    getSelectedCar(state) {
        return state.selectedCar;
    },
}

export const mutations = {
    setUserCars(state, value) {
        state.cars = value;
    },
    setSelectedCarId(state, value) {
        state.selectedCarId = value;
    },
    setSelectedCar(state, value) {
        state.selectedCar = value;
    },
}

export const actions = {
    setUserCars({ commit, state }, value) {
        commit('setUserCars', value);
    },
    setSelectedCar({ commit, state }, value) {
        commit('setSelectedCarId', value);
        const car = state.cars.find(car => car.id === value);
        commit('setSelectedCar', car);
    }
}