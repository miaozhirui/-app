var glob = require('glob');
var path = require('path')
var fs = require('fs');
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {

    var assetsSubDirectory;

    if (process.env.NODE_ENV === 'mock' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {

        assetsSubDirectory = config.build.assetsSubDirectory;
    } else {

        assetsSubDirectory = config.build.assetsSubDirectory;
    }
    return path.posix.join(assetsSubDirectory, _path)

}


exports.imageAssetsPath = function(_path) {

    var assetsSubDirectory;

    if (process.env.NODE_ENV === 'mock' || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {

        assetsSubDirectory = '../';
    } else {

        assetsSubDirectory = config.build.assetsSubDirectory;
    }
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}

    function generateLoaders(loaders) {
        var sourceLoader = loaders.map(function(loader) {
            var extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!')
        

        if (options.extract) {
           
            return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
            // return ExtractTextPlugin.extract(sourceLoader);
        } else {
            return ['vue-style-loader', sourceLoader].join('!')
        }
    }

    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders(['css']),
        less: generateLoaders(['css', 'autoprefixer','px2rem?remUnit=75&remPrecision=8', 'less']),
        sass: generateLoaders(['css', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    }
}

exports.styleLoaders = function(options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }

    return output
}

exports.getJsEntry = function(globPath) {
    var entries = {},
        basename, tmp, pathname;
    if (typeof globPath != "object") {
        //强制转成数组
        globPath = [globPath]
    }

    globPath.forEach((itemPath) => {

        glob.sync(itemPath, {

            ignore: ['./src/pages/*/mock/*.js', './src/pages/*/other/*.js']
        }).forEach(function(entry) {

            // console.log(entry);
            basename = path.basename(entry, path.extname(entry));
            // console.log(basename);
            // basename = entry.slice(12).slice(0,-3);
            if (entry.split('/').length > 4) {

                tmp = entry.split('/').splice(-3);
                pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
                entries[pathname] = entry;

            } else {
                entries[basename] = entry;
            }
        });
    });
  
    return entries;
}

exports.getHtmlEntry = function(globPath) {

    var entries = [],
        basename, tmp, pathname;
    if (typeof globPath != "object") {
        //强制转成数组
        globPath = [globPath]
    }

    globPath.forEach((itemPath) => {

        var files = fs.readdirSync(itemPath);
        
        files.forEach(function(item, index) {

            var filePath = path.join(itemPath, item);
            var stats = fs.statSync(filePath);

            if (stats.isDirectory()) {

                if (item === 'zcommon') return;

                entries.push(item);
            }
        })

    });

    return entries;
}

//获取所有页面列表
exports.generatePageList = function() {

    var sourcePath = path.join(__dirname, '../src/pages');

    var files = fs.readdirSync(sourcePath);
    var content = '';
    var imageContent = '';

    //得到src下面的目录
    files = files.filter(function(item) {

        var stats = fs.statSync(path.join(sourcePath, item));

        if (!stats.isDirectory() || item == 'zcommon') {

            return false;

        } else {

            return true;
        }
    })

    var totalPages = files.length;


    files.forEach(function(item) {

        var desc = fs.readFileSync(path.join(sourcePath, item, `readme.md`), 'utf-8');

        content += `<li>
            <a href="http://localhost:8080/pages/${item}.html" target="_blank">${item}-${desc}</a>
      </li>`

       // imageContent += `
       //      <li>
       //          <p>${desc}</p>
       //          <iframe src="http://localhost:8080/pages/${item}.html" width='320px;' height="568px;"></iframe>
       //      </li>
       // `
    })
    

    return `
        <li style="font-size:34px;">总共的页面: ${totalPages}</li>
        ${content}
        <div class="img-wrap">
            ${imageContent}
        </div>
        
        `;
}

//获取本地的ip
exports.getLocalIp = function() {

    var interfaces = require('os').networkInterfaces();
    var localIp;

    for (let item in interfaces) {

        if (item.indexOf('en') > -1) {

            interfaces[item].forEach(item => {

                if (item.netmask === '255.255.255.0') {

                    localIp = item.address;
                }
            })
        }

    }

    return localIp;
}


exports.getTpls = function() {

    // var tplCommonPath = path.join(__dirname, `../src/pages/${process.env.NODE_PRODUCT}/`);
    var tplCommonPath = path.join(__dirname, `../src/pages/`);

    var files = fs.readdirSync(tplCommonPath);

    var allTpls = {};

    files = files.filter(function(item) {

        var stats = fs.statSync(tplCommonPath + item);

        if (stats.isDirectory() && (item != 'zcommon')) {

            let tplPath = `${tplCommonPath}${item}/tpl/tpl.ejs`;

            if (fs.existsSync(tplPath)) {

                allTpls[item] = tplPath
            } else {

                allTpls[item] = `${tplCommonPath}zcommon/tpl.ejs`;
            }
        }

    })

    return allTpls;

}
