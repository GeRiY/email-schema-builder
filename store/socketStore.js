export const state = () => ({
    socketEmits: [],
    socketEvents: [],
})

export const getters = {
    //
}

export const mutations = {
    addSocketEmit(state, emit) {
        state.socketEmits.push(emit);
    },
    addSocketEvent(state, event) {
        state.socketEvents.push(event);
    },
    resetSocketEmits(state) {
        state.socketEmits = [];
    },
    resetSocketEvents(state) {
        state.socketEvents = [];
    }
}

export const actions = {
    //
}