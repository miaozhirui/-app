import { utils } from 'kld';
import storage from 'good-storage';

export default {

    actions: {

        7: () => {

            let loanInfo = storage.get('loanInfo');

            let promise = utils.fetch({

                url: '/v16/iou/credatLoan',
                data: loanInfo,
                allResponse: true
            })

            promise.then((data) => {

                utils.tipInfo({

                    content: '提交成功',
                    callback() {

                        utils.go('c2c-my-orderlist');
                    }
                })

            }, (data) => {

                if (data.code == 1) {

                    utils.go('c2c-my-orderlist');
                }
            })

        }
    },

    toDiffAction(productId) {

        if (this.actions[productId]) {

            this.actions[productId]();

            return true;
        } else {

            this.actions["7"]();

            return true;
        }

    },


}






