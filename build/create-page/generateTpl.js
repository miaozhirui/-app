exports.vue = function(pageName) {

    var tpl = `<template>
    <div class="${pageName}" v-cloak>
        
    </div>
</template>
    `;

    return tpl;
}

exports.less = function(pageName) {

    var tpl = `.${pageName}{

    
}`;

    return tpl;
}


exports.js = `import { utils } from 'kld';

const page = {

    data() {

        return {

        }
    },

    methods: {
        
    }
}

`;

exports.mockData = `module.exports = {
    
    
}
`;

exports.pageNav = function(data) {

    var backIcon = typeof data.isHasBack === "undefined" ? '<span class="back-icon" id="back-icon"></span>' : '';
    // var bellIcon = typeof data.isHasBell === "undefined" ? '<span class="bell-icon"  id="bellIcon"><span class="red-hot" id="redHot"></span></span>' : '';
    var bellIcon = '';

    var tpl = `<!-- 导航 -->
    <div class="nav db">
        <div class="left bm">
            ${backIcon}
        </div>
        <div class="middle db1" id="nav-title">${data.title}</div>
        <div class="right bm br">
            ${bellIcon}
        </div>
    </div>`;

    return tpl;
}