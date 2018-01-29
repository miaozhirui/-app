项目目录结构

db              数据库存储目录
models          数据库模型文件目录
node_modules    node第三方模块目录
public          公共文件目录(css, js, image...)
routes          路由文件目录
schemas         数据库结构文件(schema)目录
views           模板视图文件目录
app.js          应用(启动)入口文件
package.json



main 模块
    /       首页
    /view   内容页

api 模块
    /               首页
    /register       用户注册
    /login          用户登录
    /comment        评论获取
    /comment/post   评论提交

admin模块
    /               首页
    用户管理
        /user       用户列表
    分类管理
        /category           分类列表
        /category/add       分类添加
        /category/edit      分类修改
        /category/delete    分类删除
    文章内容管理
        /article            内容列表
        /article/add        内容添加
        /article/edit       内容修改
        /article/delete     内容删除
    评论内容管理
        /comment            评论列表
        /comment/delete     评论删除



功能开发顺序
    功能模块开发顺序
        用户
        栏目
        内容
        评论

    编码顺序
        通过schema定义设计数据存储结构
        功能逻辑
        页面展示




















