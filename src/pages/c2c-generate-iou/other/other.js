import { utils, validate } from 'kld';

export default {

    init() {
        console.log(22)

    },

    validateInfo(context) {

        // if (!validate.isEmpty(context.username)) {

        //     utils.tipInfo({

        //         content: '请填写用户名'
        //     })
        //     return;
        // }

        // if (!validate.isIdentityNum(context.userId)) {

        //     utils.tipInfo({

        //         content: '请填写正确的身份证号'
        //     })
        //     return;
        // }

        // if (!validate.isBankCard(context.userCard)) {

        //     utils.tipInfo({

        //         content: "请填写正确的银行卡号"
        //     })

        //     return;
        // }

        // if (!validate.isEmpty(context.userCardName)) {

        //     utils.tipInfo({

        //         content: '请填写正确的银行卡账户名称'
        //     })

        //     return;
        // }

        // if (!validate.isPhone(context.userPhone)) {

        //     utils.tipInfo({

        //         content: '请填写正确的手机号'
        //     })

        //     return;
        // }

        return true;
    }
}