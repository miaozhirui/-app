import { utils } from 'kld';

const page = {

    data() {

        return {
            
            popupView: false,
            hasSignature: false,
            iouInfo: {}//借条信息
        }
    },

    created() {

        let loanId = utils.getParams('loanId') || '';

        let promise = utils.fetch({

            url: '/v16/iou/userGetSigningMessage',
            data: { loanId }
        })

        promise.then(data => {
            
            this.iouInfo = data;
        })
    },

    methods: {
        clickCancel() {

            utils.go('c2c-my-orderlist');
        },
        clickConfirm() {

            this.popupView = true;
            this.hasSignature = false;

            this.$nextTick(() => {

                $(".write-name").jSignature({

                    height: "6.5rem",
                    width: "10rem",
                    lineWidth: 5
                });

                $(".write-name").bind('change', () => {
                  
                    this.hasSignature = true;
                })
            })
        },
        //取消签名
        cancelSig(){
            
            this.popupView = false;
        },
        //确认签名
        confirmSig() {
            
            if(!this.hasSignature) {

                utils.tipInfo({

                    content: '请签字',
                })

                return;
            }

            let base64Img = $('.write-name').jSignature('getData', 'image');
            let loanId = utils.getParams('loanId') || '';
            
            base64Img = `data:${base64Img.join(',')}`;
            
            let promise = utils.fetch({

                url: '/v16/iou/userSigningMessage',
                data: { base64Img, loanId }
            })

            promise.then(data => {
                
                utils.tipInfo({

                    content: '签字成功！系统已通知出借人，请与出借人保持联络！',
                    callback(){

                        utils.go('c2c-my-orderlist');
                    }
                })
            })
            
        },
        
        //清楚签名
        clearSig(){
            
            $(".write-name").jSignature("clear");
            this.hasSignature = false;
        }
    }
}