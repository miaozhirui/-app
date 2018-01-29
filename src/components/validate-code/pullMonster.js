import { utils } from 'kld';



class PullMonster {


    pull(phone) {

        this.phone = phone;

        let params = {

            phone: phone
        }

        let iframe = document.createElement('iframe');

        let domain;

        if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'mocktest') {

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

        return;
    }

}



export default new PullMonster;