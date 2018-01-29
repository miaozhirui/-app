ps: 首先将当前工作目录切换到项目的根目录下面

. 安装项目所需要的模块
    npm install

. 安装node进程管理器
    npm install -g supervisor
    
. 创建一个开发页面
    npm run create 页面名称

. 在根目录下面新建env.js放入自己的配置文件(此文件是被忽略的)
    module.exports = {

        mockDomain() {

            let mockDomain;
            
            if (process.env.localIp) {

                mockDomain = `http://${process.env.localIp}:3000`;

            }else {//如果获取不到ip走下面，手动添加自己的ip

                mockDomain = "http://添加自己的ip:3000";
            }

            return mockDomain;
        }
    }

. 启动server
    npm run server

. 启动项目, 模拟本地数据
    npm run dev

. 本地开发，模拟测试环境数据
    npm run dev:mocktest

. 本地开发，模拟正式环境数据
    npm run dev:mockformal
    
. 打包项目到手机或者模拟器上运行
    npm run test:mock(用的数据是本地模拟的数据)

. 打包项目到手机或者模拟器上运行
    npm run test(用的数据是测试环境的数据)

. 打包项目到手机或者模拟器上运行
    npm run build(用的数据是正式环境的数据)


优化:
1. 为了解决1px的问题，需要在源码node_modules/px2rem/lib/px2rem.js里面添加一行代码，在170行添加if($1 == 1) return $1+'px';





