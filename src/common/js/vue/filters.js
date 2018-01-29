import moment from 'moment';

// vue的过滤器

export default {

    install(Vue) {

        //日期格式化
        Vue.filter('date', (value, formatString) => {

                formatString = formatString || "YYYY-MM-DD";

                return !!(+value) ? moment(+value).format(formatString) : value;
            }),

            //保留几位小数
            Vue.filter('decimal', (val, num) => {

                num = typeof num === 'undefined' ? 2 : num;
                val = typeof val === 'undefined' ? '' : val;

                return (+val).toFixed(num);
            })

        Vue.filter('number2chinese', (val) => {

            val = val + '';

            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(val))
                return "数据非法";
            let unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
                str = "";
            val += "00";
            let p = val.indexOf('.');
            if (p >= 0)
                val = val.substring(0, p) + val.substr(p + 1, 2);
            unit = unit.substr(unit.length - val.length);
            for (var i = 0; i < val.length; i++)
                str += '零壹贰叁肆伍陆柒捌玖'.charAt(val.charAt(i)) + unit.charAt(i);
            return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
        })
    }
}