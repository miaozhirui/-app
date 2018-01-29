import { utils } from 'kld';

const page = {

    data() {

        return {

        }
    },

    methods: {
        
        clickCancel() {

            utils.go('c2c-my-orderlist');
        },
        clickConfirm() {
            
            utils.tipInfo({

                content: '签字成功！系统已通知出借人，请与出借人保持联络！',
                callback() {

                    utils.go('c2c-my-orderlist');
                }
            })
            
        }
    }
}

