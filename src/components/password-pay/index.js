import { utils, validate } from 'kld';
import Vue from 'vue';

export default {

    props: ['isShowPassword', "currentPager", "accountId", "lendMoney", "productId", "termNum"],

    data() {

        return {
            blackhot: [],
            blackhotLength: 6,
            password: ""
        }
    },

    methods: {

        forgetPassword() {

            let pathname = location.pathname.split('/');

            pathname.pop();

            let redirectUrl = `${location.origin}${pathname.join('/')}/${this.currentPager}`

            utils.go('user-reset-password', {

                'toResetPwd': 'false',
                'redirectUrl': redirectUrl,
                'accountId': this.accountId,
                'lendMoney': this.lendMoney,
                'productId': this.productId,
                'termNum': this.termNum
            })
        },

        cancel() {

            this.$emit('cancelPassword')

        },

        clickUl() {

            document.querySelector('.tem-password').focus();
        }
    },

    watch: {

        password: function(val, oldVal) {


            // if (!validate.isNumber(val)) {
            //
            //     this.password = val.replace(/(.)/g, function($1, $2) {
            //         if (/\d/.test($2)) { return $2 } else { return '' }
            //     })
            //
            //     return;
            //
            // }


            this.blackhot = val.split('');


            if (val.length === 6) {

                this.$emit('hasWritePassword', { password: this.password });

            }

        },

        isShowPassword(val, oldVal) {

            if(!val){

                this.password = '';
                this.blackhot = [];
            }
        }
    }

}
