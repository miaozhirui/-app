import { utils } from 'kld';
import XDialog from 'vux/x-dialog';
import storage from 'good-storage';
import other from './other/other';
// import geo from 'common/js/geo';

const page = {

    components: {
        XDialog
    },

    data() {

        return {

            idenVerify: false,
            operatorVerify: false,

            contactVerify: false,
            moreInfoVerify: false,
            sesameVerify: false,

            gpsMsg: null,
            showGpsBox: false,

            productId: 4
        }
    },

    created() {

        // if (!storage.get('gpsMsg') || !storage.get('gpsMsg').latitude) {

        //     this.showGpsBox = true
        // }

        // this.productId = utils.getParams('productId')
        this.productId = storage.get('productId');
        // this.idenVerify = utils.getParams('idenVerify') == 'true' ? true : '';
        console.log(storage.session.get('idenVerify'))
        this.idenVerify = !!storage.session.get('idenVerify') ? true: false;

        this.judgeIsOperatorVerify();

        let promise = utils.fetch({

            url: '/v2/cashloan/queryUserInfo',
            data: {

                cashId :   "null" ,
                merchantId :   "18fd13cc9aa611e6afb66c92bf314c17",
                 productType :  this.productId,
                 type :  0

            },
            api: true
        })

        promise.then(data => {

            if (data.statusCode == 8015) {

                var result = data.data;

                // this.idenVerify = result.identity
                // this.idenVerify = false;

                this.operatorVerify = result.mobile

                this.contactVerify = result.contact

                this.moreInfoVerify = result.more

                // this.sesameVerify = result.zhima // 暂时隐藏

                var idenVerifyBtn = document.getElementById('idenVerify')

                if (this.idenVerify) {

                    idenVerifyBtn.setAttribute("style", "color: #9A9A9A");

                    idenVerifyBtn.value = "已提交"

                } else {

                    idenVerifyBtn.setAttribute("style", "color: #57B3FF");

                    idenVerifyBtn.value = "去完善"

                }


                var operatorVerifyBtn = document.getElementById('operatorVerify')

                if (result.mobile) {

                    operatorVerifyBtn.setAttribute("style", "color: #9A9A9A");

                    operatorVerifyBtn.value = "已认证"

                } else {

                    operatorVerifyBtn.setAttribute("style", "color: #57B3FF");

                    operatorVerifyBtn.value = "去验证"

                }

                var contactVerifyBtn = document.getElementById('contactVerify')

                if (result.contact) {

                    contactVerifyBtn.setAttribute("style", "color: #9A9A9A");

                    contactVerifyBtn.value = "已提交"

                } else {

                    contactVerifyBtn.setAttribute("style", "color: #57B3FF");

                    contactVerifyBtn.value = "去完善"

                }

                var moreInfoVerifyBtn = document.getElementById('moreInfoVerify')

                if (result.more) {

                    moreInfoVerifyBtn.setAttribute("style", "color: #9A9A9A");

                    moreInfoVerifyBtn.value = "已提交"

                } else {

                    moreInfoVerifyBtn.setAttribute("style", "color: #57B3FF");

                    moreInfoVerifyBtn.value = "去完善"

                }

                // var sesameVerifyBtn = document.getElementById('sesameVerify')
                // if (result.zhima) {
                //     sesameVerifyBtn.setAttribute("style", "color: #9A9A9A");
                //     sesameVerifyBtn.value = "已认证"
                // } else {
                //     sesameVerifyBtn.setAttribute("style", "color: #57B3FF");
                //     sesameVerifyBtn.value = "去验证"
                // }

            }
        })



    },
    methods: {

        /*查询定位信息*/
        // getGPS() {

        //     this.showGpsBox = false
        //     utils.showLoading();

        //     geo.getUserPosition();

        // },

        btnIdentity() {

            utils.go('cash-identity-submit', {

                productId: this.productId,
                identity: this.idenVerify
            })

        },

        btnOperator() {
            
            if(!this.idenVerify){
                
                utils.tipInfo({

                    content: '请先进行身份验证'
                })

                return;
            }
         
            let promise = utils.fetch({

                method: 'get',
                url: '/v3/collection/mobile/url',
                data: {
                    name: '0',
                    idNum: '0'
                },
                api: true
            })

            promise.then(data => {

                if (data.indexOf('http') == -1) {

                    utils.tipInfo({

                        content: '服务器返回异常'
                    })

                    return;
                }

                //跳到rong360运营商验证，验证通过之后的回调地址(http://uctest.credan.com/v1.5.1/rong360back.html?userId=d9a6e129762142bcab29e4ec1aade185&outUniqueId=20171225145920644b6883e8f44eceb48500e88aebc987&state=login)
                location.href = data;
            })

        },

        btnContact() {

            utils.go('cash-contact-submit', {

                productId: this.productId,
                contactVerify: this.contactVerify

            })
        },

        btnMoreInfo() {

            utils.go('cash-moreinfo-submit', {

                productId: this.productId,
                moreInfoVerify: this.moreInfoVerify

            })
        },

        btnSesame() {

            let promise = utils.fetch({
                'url': '/v3/collect/zhima/authorize',
                'api': true
            });

            promise.then(data => {
                var target = '_blank';
                var options = "location=no";
                var ref = cordova.InAppBrowser.open(data, target, options);
                ref.addEventListener('loadstart', loadstartCallback);

                //芝麻分回调
                function loadstartCallback(event) {
                    // console.log('Loading started: ' + event.url);

                    var url = event.url;
                    //判断当前加载的是哪个域名网址，如果为uctest.credan.com或者app.credan.com就获取url处理。
                    var reg = /^https?\:\/\/(app|uctest)\.credan\.com/;
                    if (reg.test(url)) {
                        var x = url.indexOf("?params=");
                        var y = url.indexOf("&sign=");
                        var params = url.substring(x + 8, y);
                        var sign = url.substring(y + 6);
                        //请求服务器查看认证情况
                        let promise2 = utils.fetch({
                            'url': '/v3/collect/zhima/getOpenId',
                            'data': {
                                params: params,
                                sign: sign
                            },
                            'api': true
                        });
                        var _that = this;
                        promise2.then(req2 => {

                            if (req2.success) {
                                _that.sesameVerify = true;
                                var sesameVerifyBtn = document.getElementById('sesameVerify')
                                sesameVerifyBtn.setAttribute("style", "color: #9A9A9A");
                                sesameVerifyBtn.value = "已认证"
                            }
                            ref.close();
                        });
                    }
                }

            });

        },

        toApplyCash() {

            if (!this.idenVerify) {
                utils.tipInfo({
                    content: '请完善身份验证'
                })
                return
            }

            // if (!this.operatorVerify) {
            //     utils.tipInfo({
            //         content: '请前往运营商验证'
            //     })
            //     return
            // }

            if (!this.contactVerify) {
                utils.tipInfo({
                    content: '请完善联系人信息'
                })
                return
            }

            if (!this.moreInfoVerify) {
                utils.tipInfo({
                    content: '请完善更多信息'
                })
                return
            }

            // if(!this.sesameVerify) {
            //   utils.tipInfo({
            //     content: '请进行芝麻分验证'
            //   })
            //   return
            // }

            //获取身份图片信息
            let promise = utils.fetch({

                url: '/v2/cashloan/finalSubmit',
                data: {
                    "cashId": 'userCashId',
                    "merchantId": 'merchantid',
                    "gps": storage.get('gpsInfo'),
                    "productType": this.productId,
                    "sessionId": 'e53c2800-48d4-48d1-bcb8-8972ca5f293d'
                },
                api: true
            })

            promise.then(data => {

                if (data.statusCode == 200) {

                    //如果针对特定的productId做特殊的业务处理的话，处理完，直接返回
                    if (other.toDiffAction(this.productId)) return;
                    

                } else { //1060

                    utils.tipInfo({
                        content: data.message
                    })

                }
            })

        },

        //判断运营商验证是否通过
        judgeIsOperatorVerify() {

            let outUniqueId = utils.getParams('outUniqueId');

            if(!outUniqueId) return;

            let promise1 = utils.fetch({

                method: 'get',
                url: '/v3/collection/mobile/notify-status',
                data: {
                    outUniqueId
                },
                api: true
            })

            promise1.then(data => {

                if (data) { //说明运营商验证通过了，否则没有通过

                    this.operatorVerify = data;

                    var operatorVerifyBtn = document.getElementById('operatorVerify');

                    operatorVerifyBtn.setAttribute("style", "color: #9A9A9A");

                    operatorVerifyBtn.value = "认证中"

                }
            })
        }
    }
}