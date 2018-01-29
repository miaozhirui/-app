import { utils, validate, saveGlobalParams } from 'kld';
import ValidateCode from 'components/validate-code/index.vue';
import agreeContent from './other/agree.html';
import storage from 'good-storage';
import querystring from 'querystring';

const page = {

    components: {

        ValidateCode
    },

    data() {

        return {

            phone: '', //手机号
            code: '', //验证码
            recommendedCode: '', //邀请码
            isAgree: false, //是否勾选
            isShowAgreeContent: false, //是否显示协议内容
            agreeContent: agreeContent, //协议内容
            registrationId: ''
        }
    },

    created() {

        if (utils.isDemo()) {

            this.phone = '13913169256';
            this.code = '1111';
            this.isAgree = true;
        }
    },

    methods: {

        toLogin() {

            if (!validate.isPhone(this.phone)) {

                utils.tipInfo({
                    content: '请输入正确的手机号'
                })
                return;
            }

            if (!validate.isNumber(this.code)) {

                utils.tipInfo({

                    content: '请输入正确的验证码'
                })

                return;
            }

            if (!this.isAgree) {

                utils.tipInfo({

                    content: '请勾选协议'
                })
                return;
            }

            let jpushId = storage.get('jpushId');
            let contactsInfo = storage.get('contactsInfo');

            let deviceType = typeof device !== 'undefined' ? device.platform : '';

            let redirectUrl = location.href.slice(location.href.indexOf('redirectUrl=') + 12);

            let params = querystring.parse(redirectUrl.slice(redirectUrl.indexOf('?') + 1));

            this.productId = params.productId;
            this.baseId = params.baseId;
            this.firmId = params.firmId;
            this.redirectUrl = redirectUrl;
            this.loanerSid = params.loanerSid;

            let data = {

                phone: this.phone,
                code: this.code,
                recommendedCode: this.recommendedCode,
                registrationId: jpushId,
                deviceType,
                firmId: this.firmId,
                contactsInfo
            }

            switch (+this.firmId) {

                case 6:

                    this.needWriteList(data); //如果firmId是6需要白名单验证

                    break;
                default:

                    this.notNeedWriteList(data); //如果firmId不是6白名单不需要验证
            }
            
            // this.notNeedWriteList(data);

        },

        needWriteList(data) {
    
            let promise = utils.fetchAll([
                    {
                        url: '/v16/app/login',
                        data,
                        isNeedIdentity: false
                    },
                    {
                        url: '/v16/firm/whiteList',
                        data,
                        isNeedIdentity: false
                    }
                ])

            promise.then(data => {
                
                if(!data[1]){//不在白名单里面
                    
                    utils.tipInfo({

                        content: "披星戴月开发中，尽情期待"
                    })
                    return;
                }

                this.identityInfo = data[0];
                this.loginSuccessHandle();
            })
        },

        notNeedWriteList(data) {

            let promise = utils.fetch({

                url: '/v16/app/login',
                data,
                isNeedIdentity: false
            })

            promise.then(data => {

                this.identityInfo = data;
                //登录成功之后的回调函数
                this.loginSuccessHandle();

            })
        },

        loginSuccessHandle() {

            let identityInfo = this.identityInfo,
                phone = this.phone,
                productId = this.productId,
                baseId = this.baseId,
                firmId = this.firmId,
                loanerSid = this.loanerSid,
                redirectUrl = this.redirectUrl;

            storage.set('identityInfo', identityInfo);
            storage.set('phone', phone);

            saveGlobalParams({ productId, baseId, firmId, loanerSid });

            window.location.href = redirectUrl;
        },

        toAgree() {

            this.isAgree = !this.isAgree;
        },

        closeAgreement() {

            this.isShowAgreeContent = false;
        },

        clickAgreeBtn() {

            this.isShowAgreeContent = true;
        }
    }
}