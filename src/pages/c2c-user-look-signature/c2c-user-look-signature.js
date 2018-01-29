import { utils } from 'kld';
import viewer from './other/viewer';

const page = {

    data() {

        return {
            
            sigImg: ''
        }
    },
    created() {
        
        let signatureUrl = utils.getParams('signatureUrl') || '';

        this.sigImg = signatureUrl;

        // this.$nextTick(() => {

        //     viewer({

        //         url: signatureUrl
        //     })
        // })
    },
    methods: {
        
        toBack() {

            utils.go('c2c-my-orderlist');
        }
    }
}