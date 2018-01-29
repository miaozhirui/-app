import { utils } from 'kld';
import storage from 'good-storage';

const page = {

    data() {

        return {

            phone: '',
        }
    },

    created() {

        this.phone = utils.getParams('phone');
        this.firmId = storage.get('firmId');

        let data = {

            phone: this.phone,
            firmId: this.firmId
        }
        
        let promise = utils.fetch({

            url: '/wx/smsCaptcha',
            isNeedIdentity: false,
            data
        })
      
        promise.then(data => {

            initGeetest({
                gt: data.gt,
                https: true,
                challenge: data.challenge,
                product: "popup",
                offline: !data.success,
            }, this.handlerPopup);
        })

    },

    methods: {

        handlerPopup(captchaObj) {

            let self = this;

            captchaObj.onSuccess(function() {

                var validate = captchaObj.getValidate();

                let data = {
                    phone: self.phone,
                    geetest_challenge: validate.geetest_challenge,
                    geetest_validate: validate.geetest_validate,
                    geetest_seccode: validate.geetest_seccode,
                    firmId: self.firmId
                }

                let promise = utils.fetch({

                    url: '/wx/enrollSendCode',
                    data: data,
                    isNeedIdentity: false
                })

                promise.then(data => {


                    utils.tipInfo({

                        content: data.message,
                        callback() {

                            window.parent.postMessage(JSON.stringify(data), '*');
                        }
                    })


                })
            });

            captchaObj.onReady(function() {
                captchaObj.show();
            });

            captchaObj.onError(function(data) {

                alert(JSON.stringify(data));
            })

            captchaObj.appendTo("body");
        }
    }
}
