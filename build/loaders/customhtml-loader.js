var path = require('path');

module.exports = function(source){
    
    if(this.request.indexOf('/other/') > -1) {
       
        return source;
    }

    if(this.request.indexOf('pages') > -1){

        let baseName = path.basename(this.request, '.js');

        let commonHeader = `
            import 'babel-polyfill';
            import Vue from 'vue';
            import App from './${baseName}.vue';
            import currentPage from 'common/js/currentPage.js';
            import FastClick from 'fastclick';
            import filters from 'common/js/vue/filters.js';
            import directives from 'common/js/vue/directives';
            import Confirm from 'components/popup/Confirm.vue';
            import Alert from 'components/popup/Alert.vue';
            
            FastClick.attach(document.body);

            Vue.use(filters);
            Vue.use(directives);
          
        `;

        let commonFooter = `
                import 'common/js/flexible.js';
                import 'common/css/public.less';
                import './${baseName}.less';

                utils.extend(App, page);
                new Vue({

                    el: '#app',
                    template: '<div id="root"><App/><Confirm ref="confirm"></Confirm><Alert ref="alert"></Alert></div>',
                    components: { App, Confirm, Alert},

                    mounted() {

                        window.$confirm = this.$refs.confirm;
                        window.$alert = this.$refs.alert;
                    }
                })
        `;

        source = commonHeader + source + commonFooter;
    }
    return source;
}
