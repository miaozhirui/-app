import { utils, validate, relationship } from 'kld';
import PopupPicker from 'vux/popup-picker';
import { message } from 'common/js/message';
import storage from 'good-storage';


// console.log(PopupPicker);

const page = {
    components: {
        PopupPicker
    },

    data() {
        return {
            relationList: [
                { 'value': '1', 'name': '配偶', 'parent': '0' },
                { 'value': '2', 'name': '父母', 'parent': '0' },
            ],
            relationName: '',
            relationTitle: [],
            relationList2: [
                { 'value': '1', 'name': '配偶', 'parent': '0' },
                { 'value': '2', 'name': '父母', 'parent': '0' },
                { 'value': '4', 'name': '兄弟姐妹', 'parent': '0' },
                { 'value': '6', 'name': '朋友', 'parent': '0' }
            ],
            relationName2: '',
            relationTitle2: [],
            relationList3: [
                { 'value': '4', 'name': '兄弟姐妹', 'parent': '0' },
                { 'value': '6', 'name': '朋友', 'parent': '0' },
                { 'value': '7', 'name': '同事', 'parent': '0' }
            ],
            relationName3: '',
            relationTitle3: [],

            relationType: 0,
            name: '',
            phoneNumber: '',

            relationType2: 0,
            name2: '',
            phoneNumber2: '',

            relationType3: 0,
            name3: '',
            phoneNumber3: '',
            productId: 4,

            contactVerify: false

        }
    },

    created() {

        // this.productId = utils.getParams('productId');
        this.productId = storage.get('productId');
        this.contactVerify = utils.getParams('contactVerify')

        if (this.contactVerify == 'true') {

            this.getInfomation();

        }

    },

    methods: {

        getInfomation() {

            let promise = utils.fetch({

                url: '/v2/cashloan/queryUserInfo',
                data: {
                    cashId :   "null" ,
                    merchantId :   "18fd13cc9aa611e6afb66c92bf314c17",
                     productType :  this.productId,
                     type :  3,
                     userId :   "46673d60a1f0417bb4085f6ea421ec48"
                },
                api: true
            })

            promise.then(data => {

                utils.hideLoading();

                if (data.statusCode == 8015) {

                    var result = data.data;

                    if (result.contact.length != 0) {

                        this.name = result.contact[0].name;

                        this.name2 = result.contact[1].name;

                        // this.name3 = result.contact[2].name;

                        this.phoneNumber = result.contact[0].phone;

                        this.phoneNumber2 = result.contact[1].phone;

                        // this.phoneNumber3 = result.contact[2].phone;

                        var type = result.contact[0].relationType;
                        this.relationType = type

                        var type2 = result.contact[1].relationType;
                        this.relationType2 = type2

                        // var type3 = result.contact[2].relationType;
                        // this.relationType3 = type3

                        this.relationName = relationship.getRelationType(type);

                        this.relationName2 = relationship.getRelationType(type2);

                        // this.relationName3 = relationship.getRelationType(type3);

                    }

                }

            })

        },

        checkValidate() {
            if (!validate.isEmpty(this.relationName)) {
                utils.tipInfo({
                    content: message.relation.error
                })
                return;
            }

            if (!validate.isEmpty(this.name)) {
                utils.tipInfo({
                    content: message.relationName.empty
                })
                return;
            }
            if (!validate.isEmpty(this.phoneNumber)) {
                utils.tipInfo({
                    content: message.relationPhone.empty
                })
                return;
            }
            if (!validate.isPhone(this.phoneNumber)) {
                utils.tipInfo({
                    content: message.relationPhone.error
                })
                return;
            }
            if (!validate.isEmpty(this.relationName2)) {
                utils.tipInfo({
                    content: message.relation2.error
                })
                return;
            }
            if (!validate.isEmpty(this.name2)) {
                utils.tipInfo({
                    content: message.relationName2.empty
                })
                return;
            }
            if (!validate.isEmpty(this.phoneNumber2)) {
                utils.tipInfo({
                    content: message.relationPhone2.empty
                })
                return;
            }
            if (!validate.isPhone(this.phoneNumber2)) {
                utils.tipInfo({
                    content: message.relationPhone2.error
                })
                return;
            }
            // if (!validate.isEmpty(this.relationName3)) {
            //     utils.tipInfo({
            //         content: message.relation3.error
            //     })
            //     return;
            // }
            // if (!validate.isEmpty(this.name3)) {
            //     utils.tipInfo({
            //         content: message.relationName3.empty
            //     })
            //     return;
            // }
            // if (!validate.isEmpty(this.phoneNumber3)) {
            //     utils.tipInfo({
            //         content: message.relationPhone3.empty
            //     })
            //     return;
            // }
            // if (!validate.isPhone(this.phoneNumber3)) {
            //     utils.tipInfo({
            //         content: message.relationPhone3.error
            //     })
            //     return;
            // }
            if (this.relationType == 1 && this.relationType2 == 1) {
                utils.tipInfo({
                    content: '请重新选择紧急联系人1或2的关系'
                })
                return;
            }
            // if (this.relationType == 2 && this.relationType2 == 2) {
            //     utils.tipInfo({
            //         content: '请重新选择紧急联系人1或2的关系'
            //     })
            //     return;
            // }

            return true;
        },

        btnSubmit() {

            if (this.checkValidate()) {
                let promise = utils.fetch({

                    url: '/v2/cashloan/submitContactInfo',
                    data: {
                        "applyId": '',
                        "cashId": '',
                        "userId": '',
                        "merchantId": '',
                        "contactInfo": [{
                            "rank": 1,
                            "relationType": this.relationType,
                            "name": this.name,
                            "phone": this.phoneNumber
                        }, {
                            "rank": 2,
                            "relationType": this.relationType2,
                            "name": this.name2,
                            "phone": this.phoneNumber2
                        }, {
                            "rank": 3,
                            "relationType": this.relationType3,
                            "name": this.name3,
                            "phone": this.phoneNumber3
                        }]
                    },
                    api: true

                })

                promise.then(data => {
                    if (data.statusCode == 200) {

                        utils.go('cash-submit', {
                            productId: this.productId
                        })
                    }
                })
            }
        }
    },

    watch: {
        relationTitle(val, oldVal) {
            let relationName = this.$refs.picker && this.$refs.picker.getNameValues();
            this.relationName = relationName;
            this.relationType = parseInt(val[0]);
        },

        relationTitle2(val, oldVal) {
            let relationName2 = this.$refs.picker2 && this.$refs.picker2.getNameValues();
            this.relationName2 = relationName2
            this.relationType2 = parseInt(val[0]);
        },

        relationTitle3(val, oldVal) {
            let relationName3 = this.$refs.picker3 && this.$refs.picker3.getNameValues();
            this.relationName3 = relationName3
            this.relationType3 = parseInt(val[0]);
        }

    }
}