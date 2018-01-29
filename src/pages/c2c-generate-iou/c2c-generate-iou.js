import { utils } from 'kld';
import other from './other/other';
// import html2canvas from 'html2canvas';

const page = {

    data() {

        return {

            isShowWriteName: false,
            isWriteName: false,
            isShowMergeImage: false,
            isShowIou: false, //是否显示欠条
            isShowSignatureBtn: false,
            isShowSubmitBtn: false,
            username: '', //用户姓名 xxxx
            userPhone: '', //用户手机号 13913169273
            userId: '', //用户身份证 320826199009133356
            userCard: '', //用户银行卡 6217000010065663489
            userCardName: '', //用户银行卡名称 招商银行
            startYear: '',
            startMonth: '',
            startDay: '',
            endYear: '',
            endMonth: '',
            endDay: '',
            cycle: ''//借款周期
        }
    },
    created() {
        
        this.cycle = utils.getParams('cycle') || '7';
      
    },
    methods: {

        clickToSignature() {

            this.isShowWriteName = true;
            this.isWriteName = false;

            this.$nextTick(() => {


                $(".signature").jSignature({

                    height: "6.5rem",
                    width: "10rem"
                });

                $('.signature').bind('change', (event) => {

                    this.isWriteName = true;
                })
            })
        },

        cancelSignature() {

            this.isShowWriteName = false;
            $('.signature').unbind('change');
            $('.signature canvas').remove();
        },
        confirmSignature() {

            if (!this.isWriteName) {

                utils.tipInfo({

                    content: '请签名'
                })
            }

            let data = $('.signature').jSignature('getData', 'image');

            $('#qianming').attr('src', `data:${data.join(',')}`);

            this.isShowWriteName = false;
            this.isShowSubmitBtn = true;
            $('.signature canvas').remove();
            $(document).scrollTop(100);
        },
        submit() {

            if (!other.validateInfo(this)) return;

            let canvas = document.createElement('canvas');
            let self = this;

            canvas.width = 500;
            canvas.height = 700;
            canvas.fillStyle = "#fff";
            canvas.getContext('2d').drawImage($('#qiantiao')[0], 0, 0);

            canvas.getContext('2d').drawImage($('#qianming')[0], 0, 300);

            let imageData = canvas.toDataURL('image/png');

            let promise = utils.fetch({

                url: '/v16/iou/signingMessage',
                data: {
                    base64Img: imageData,
                    cardNum: this.userCard,
                    idNum: this.userId,
                    phone: this.userPhone,
                    userName: this.username,
                    cardName: this.userCardName
                },
                isNeedIdentity: false
            })


            promise.then(data => {

                utils.tipInfo({

                    content: '签名生成成功,请联系出借人!',
                    callback() {

                        self.isShowMergeImage = true;

                        self.$nextTick(() => {

                            $('#merge').attr('src', imageData);
                        })
                    }
                })

            })
        },
        generateIou() {

            if (!other.validateInfo(this)) return;

            this.isShowIou = true;
            this.isShowSignatureBtn = true;

            let curDate = new Date();
            let cycle = +this.cycle;

            this.startYear = curDate.getFullYear();
            this.startMonth = curDate.getMonth() + 1;
            this.startDay = curDate.getDate();
            
            let aWeekLaterDate = new Date(curDate.getTime() + cycle * 24 * 60 * 60 * 1000);

            this.endYear = aWeekLaterDate.getFullYear();
            this.endMonth = aWeekLaterDate.getMonth() + 1;
            this.endDay = aWeekLaterDate.getDate();

            Vue.nextTick(() => {

                html2canvas(document.querySelector('.iou'),{
                    scale: 1,
                    scrollY:0
                })
                .then(canvas => {
                    
                    $('#qiantiao').attr('src', canvas.toDataURL('image/png'));
                })

            })
        },
        closeMergeImage() {

            this.isShowMergeImage = false;
        }
    }
}