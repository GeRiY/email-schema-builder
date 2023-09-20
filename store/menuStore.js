export const state = () => ({
    show: false,
    mini: false,
    menuList: [
        {
            title: 'Áttekintés',
            icon: 'home',
            route: '/',
            access: ['USER']
        },
        {
            title: 'Új autó',
            icon: 'car-2-plus',
            route: '/new-car',
            access: ['ADMIN']
        },
        {
            title: 'Tankolás',
            icon: 'gas-station',
            route: '/new-fuel',
            access: ['ADMIN']
        },
        {
            title: 'Tankolásaim',
            icon: 'fuel',
            route: '/fuels',
            access: ['ADMIN']
        },
        {
            title: 'Autóim',
            icon: 'car-multiple',
            route: '/cars',
            access: ['ADMIN']
        },
        {
            title: 'Autó hozzáféések',
            icon: 'share-all',
            route: '/car-share',
            access: ['ADMIN']
        }
    ]
})

export const getters = {

}

export const mutations = {
    toggleMenu(state, credentials) {
        state.show = credentials;
    }
}

export const actions = {

}