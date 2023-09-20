import {setToken, setUsername} from "@/api/loginHelper";

export const state = () => ({
    isLoadingNow: false,
    username: '',
    firstName: '',
    lastName: '',
    default: {
        showMorningCount: 3,
        showDailyCount: 3,
        showNightCount: 3,
        showMeasuresCount: 3,
    },
    listViewSettings: {
        morning: true,
        daily: true,
        night: true,
        morningBarChart: true,
    }
})

export const getters = {
    getIsLoading(state) {
        return state.isLoading;
    }
}

/*
car-access/{carId} GET
- visszattér a kocsihoz tartozó car-acecess -ekkel

car-access/ POST
- carId int
- email string
- canManageFuels bool (not required)

cat-access/{carAccessId} PATCH
- carId int
- email string
- canManageFuels bool (not required)

cat-access/{carAccessId} DELETE

user/fuels GET (token és car-access alapján)
- visszatér a felhasználó kocsijának és a vele megosztott kocsiknak a tankolásaival

user/cars GET (token és car-access alapján)
- visszatér a felhasználó kocsijaival és a vele megosztott kocsikkal

* */

export const mutations = {
    changeIsLoading(state, value) {
        state.isLoadingNow = value;
    },
    setUserDetails(state, userDetails) {
        if (userDetails) {
            state.username = userDetails.username;
            state.firstName = userDetails.firstName;
            state.lastName = userDetails.lastName;
            setUsername(userDetails.username);
        }
    },
    changeListViewSettings(state, credentials) {
        state.listViewSettings[credentials.key] = credentials.value;
    }
}

export const actions = {
    logout({ commit }) {
        setToken(null);
        commit('setUsername', null);
    }
}