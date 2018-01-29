var path = require('path');
var fs = require('fs');
var generateTpl = require('./generateTpl');
var args = process.argv.slice(2);

const createPage = {

    init: function() {
        
        this.initParams();
        this.getAllPage();
        this.generatePage();
    },
    initParams: function() {
        
        this.pageName = args[0];

        this.pageDir = path.join(__dirname, '../../src/pages');

        this.allPages = ""

    },
    getAllPage: function() {

        this.allPages = fs.readdirSync(this.pageDir);

    },
    generatePage: function(){

        if(this.allPages.indexOf(this.pageName) == -1) {
            
            this.toGenerageDir();
        } else {

            console.error('当前页面已经存在了');
        }
    },
    toGenerageDir: function(){
        
        try{
            
            fs.mkdir(path.join(this.pageDir, this.pageName), function(err){

                if(err){

                    console.error(err);
                    return;
                }

                this.toGenerateFiles();

                console.log('页面创建完成');

            }.bind(this));
        }catch(e){

            console.error(e);
        }
    },
    toGenerateFiles: function(){
        
        //vue文件
        var vueFile = path.join(this.pageDir, this.pageName, `${this.pageName}.vue`);

        var jsFile = path.join(this.pageDir, this.pageName, `${this.pageName}.js`);

        var lessFile = path.join(this.pageDir, this.pageName, `${this.pageName}.less`);

        var readmeFile = path.join(this.pageDir, this.pageName, `readme.md`);

        var imageDir = path.join(this.pageDir, this.pageName, 'images')

        var mockDataDir = path.join(this.pageDir, this.pageName, 'mock');

        var mockDataFile = path.join(mockDataDir, 'index.js');

        fs.writeFileSync(vueFile, generateTpl.vue(this.pageName));
        fs.writeFileSync(jsFile, generateTpl.js);
        fs.writeFileSync(lessFile, generateTpl.less(this.pageName));
        fs.writeFileSync(readmeFile, '');
        fs.mkdirSync(imageDir)

        fs.mkdirSync(mockDataDir);
        fs.writeFileSync(mockDataFile, generateTpl.mockData);


    }
}

createPage.init();



