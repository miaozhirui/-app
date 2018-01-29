import { utils } from 'kld';
import storage from 'good-storage';

export const toLLPay = (params) => {
    
    var browser = utils.openBrowser({

        url: `ll2pay-page.html`,
        start(event) {
            console.log(JSON.stringify(event))
            // {"type":"loadstart","url":"http://www.baidu.com/"}
            if (event.url.indexOf('user-account-homepage') > -1) {

                browser.close();

                utils.go('user-account-homepage');

            }
            
            if (event.url.indexOf('ll2pay-page' > -1)) {
               
                browser.executeScript({
                    code: `window.llpayData = ${params}`
                })
            }
        },
        exit(event) {

            // alert(11111)
            // utils.go('user-account-homepage');
            // window.location.reload();
        }
    })


}