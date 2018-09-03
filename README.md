# 一.项目初始化
#### 1.项目配置
```
npm init 

npm install --save express

npm install --save body-parser 

npm install --save cookies

npm install --save swig

npm install --save mongoose 

npm install --save markdown 
```

#### 2.新建子目录和文件

新建子目录（db、models、public、routers、schemas、views）
新建文件（app.js）

<br/>第三方模块插件说明<br/>

| 第三方模块 | 说明               |
| ---------- | -------------------- |
| cookies    | 读/写cookie        |
| swig       | 模板解析引擎   |
| mongoose   | 操作mongodb数据  |
| markdown   | markdown语法解析模块 |

<br/>目录结构说明<br/>

|        | 文件名     | 说明                             |
| ------ | ------------- | ---------------------------------- |
| folder |  db           | 数据库存储目录              |
|        |  models       | 数据库模型文件目录        |
|        | node_modules  | node第三方模块目录          |
|        |  public       | 公共文件目录（js、css、images...） |
|        | routers       |  路由文件目录                |
|        | schemas       | 数据库结构文件（schema）目录  |
|        | views         | 模板视图文件目录           |
| file   | app.js        | 应用（启动）入口文件package.json |


# 二.应用创建
#### 1.创建应用，监听端口(编辑app.js)
```JavaScript
//1.1.1 加载express模块

var express = require("express");

//1.1.2 加载app应用，相当于http.createServer()

var app = express();

//1.1.3 监听http请求

app.listen(8081);

//这一行是自加的，命令行输出提示文字，测试程序是否成功运行

console.log("加载成功");
```

#### 2.绑定路由(编辑app.js)
```JavaScript
//路由绑定

app.get('/',function(req,res,next){

res.send('你好呀我是丫丫，其实这里也就是将来放html页面的地方')

})
```


<br/>说明：<br/>
>通过app.get()或app.post()等方法可以把一个url路径和一个或N个函数进行绑定
>
req：request对象，保存客户端请求相关的一些数据。=http.request
>
res：response对象,是服务端输出对象，提供了一些服务器端输出相关的一些方法。=http.response
>
next：方法，用于执行下一个和路径匹配的函数
>内容输出通过是res.send(string)发送内容至客户端

# 三.使用模板
#### 1.加载模板处理模块
模板作用：实现后端逻辑和页面表现分离，即前后端分离
```JavaScript
var swig = require('swig');
```

#### 2.定义当前应用所使用的模板引擎
```JavaScript
app.engine('html',swig.renderFile);
//第一个参数表示模板引擎名称，同时也是模板文件的后缀
//第二个参数表示用于解析处理模板内容的方法
```

#### 3.设置模板文件存放的目录
```JavaScript
app.set('views','./views');
//第一个参数不能变更必须是views
//第二个参数表示路径（目录），当前文件夹路径（同目录）下的子文件夹views
```

#### 4.注册所使用的模板引擎，即将刚才定义的模板引擎配置到app应用当中
```JavaScript
app.set('view engine','html');
//第一个参数不能变更必须为view engine
//第二个参数和app.engine方法中定义的模板引擎名称（第一个参数）一致
```

#### 5.读取views目录下的指定文件，解析并返回给客户端。
```JavaScript
res.render('index')
swig.setDefaults({cache:false});
//第一个参数表示模板的文件，相对于views目录，解析views/index.html
//第二个参数，传递给模板使用的数据
```


<br/>说明：<br/>
>var swig = require('swig'); //加载模板处理模块

>app.engine('html',swig.redenFile); //定义模板引擎，使用swig.renderFile方法解析后缀为html的文件

>app.set('views','./views'); //设置模板存放目录

>app.set('view engine','html'); //注册模板引擎

>swig.setDefaults({cache:false}); //开发过程中取消模板引擎缓存限制

>设置静态文件托管目录
>app.use('public',express.static(__dirname + '/public'));
>//在public目录下划分并存放好相关静态的资源文件


# 四.mongodb数据库连接
#### 1.连接准备
在mongodb安装目录的子目录bin（我是d:\mongodb\bin)下运行
```
mongod --dbpath=E:\WorkSpace_node.js\practice\nodeweb2\db --port=27019
```
若在命令行最后一行中出现waiting for connections on port 27019即说明运行成功。

#### 2.连接mondodb数据库
方法一：可以用d:\mongodb\bin目录下的mongo.exe进入命令行连接。
方法二：Robomango可视化。（现在robomango被收购后改名robo3T了）

（1）点击create并修改port地址，然后点击connect完成连接
中间出了点小插曲，连了十几次都显示network is unreachable。又重新开启了一下mongodb服务还是不行，最后发现是因为27018端口被占用了……所以我换了27019。

（2）开启服务
用管理员模式运行
```
cd d:\mongodb\bin
mongod --dbpath="d:\mongodb\data\db--logpath=d:\mongodb\data\log\mongodb.log--install --serviceName=mongodb
```
然后运行net start mongodb（开启服务）
```
net start mongodb
```
要退出的时候运行net stop mongodb （关闭服务）
```
net stop mongodb
```


（3）在应用启动入口app.js中添加代码段，通过mongoose.connect方法连接数据库

```JavaScript

mongoose.connect('mongodb://localhost:27019/nodeweb2',function(err) {

if (err) {

console.log('数据库连接失败');

    }

else {

console.log('数据库连接成功');

    app.listen(8081);

    }

});
```
运行完毕在命令行可以看到提示“数据库连接成功”

# 五.表结构schema定义，model创建
#### 1.表结构schema定义
在schema目录下的user.js文件中输入如下代码段
```JavaScript
//加载模块

var mongoose = require('mongoose');

//用户的表结构

module.exports =new mongoose.Schema({

//用户名

    username : String,

    //密码

    password : String

});
```

然后实际操作时不是直接操作表结构，而是操作模型model


#### 2.model创建
在models目录下新建User.js
```JavaScript
//加载模块

var mongoose = require('mongoose');

//加载schema文件

var usersSchema =require('../schemas/users');

//通过mongoose下的model方法创建模型，并暴露出去（导出）

module.exports =mongoose.model('User',userSchema);
```

<br/>说明：<br/>
>module.exports 初始值为一个空对象

>require返回的值是module.exports而不是exports

>exports是指向的module.exports的引用

>我们经常看到这样的写法：

>exports = module.exports = somethings

>上面的代码等价于:

>module.exports = somethings

>exports = module.exports

>原理很简单，即 module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可。
