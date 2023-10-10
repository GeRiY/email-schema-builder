import Vue from 'vue'
import {copy,cut} from 'clipboard'
Vue.mixin({
    methods: {
        async copyText(data) {
            return !!copy(data);

        },
        async cutText(data) {
            return !!cut(data);
        }
    }
})