import { utils, MegaPixImage, validate } from 'kld';
import { message } from 'common/js/message';
import EXIF from 'common/js/exif';
import storage from 'good-storage';


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace("data:image/png;base64,", "");

}

const page = {

    data() {
        return {
            realName: '',
            identityNum: '',
            identityAddress: '',
            bankNumber: '',
            productId: 4,
            identity: 'false',
            cardName: '' //银行卡开户行

        }
    },

    created() {

        // this.productId = utils.getParams('productId')
        this.productId = storage.get('productId');

        this.identity = utils.getParams('identity')

        // if (this.identity == 'true') {

            this.getInfomation();
        // }

    },

    mounted() {

        var handinupload = document.querySelector("#handinupload");
        var frontupload = document.querySelector("#frontupload");
        var reverseupload = document.querySelector("#reverseupload");

        handinupload.onchange = function(e) {

            var file = this.files[0];

            if (!/image\/\w+/.test(file.type)) {

                alert("请确保文件为图像类型");

                return false;

            }

            var Orientation = 1;

            //获取照片方向角属性，用户旋转控制
            EXIF.getData(file, function() {

                Orientation = EXIF.getTag(this, 'Orientation');

            });

            var resCanvas = document.getElementById('myCanvas');

            var oReader = new FileReader();

            oReader.onload = function(e) {

                var mpImg = new MegaPixImage(file);

                var _max = 320;

                mpImg.render(resCanvas, {

                    maxHeight: _max,

                    orientation: Orientation

                })

            };

            oReader.readAsDataURL(file);

            resCanvas.onload = function() {

                resCanvas.setAttribute('tSrc', 'true')

            }

        };

        frontupload.onchange = function(e) {

            var file = this.files[0];

            if (!/image\/\w+/.test(file.type)) {

                alert("请确保文件为图像类型");

                return false;

            }

            var Orientation = 1;

            //获取照片方向角属性，用户旋转控制
            EXIF.getData(file, function() {

                Orientation = EXIF.getTag(this, 'Orientation');

            });

            var resCanvas = document.getElementById('frontBox');

            var oReader = new FileReader();

            oReader.onload = function(e) {

                var mpImg = new MegaPixImage(file);

                var _max = 320;

                mpImg.render(resCanvas, {

                    maxHeight: _max,

                    orientation: Orientation

                })

            };

            oReader.readAsDataURL(file);

            resCanvas.onload = function() {

                // console.log(resCanvas1.src,2)
                resCanvas.setAttribute('tSrc', 'true')

            }

        };

        reverseupload.onchange = function(e) {

            var file = this.files[0];

            if (!/image\/\w+/.test(file.type)) {

                alert("请确保文件为图像类型");

                return false;

            }

            var Orientation = 1;

            //获取照片方向角属性，用户旋转控制
            EXIF.getData(file, function() {

                Orientation = EXIF.getTag(this, 'Orientation');

            });

            var resCanvas = document.getElementById('reverseBox');

            var oReader = new FileReader();

            oReader.onload = function(e) {

                var mpImg = new MegaPixImage(file);

                var _max = 320;

                mpImg.render(resCanvas, {

                    maxHeight: _max,

                    orientation: Orientation

                })

            };

            oReader.readAsDataURL(file);

            resCanvas.onload = function() {

                // console.log(resCanvas1.src,3)
                resCanvas.setAttribute('tSrc', 'true')

            }

        };

    },

    methods: {

        getInfomation() {

            //获取身份信息
            let promise = utils.fetch({

                url: '/v2/cashloan/queryUserInfo',
                data: {
                    cashId :   "null" ,
                    merchantId :   "18fd13cc9aa611e6afb66c92bf314c17",
                     productType :  this.productId,
                     type :  1
                },
                api: true
            })

            promise.then(data => {

                if (data.statusCode == 8015) {

                    var result = data.data;

                    this.realName = result.name;
                    this.identityNum = result.idNum;
                    this.identityAddress = result.idAddress;
                    this.bankNumber = result.bankCard;
                    this.cardName = result.cardName || '';
                }

            })

            //获取身份图片信息
            let promiseImg = utils.fetch({

                url: '/v2/user/file/showImg',
                api: true
            })

            promiseImg.then(data => {

                if (data.statusCode == 200) {

                    var result = data.data;

                    if (result.filePath.HANDHELD_ID) {

                        var handinuploadImg = document.getElementById('myCanvas');
                        handinuploadImg.src = result.filePath.HANDHELD_ID;
                        handinuploadImg.setAttribute('tSrc', 'true')

                    }

                    if (result.filePath.IDCARD_FACADE) {

                        var frontloadImg = document.getElementById('frontBox');
                        frontloadImg.src = result.filePath.IDCARD_FACADE;
                        frontloadImg.setAttribute('tSrc', 'true')

                    }

                    if (result.filePath.IDACRD_REVERSE) {

                        var reverseloadImg = document.getElementById('reverseBox');
                        reverseloadImg.src = result.filePath.IDACRD_REVERSE;
                        reverseloadImg.setAttribute('tSrc', 'true')

                    }

                }

            })

        },

        checkValidate() {

            var resCanvas = document.getElementById('myCanvas');

            var tSrc = resCanvas.getAttribute('tSrc')

            if (tSrc == 'false') {

                utils.tipInfo({

                    content: '请上传手持身份证'
                })

                return;

            }


            var frontBox = document.getElementById('frontBox');

            var tSrcFront = frontBox.getAttribute('tSrc')

            if (tSrcFront == 'false') {

                utils.tipInfo({

                    content: '请上传身份证正面'
                })

                return;

            }

            var reverseBox = document.getElementById('reverseBox');

            var tSrcReverse = reverseBox.getAttribute('tSrc')

            if (tSrcReverse == 'false') {

                utils.tipInfo({

                    content: '请上传身份证反面'
                })

                return;

            }

            if (!validate.isEmpty(this.realName)) {
                utils.tipInfo({
                    content: message.userName.empty
                })
                return;
            }

            if (!utils.checkRealName(this.realName)) {
                utils.tipInfo({
                    content: message.userName.error
                })
                return;
            }

            if (!validate.isIdentityNum(this.identityNum)) {
                utils.tipInfo({
                    content: message.idNum.error
                })
                return;
            }

            if (!validate.isEmpty(this.identityAddress)) {
                utils.tipInfo({
                    content: message.idAddress.empty
                })
                return;
            }

            if (!validate.isNumber(this.bankNumber)) {
                utils.tipInfo({
                    content: message.cardNum.empty
                })
                return;
            }
            if (!validate.isBankCard(this.bankNumber)) {
                utils.tipInfo({
                    content: message.cardNum.error
                })
                return;
            }

            if (!validate.isEmpty(this.cardName)) {

                utils.tipInfo({

                    content: '请填写银行开户行'
                })
                return;
            }
            return true;
        },

        btnSubmit() {

            var resCanvas = document.getElementById('myCanvas');
            var imgHandIn = resCanvas.src.split(',')[1];

            var resCanvas2 = document.getElementById('frontBox');
            var imgHandIn2 = resCanvas2.src.split(',')[1];

            var resCanvas3 = document.getElementById('reverseBox');
            var imgHandIn3 = resCanvas3.src.split(',')[1];

            if (this.checkValidate()) {
                let promiseImg = utils.fetch({

                    url: '/v2/user/file/uploadByUserId',
                    data: {
                        "cashId": "null",
                        "HANDHELD_ID": {
                            facade: 8,
                            filename: '1.jpg',
                            file: imgHandIn
                        },
                        "IDCARD_FACADE": {
                            facade: 1,
                            filename: '2.jpg',
                            file: imgHandIn2
                        },
                        "IDACRD_REVERSE": {
                            facade: 2,
                            filename: '3.jpg',
                            file: imgHandIn3
                        }
                    },
                    api: true

                })

                promiseImg.then(data => {
                    if (data.statusCode == 7007) { //7008 提交失败  //4000 参数错误，注册请从第一步开始
                        this.submitUserInfo();
                    } else if (data.statusCode == 7008) {
                        utils.tipInfo({
                            content: '提交失败'
                        })
                    } else if (data.statusCode == 4000) {
                        utils.tipInfo({
                            content: '参数错误，注册请从第一步开始'
                        })
                    } else {
                        utils.tipInfo({
                            content: data.message
                        })
                    }
                })
            }
        },

        submitUserInfo() {
            let promise = utils.fetch({

                url: '/v2/cashloan/submitUserInfo',
                data: {
                    "cashId": "null",
                    "merchantId": "18fd13cc9aa611e6afb66c92bf314c17", //渠道ID
                    "cashApplyId": "null",
                    "name": this.realName, //姓名
                    "idNum": this.identityNum, //身份证号
                    "idAddress": this.identityAddress, //身份证地址
                    "cardNum": this.bankNumber, //银行卡号
                    "idNumValidDateEnd": "null",
                    "productType": this.productId, //产品类型：1：及时雨；2：闪电贷；3：提额；4：现金分期；
                    "cardName": this.cardName
                },
                api: true
            })

            promise.then(data => {

                if (data.statusCode == 200) { //3 关闭微信浏览器 //2 merchantid 商户判断 //已验证
                    
                    storage.session.set("idenVerify", true)
                    // if (data.data.isVerified) {
                    utils.go('cash-submit', {
                        productId: this.productId
                    })
                    // } else {
                    //     utils.tipInfo({
                    //         content: '身份校验失败,请核实填入的信息'
                    //     })
                    // }

                } else {
                    utils.tipInfo({
                        content: data.message
                    })
                }

            })
        }

    }
}