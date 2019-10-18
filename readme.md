### 引入

```
const dCheck = require("./dcheck.js");

```

### 使用
```

        try{
            dCheck({
                string:123,//单个校验,结果：{ errmsg: '123--不是string类型' }
                // string:["张三",true,"李四"]//多个校验,结果： { errmsg: '张三,true,李四第2个--不是string类型' }
            })

        }catch(err){
            console.log(err)//类型出错的校验结果
        }
```

#### 一、起由：学习了一下服务端开发，学习的视频中提到的了参数校验这回事，但是我没找到他写的校验器，也就自己动手写了一个。可能还存在不足或者bug；



#### 二、设计：

+ 支持验证的js数据类型有:

1、string        (支持单个或者数组传入)

2、number     (支持单个或者数组传入)

3、boolean    (支持单个或者数组传入)

4、array         (只支持单个传入)

5、object        (支持单个或者数组传入)



+ 其他支持的类型：

1、length 字符

2、empty 非空

3、email   邮箱

4、phone 手机号（普通）

#### 属性介绍
```
string: "校验字符串类型 支持数组形式传入",


    number: "校验数字类型 支持数组形式传入",

    object: "校验对象类型 支持数组形式传入",

    boolean: "校验布尔类型 支持数组形式传入",

    array: "校验数组类型  只支持单个传入", //只支持单个校验

    empty:"非空字符串校验 支持数组形式传入",//非空验证

    length: {
        max: 10,//字符大小max 
        min: 5, //字符大小min
        value: "传入需要校验的字符串"
    },

    email: "普通邮箱格式校验",

    phone: "手机号11位校验"

```