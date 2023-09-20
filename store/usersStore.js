
export const state = () => ({
    users: [],
    socketUsers: [],
})

export const getters = {
    //
}

export const mutations = {
    setSocketUserList(state, userList) {
        state.socketUsers = userList;
    },
    setUserList(state, userList) {
        state.users = userList;
    },
}

export const actions = {
    //
}