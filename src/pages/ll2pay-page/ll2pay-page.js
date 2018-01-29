import { utils } from 'kld';
import storage from 'good-storage';

const page = {

    data() {

        return {

            payData: null
        }
    },

    created() {


    },

    methods: {

    },

    mounted() {

        this.payData = storage.get('payInfo');

        Vue.nextTick(() => {

            document.querySelector('#llpay').submit();
        })
    }
}