export const state = () => ({
    messages: [],
    unWatchedMessages: [],
})

export const getters = {
    /*getCounter(state) {
        return state.counter
    }*/
}

export const mutations = {
    addUnWatchedMessage(state, message) {
        state.unWatchedMessages.push(message);
    },
    addMessage(state, message) {
        state.messages.push(message);
    },
    changeMessages(state, messages) {
        state.messages = messages;
    },
    changeUnWatchedMessages(state, messages) {
        state.unWatchedMessages = messages;
    }
}

export const actions = {

}