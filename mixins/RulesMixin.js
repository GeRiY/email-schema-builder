import Vue from 'vue'
import {getToken} from "@/api/loginHelper";

Vue.mixin({
    methods: {
        required(val) {
            return !!val || 'Kötelező megadni.';
        }
    }
})