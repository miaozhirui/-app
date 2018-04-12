import { utils } from 'kld';

const page = {

    data() {

        return {
            
            isIphoneGuide: true
        }
    },

    created() {
        
        let isIphone = /iphone/ig.test(navigator.userAgent);

        if(!isIphone) {

            isIphoneGuide = false;
        }
    },

    methods: {
        
    }
}

