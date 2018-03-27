import { utils } from 'kld';



class PullMonster {


    pull(phone) {

        this.phone = phone;

        //拉起怪兽的验证码
        // this.monster(phone);
        
        // 默认的获取验证码
        this.getCode(phone);

    }

    getCode() {
        
        let phone = this.phone;
        let promise = utils.fetch({

            url: '/wx/sendVerificationCode',
            data: {
                phone,
                firmId: 6
            },
            isNeedIdentity: false
        })

    }

    monster(phone) {
        
        let iframe = document.createElement('iframe');

        let domain;

        if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'mocktest') {

            domain = "http://uctest.credan.com"
        } else {

            domain = "http://app.credan.com";
        }
        iframe.src = `${domain}/c2c/pages/monster-page.html?phone=${phone}`;
        // iframe.src = `${domain}/${process.env.NODE_PRODUCT}/pages/monster-page.html?phone=${phone}`;

        // iframe.src = `http://localhost:8080/pages/monster-page.html?phone=${phone}`;
        // iframe.src = `http://app.credan.com/chao-city/yanzheng.html?${phone}`;
        iframe.id = "aiframe2"
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "none";
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.zIndex = "99999";

        document.body.appendChild(iframe);

        window.addEventListener('message', e => {

            let obj = document.getElementById("aiframe2");

            if (obj) {
                obj.parentNode.removeChild(obj);
            }

        }, false)
    }
}



export default new PullMonster;