export const state = () => ({
    show: false,
    mini: false,
    menuList: [
        {
            title: 'Email sablon szerkesztő',
            icon: 'home',
            route: '/',
            access: ['USER']
        },
        {
            title: 'Draggable Test',
            icon: 'home',
            route: '/dragable-test',
            access: ['USER']
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