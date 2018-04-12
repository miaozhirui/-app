import path from 'path';
import EventEmitter from './events';

import axios from 'axios';
import storage from 'good-storage';

import env from '../../../env.js';

import generateStaticHtml from './generateStaticHtml/index';


export default {

    //扩展属性
    extend(arg1, arg2) {

        for (let item in arg2) {

            arg1[item] = arg2[item];
        }

        return arg1;
    },

    //提示信息
    tipInfo: function(opt) {

        let hasTipInfo = document.querySelector('.tip-info-wrapper');
        hasTipInfo || createTipInfo();

        function createTipInfo() {
            let content = opt.content || '',
                data = opt.data || null,
                time = opt.time || 2,
                callback = opt.callback || function() {},
                div = document.createElement('div');

            div.classList.add('tip-info-wrapper');
            div.innerHTML = content;
            document.body.appendChild(div);
            setTimeout(function() {
                div.parentNode.removeChild(div);
                callback(data);
            }, time * 1000);
        }
    },

    //添加事件
    addEvent: function() {

        let arrs = Array.prototype.slice.call(arguments);
        let timer = null;
        let merchantId = this.getParams('merchantId');
        if (merchantId && merchantId !== '18fd13cc9aa611e6afb66c92bf314c17') {

            arrs[0] = merchantId + '-' + arrs[0]
        }

        arrs[0] = arrs[0].replace(/(undefined)/, function($1, $2) {

            if ($2 == 'undefined') {

                return '闪电贷';
            }
        })

        if (window.TDAPP) {

            TDAPP.onEvent.apply(TDAPP, arrs);
            return;
        }

        timer = setInterval(function() {
            try {

                TDAPP && clearInterval(timer);

                TDAPP.onEvent.apply(TDAPP, arrs);

            } catch (e) {

                console.log(e);
            }
        }, 1000);
    },

    //获取参数
    getParams: function(key, url) {

        let queryString = location.search.slice(1);
        let params = {};

        let temParams = queryString.split('&');

        for (let i = 0; i < temParams.length; i++) {

            let temData = temParams[i].split('=');

            params[temData[0]] = temData[1] || '';
        }

        return !!key ? params[key] : params;
    },

    //显示loading
    showLoading: function() {
        let div = document.createElement('div');
        div.id = 'loading';
        document.body.appendChild(div);
    },

    //隐藏loading
    hideLoading: function() {
        let ele = document.getElementById('loading');

        ele && document.body.removeChild(ele);
    },

    //网络请求, 获取数据
    fetch(opt, ip) {

        if (process.env.NODE_ENV == 'static' || process.env.NODE_ENV == 'staticbuild') {


            return generateStaticHtml(opt);
        }

        return new Promise((resolve, reject) => {
            
            if(!this.judgeIsAgreeContact()) return ;//如果没有同意的话，返回false,不允许继续往下面操作

            let e = new EventEmitter()
            e.on('overtime', () => {

                this.tipInfo({ content: '您的网络有点儿慢...' });
            })

            let timer = setInterval(() => {

                e.emit('overtime');

                clearInterval(timer);

            }, 10000);

            //当状态码不是0的时候，是否提示错误信息
            let errorTip = typeof opt.errorTip === 'undefined' ? true : false;

            //是否有加载提示
            let loadingTip = typeof opt.loadingTip === "undefined" ? true : false;
          
            loadingTip && this.showLoading();

            let defaultParams = {

                method: 'POST',
                headers: {

                    "Content-Type": "application/json;charset=UTF-8"
                }
            }

            let options = this.extend(defaultParams, opt);

            let self = this;
             
            this.generateSubmitData(options);

            this.reWriteUrl(options);
        
            axios(options)

                .then(response => {

                    clearInterval(timer);

                    loadingTip && self.hideLoading();

                    let data = response.data;

                    if (typeof data.code != 'undefined') {
                   
                        if (data.code != 0) { //有code的情况,一种数据格式

                            //登录验证失败的情况
                            if ((data.code == 403) && (data.message == '登陆验证失败')) {

                                self.tipInfo({

                                    content: '登录验证失败，请重新登录',
                                    callback() {

                                        self.go('user-login', {

                                            redirectUrl: location.href
                                        })
                                    }
                                })
                                return;
                            }


                            self.tipInfo({

                                content: data.message || `服务器繁忙-(${data.code})`,
                                callback(){

                                   reject(data) 
                                }
                            })

                            self.saveErrorLog(data);
                        } else {
                            

                           resolve(data.data);
                        }
                    } else { //没有code的情况，另一种数据格式(后台历史遗留问题)

                        resolve(data);
                    }

                })

                .catch(error => {

                    clearInterval(timer);

                    loadingTip && self.hideLoading();

                    self.tipInfo({

                        content: '服务器繁忙'
                    })

                    reject(error);
                    self.saveErrorLog(JSON.stringify(error));
                })
        })
    },

    judgeIsAgreeContact() {
            
        let isAgreeContact = storage.get('isAgreeContact');

        if(!isAgreeContact) {

            this.tipInfo({
                content: "无法操作，请先去'设置'里授权访问通讯录后再操作",
                time:5
            })


            return false;
        }

        return true;
    },

    //生成提交到后台的数据
    generateSubmitData(options) {

        let temData;

        if (Object.prototype.toString.call(options.data) === '[object Array]') {

            temData = options.data;
        } else {
            
            let identityInfo = this.judgeIsLogin(options);

            temData = {};
            this.extend(temData, options.data);

            if (!!identityInfo) {

                this.extend(temData, identityInfo);
            }
        }


        if (options.method == 'POST') {

            options.data = temData;
        } else {

            options.params = temData;
        }
    },
    //保存错误日志
    saveErrorLog(data) {

        axios({

            url: 'http://log.miaozhirui.com/log',
            // url: 'http://localhost:3001',
            method: 'POST',
            headers: {

                "Content-Type": "application/json;charset=UTF-8"
            },
            data: {
                data,
                userAgent: navigator.userAgent,
                phone: storage.get('phone')
            }
        })
    },

    //并行发起多个请求
    fetchAll(opt) {

        let queue = [];

        opt.forEach(item => {

            queue.push(this.fetch(item))
        })

        return Promise.all(queue)
    },
    reWriteUrl(options) {
        
        if(options.url.indexOf('http') > -1) return;
        
        if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'mock') { //用本地的模拟数据

            options.url = `${env.mockDomain()}${options.url}`;
            
            return;
        }

        if(options.log){//提交到前端的数据库

            options.url = `http://log.miaozhirui.com${options.url}`;
            return;
        } 

        if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'mocktest') { //用的是测试环境的数据

            if (options.dev) {
                return
            }

            if (options.api) {

                options.url = `http://118.190.60.163:8070${options.url}`;

            } else if (options.cdn) {

                options.url = `http://118.190.60.163:8070/v3/getRecommendation`;
                options.method = 'POST';
            } else {

                options.url = `http://118.190.60.163:8030${options.url}`;
            }
        }

        if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'mockformal') { //用的是正式环境的数据
            

            if (options.api) {

                options.url = `https://api.credan.com${options.url}`;
                // alert(`https://api.credan.com${options.url}`);
            } else if (options.cdn) {

                options.url = `http://staticjson.oss-cn-hangzhou.aliyuncs.com${options.url}`;

                delete options.data;
            } else {

                options.url = `https://consumer.credan.com${options.url}`;
            }
        }
    },
    //判断用户是否登录了
    judgeIsLogin(opt) {

        let isNeedIdentity = typeof opt.isNeedIdentity === 'undefined' ? true : false;

        if (!isNeedIdentity) return false; //如果不需要身份校验，返回

        let identityInfo = storage.get('identityInfo');

        if (identityInfo) {

            return identityInfo;
        } else {

            this.go('user-login', {

                redirectUrl: location.href
            })
        }
    },
    //路由的前往函数
    go(url, params = {}) {

        let queryString = '';

        url = url.indexOf('.html') > -1 ? url : `${url}.html`;

        for (let i in params) {

            queryString += `${i}=${params[i]}&`;
        }

        queryString = queryString.slice(0, -1);

        let wholeUrl = !!queryString ? `${url}?${queryString}` : url;

        //存储路由栈
        this.storageUrlStack(location.href);


        window.location.href = wholeUrl;
    },

    storageUrlStack(url) {

        let urlStacks = storage.get('urlStacks');

        //如果不存在url栈
        if (!urlStacks) {

            storage.set('urlStacks', [url]);

            return;
        }

        //如果存在url栈
        if (urlStacks) {

            urlStacks.push(url);
            storage.set('urlStacks', urlStacks);
            return;
        }
    },

    openBrowser(opts) {

        if (typeof window.cordova === 'undefined') {

            location.href = opts.url;
            return;
        }


        let url = opts.url,
            target = "_blank",
            options = "location=yes",
            ref = cordova.InAppBrowser.open(url, target, options);

        opts.start && ref.addEventListener('loadstart', opts.start); //开始加载(点击webview里面的其他链接，也会触发这个方法; opts.start(event)里面会包含一个事件信息，如url)
        opts.stop && ref.addEventListener('loadstop', opts.stop); //加载完成了
        opts.error && ref.addEventListener('loaderror', opts.error); //加载错误
        opts.exit && ref.addEventListener('exit', opts.exit); //关闭webview

        return ref;
    },

    recordErrorLog(data) {

        let promise = this.fetch({

            url: 'http://169.254.247.181:8000/error',
            data,
            isNeedIdentity: false,
            loadingTip: false
        })

        promise.then(data => {

            console.log(data);
        })
    },
    /**
     * [checkRealName 判断真实姓名格式]
     * @param  {[string]} name [姓名]
     * @return {[boolean]}      [格式正确返回true,否则返回false]
     */
    checkRealName(name) {
        var reg = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,}(?:\·[\u4E00-\u9FA5\uF900-\uFA2D]{2,})*$/;
        return reg.test(name);
    },
    /**
     * [checkPhone 检查手机号码]
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    checkPhone(str) {
        return /^1[3,4,5,7,8]\d{9}$/.test(str);
    },
    /**
     * [checkCardId 身份证号码验证]
     * @param  {[string]} humanId [身份证号]
     * @return {[boolean]}         [格式正确返回true,否则返回false]
     */
    checkCardId(humanId) {
        humanId = humanId.replace('x', 'X');
        var vcity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        var regId = /(^\d{17}(\d|X)$)/;
        var province = humanId.substr(0, 2);
        var len = humanId.length;
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        var arr_data = humanId.match(re_eighteen);
        if (regId.test(humanId) == false) {
            return false; //校验位数；
        } else if (vcity[province] == undefined) {
            return false; //校验城市
        } else if (regId.test(humanId) !== false) {
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date(year + '/' + month + '/' + day);
            var now = new Date();
            var now_year = now.getFullYear();
            var time = now_year - year;
            if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
                if (time >= 3 && time <= 100) {
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var cardTemp = 0,
                        i, valnum;
                    for (i = 0; i < 17; i++) {
                        cardTemp += humanId.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[cardTemp % 11];
                    if (valnum == humanId.substr(17, 1)) {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        }
    },

    //计算添加几天之后的日期
    addDays(date, days) {

        let arr;

        if (typeof(date) == "string") {
            arr = date.split("-");
            if (parseInt(arr[1]) < 10) {
                arr[1] = "0" + parseInt(arr[1]);
            }
            if (parseInt(arr[2]) < 10) {
                arr[2] = "0" + parseInt(arr[2]);
            }
            date = arr.join("-");
        }


        const d = new Date(date);
        d.setDate(d.getDate() + parseInt(days));
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    },

    //运行的项目是否是demo版
    isDemo() {

        return process.env.NODE_ENV === 'static' || process.env.NODE_ENV === 'staticbuild';
    }

}