import { utils } from 'kld';
import storage from 'good-storage';

export default {

    getUserPosition() {

        this.getCurrentPosition()
            .then(pos => {

                storage.set('gpsMsg', pos);
                utils.hideLoading();
            })
            .catch(error => {

                storage.set('gpsMsg', {

                    latitude: "",
                    longitude: ""
                });

                utils.tipInfo({

                    content: '定位失败',
                    callback() {

                        utils.hideLoading();
                    }
                })
            })
    },

    getCurrentPosition(opts = {}) {

        let appKey = opts.appKey || "GKMBZ-NV3RS-F7ROD-62TZR-5KPR5-VDFJN";
        let appName = opts.appName || "kldqianduan";
        let posOptions = opts.posOptions || { timeout: 3000 ,failTipFlag: true};

        return new Promise((resolve, reject) => {

            //调用qq的定位功能
            this.getScript('http://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js')
                .then(() => {

                    let geolocation = new window.qq.maps.Geolocation(appKey, appName);
                    
                    geolocation.getLocation(this.successFn.bind(this, resolve), this.errorFn.bind(this, reject), posOptions);
                })
                .catch(error => {

                    throw Error(error);
                })
        })

    },

    successFn(resolve, pos) {

        pos.lat && (pos.latitude = pos.lat);
        pos.lng && (pos.longitude = pos.lng);

        resolve(pos);
    },

    errorFn(reject, error) {

        reject(error);

    },

    getScript(jsUrl) {

        return new Promise((resolve, reject) => {

            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = jsUrl;

            script.onload = script.onreadystatechange = function() {

                resolve();
                script.onload = script.onreadystatechange = null;
            }

            script.onerror = function(error) {

                reject(error);
                script.onerror = null;
            }

            document.body.appendChild(script);
        })
    }
}