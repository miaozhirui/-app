import { utils } from 'kld';
import SelectMoney from 'kld';
import storage from 'good-storage';
import Actionsheet from 'vux/actionsheet';

const page = {
    components: {

        Actionsheet
    },
    data() {
        return {
            amount: 0,
            cycleList: [7],
            curCycle: 0,
            termUnit: '天',
            productId: 1,
            moneyPurpose: '日常消费',

            show3: false,
            menus3: [{
                label: "<span style='color:#9a9a9a;font-size:0.3rem;'>请选择实际资金用途<br/>禁止用于购房、投资及各种非消费场景</span>",
                type: 'info'
            }, {
                label: '日常消费',
            }, {
                label: '旅游',
            }, {
                label: '教育',
            }, {
                label: '医疗'
            }],

            isShowStaticMoney: false, //是否显示静态的钱
            isShowStaticCycle: false, //是否显示静态的天数
            isShowDynamicMoney: false, //是否显示动态的钱
            isShowDynamicCycle: false, //是否显示动态的天数
            quotaMax: 0, //最大额度
            quotaMin: 0 //最小额度
        }
    },

    created() {

        // this.productId = utils.getParams('productId') || '';
        this.productId = storage.get('productId');
        

        if (!this.productId) {

            alert('请传入productId');

            return;
        }

        let promise = utils.fetch({

            url: '/v16/product/configs',
            data: [this.productId],
            isNeedIdentity: false
        })

        promise.then(data => {

            let productData = data[0];

            this.quotaMax = productData.quotaMax; //最大额度
            this.quotaMin = productData.quotaMin; //最小额度
            this.cycleList = productData.termNums.split(','); //周期

            if (this.quotaMax == this.quotaMin) {

                this.isShowStaticMoney = true;
                this.amount = this.quotaMin;
            }

            if (this.quotaMax != this.quotaMin) {

                this.isShowDynamicMoney = true;
                this.amount = this.quotaMin
            }

            if (this.cycleList.length == 1) {

                this.isShowStaticCycle = true;
                this.curCycle = this.cycleList[0];
            }

            if (this.cycleList.length != 1) {

                this.isShowDynamicCycle = true;
                this.curCycle = this.cycleList[0];
            }
        })
    },

    methods: {

        /**
         * [subt 减少额度]
         * @return {[type]} [description]
         */
        subt() {
            if (this.amount <= 1500) {
                utils.tipInfo({ content: '达到最小申请额度！' });
            } else {
                this.amount -= 500;
            }
        },

        /**
         * [add 增加额度]
         */
        add() {
            if (this.amount >= 2500) {
                utils.tipInfo({ content: '达到最大申请额度！' })
            } else {
                this.amount += 500;
            }
        },

        /**
         * [selectCycle 选择周期]
         * @return {[type]} [description]
         */
        selectCycle(age) {
            this.curCycle = age;
        },
        /**
         * [step 保存并下一步]
         * @return {[type]} [description]
         */
        step() {

            this.productId = utils.getParams('productId')

            //判断是否拦截下一步操作
            if (this.isIntercept()) return;


            var params = {
                "cashId": "null",
                "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                "productType": this.productId, //产品类型
                // "fee": 300, //手续费
                // "finalAmount": 700, //到帐金额
                "orderAmount": this.amount, //订单金额
                "term": this.curCycle, //期数
                "unit": "D", //单位
                "quota": 1,
                "transferUse": this.moneyPurpose//借款用途
            }

            let promise = utils.fetch({

                url: '/v2/cashloan/submitOrderInfo',
                data: params,
                api: true
            });

            promise.then(data => {

                if (data.statusCode == 200) {

                    this.saveLoanInfo();

                    utils.go('cash-submit', {
                        productId: this.productId,
                    })

                }

            });

        },

        isIntercept() {

            if (this.isShowDynamicMoney) {

                if (this.amount > this.quotaMax) {

                    utils.tipInfo({

                        content: `您最大申请额度为${this.quotaMax}`
                    })

                    return true;

                }

                if (this.amount < this.quotaMin) {

                    utils.tipInfo({

                        content: `您最小申请额度为${this.quotaMin}`
                    })
                    return true;

                }

            }

            if(this.moneyPurpose == '请选择') {

                utils.tipInfo({

                    content: '请选择借款用途'
                })

                return true;
            }

            return false;
        },

        saveLoanInfo() {

            let baseId = utils.getParams('baseId') || '', //放款方ID
                lendMoney = this.amount, //借款金额
                productId = this.productId, //产品id
                periodCount = 1, //分期还款分几期，如果不是分期还款，则为1,默认1
                termNum = this.curCycle, //借款天数
                termUnit = 1, //借款周期的计算单位，默认为1
                transferUse = this.moneyPurpose,//借款用途
                firmId = utils.getParams('firmId') || '',
                loanerSid = storage.get('loanerSid');


            let loanInfo = { baseId, lendMoney, productId, periodCount, termNum, termUnit, transferUse, firmId, loanerSid }

            storage.set('loanInfo', loanInfo);
        },

        click(value, text) {

            if (!text) return;


            this.moneyPurpose = text.label;
        },

        selectPurpose() {

            this.show3 = true;
        }
    }
}