export const state = () => ({
    activeTab: 1,
    tabs: [
        {
            title: 'Profilom',
        },
        {
            title: 'Áttekintés',
        },
        {
            title: 'Felvitel',
        },
        {
            title: 'Teszt',
        }
    ]
})

export const getters = {
    getCounter(state) {
        return state.counter
    }
}

export const mutations = {
    changeActiveTab(state, newtTab) {
        state.activeTab = newtTab;
    }
}

export const actions = {
    async fetchCounter({ state }) {
        // make request
        const res = { data: 10 };
        state.counter = res.data;
        return res.data;
    }
}