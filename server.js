//导入express框架
var express = require('express');

//初始化express
var app = express();

//express服务器监听
app.listen(8000,'localhost',function(){

   console.log('express is listening');

});

//路由设置
app.get('/',function(req,res){

  res.send('<h1>hello express</h1>');

})