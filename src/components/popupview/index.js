
export default {

    props: {

        value: Boolean
    },

    data() {

        return {

            show: false
        }
    },

    watch:{

        value: {

            handler(val, oldVal){

                this.show = val;
            },
            immediate: true
        }
    }
}