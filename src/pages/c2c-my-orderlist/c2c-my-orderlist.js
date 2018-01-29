import { utils } from 'kld';
import storage from 'good-storage';

const page = {

    data() {

        return {

            loanList: [],
            isShowTip: true
        }
    },

    created() {

        let promise = utils.fetch({

            url: '/v16/iou/getLoanAndRepaying'
        })

        promise.then(data => {

            this.loanList = data;
        })

    },

    methods: {
        
        clickGiveMoneyBtn(item) {

            let data = {

                aheadRepay: 0,
                planId: item.planId,
                fundRepayAccountId: item.fundRepayAccountId,
                redirectUrl: location.href
            }

            let promise = utils.fetch({

                url: '/wx/v16/LLPayInterface',
                data
            })

            promise.then(data => {

                if(data.statusCode == 5004) {

                    utils.tipInfo({

                        content: '前往支付页面',
                        
                    })
                    
                    storage.set('payInfo', JSON.stringify(data.data));
                    
                    utils.go("ll2pay-page");
                } else {

                    utils.tipInfo({

                        content: data.message
                    })
                }
            })
        },

        getLoanStatus(item) {

            if (item.overdueDays > 0) {

                if(item.repayStatus == 2){

                    return '逾期已还款';
                }

                return '已逾期';
            }
            if (item.status == 1) {//待跑风控状态

                return '待匹配'
            }  

            if (item.status == 2) {//刚跑完风控状态

                return '待审核'
            }

            if (item.status == 3) {//锁单

                return '待审核'
            }

            if (item.status == 4) {//等待签字

                return '待签字'
            }

            if (item.status == 5) {//签字完成

                return "等待审核签字"
            }

            if (item.status == 6) {//放款成功

                if (item.repayStatus == 1) {

                    return '借款成功';
                }

                if (item.repayStatus == 2) {

                    return '已还款'
                }
            }
            
            //签字按钮或者查看签字按钮不会显示
            if(item.status == 12 || item.status == 13 ){
                
                // status 12:风控直接拒绝, 13:人工审核失败
                return "审核失败";
            }

            if(item.status == 16){ //签字审核通过，待打款

                return "待打款"
            }

            if (item.status == 17) {//签字完成

                return "等待审核签字"
            }

        },
        getLendersName(item) {

            if (item.overdueDays > 0) {

                return item.name;
            }

            if (item.status == 1) {

                return '待确定'
            }

            if (item.status == 3) {

                return '待确定'
            }

            return item.name
        },
        toSignature(item) {

            if(item.status == 4) {//需要签字
                
                utils.go('c2c-user-iou-page', {

                    loanId: item.loanId
                }); 
                
            } else {
    
                utils.go('c2c-user-look-signature', {

                    signatureUrl: item.signatureUrl
                });   
            }
        },
        
        //是否显示签字或查看签字按钮
        isShowSigBtn(item) {
           
            return (item.status != 1) && (item.status != 2) && (item.status != 3) && (item.status != 12) && (item.status != 13);
        },

        isShowGiveMoneyBtn(item){

           
            if (item.status == 6) {//用户借款了，但是还没有还钱，显示还钱按钮

                if (item.repayStatus == 1) {

                    return true;
                }
               
            }
            
        },

        getSignatureText(item) {

            if(item.status == 4) {

                return '签字'
            }

            return '查看签名'
        },
        
        //关闭提示
        closeTip() {

            this.isShowTip = false;
        },
        
        //刷新页面
        refreshPage() {

            window.location.reload();
        }
    }
}





