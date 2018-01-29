import mockData from './mockData';

export default (opt) => {

    let url = opt.url;

    if(url.indexOf('queryUserInfo') > -1) {

        url = `${url}_${opt.data.type}`;
    }

    if(url.indexOf('configs') > -1) {

        url = `${url}_${opt.data[0]}`;
    }
    
    console.log(url);

    return new Promise((resolve, reject) => {

        let fn = mockData[url];

        if (fn) {
            
            let res = { 

                json(data){

                    this.data = data;
                }
            };

            fn(null, res);
            
            if(typeof res.data.code != 'undefined'){
                
                resolve(res.data.data);
            } else {
        
                resolve(res.data);
            }
            
        } else {

            alert(`此链接${url}没有设置原始数据`)
        }
    })
}