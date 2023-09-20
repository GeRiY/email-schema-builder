import colors from 'vuetify/es5/util/colors'
import dotenv from 'dotenv'
dotenv.config()

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s',
        title: 'Fuel App',
        htmlAttrs: {
            lang: 'hu'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'manifest', href: '/manifest.json'} // Add this line
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/chart.js',
        '~/mixins/AppMixin.js',
        '~/mixins/LoaderMixin.js',
        '~/mixins/MenuMixin.js',
        '~/mixins/SocketMixin.js',
        '~/mixins/RulesMixin.js',
        '~/mixins/CarsMixin.js',
        '~/mixins/FuelsMixin.js'
    ],

    loading: false,

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // ['@nuxtjs/pwa', {workbox: false}],
        '@nuxtjs/sentry'
    ],

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    /*pwa: {
        manifest: {
            name: 'Fuel App',
            short_name: 'FuelApp',
            lang: 'hu',
            display: 'standalone',
            start_url: '/',
            background_color: '#f8bbd0',
            theme_color: '#f8bbd0',
            description: 'Glucose Monitor',
            useWebmanifestExtension: true,
            icons: [
                {
                    src: "/icon/blood-glucose-logo.png",
                    sizes: "64x64",
                    type: "image/jpeg"
                }
            ]
        }
        /!*workbox: {
            runtimeCaching: [
                {
                    urlPattern: 'https://zmakra.com/blood_glucose_api/!*',
                    handler: 'networkFirst',
                    method: 'GET'
                }
            ]
        }*!/
    },*/

    env: {
        baseUrl: process.env.BASE_URL,
        storageUserSecret: process.env.STORAGE_USER_SECRET,
        socketUrl: process.env.SOCKET_URL
    },

    sentry: {
        dsn: process.env.SNETRY_DSN // Enter your project's DSN.
        // Additional module options go here.
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    server: {
        host: "0.0.0.0"
    }

    /*router: {
        base: '/blood_glucose/'
    }*/
}
