import { utils } from 'kld';
import storage from 'good-storage';
import { operatorAuth } from 'common/js/authOperator';

const page = {

    data() {

        return {
            phone: '',
            password: ''
        }
    },
    created() {
        //获取登录手机号
        this.phone = storage.get('phone')
    },
    methods: {
        formSubmit: function() {

            if (!utils.checkPhone(this.phone)) {
                utils.tipInfo({ content: "请输入正确的手机号码！" });
                return;
            }

            if (this.password.length < 4) {
                utils.tipInfo({ content: "请输入正确的服务密码！" });
                return;
            }

            let params = {
                "method": "",
                "param": { "password": this.password },
                // "productId": this.flashPro.productId
                // "cashId":1
            };

            // let productId = utils.getParams('productId') || '';
            let productId = storage.get('productId');

            operatorAuth(params, function(req) {

                utils.go("cash-submit", { productId });

            });


        }
    }
}