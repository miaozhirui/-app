import { utils } from 'kld';
import storage from 'good-storage';

export default class Device {

    init() {
        
        if(location.href.indexOf('ll2pay-page') > -1) return;
        
        try {

            let identityInfo = storage.get('identityInfo');
            let concatInfo = storage.get('contactsInfo');

            let device = !!device ? device: {};
            if(!identityInfo) return;

            let data = {

                concatInfo: JSON.parse(concatInfo),
                device
            }

            let promise = utils.fetch({
                url: '/v3/user/mobile/phone/contacts',
                data,
                loadingTip: false,
                api: true
            })

            promise.then(data => {


            })
        } catch (e) {

            console.log(e)
        }

    }
}