import { utils } from 'kld';
import agreement from './agreement.js';

export default {
    
    props: ['isAgree'],
    data() {

        return {
            agreement,
            isShowAgreement: false
        }
    },

    methods: {

        agree() {

          this.$emit('watchIsAgree');
        },

        toWithholdingAgreement() {

            this.isShowAgreement = true;
        },

        cancelHandle() {

            this.isShowAgreement = false;
        }

    }
}