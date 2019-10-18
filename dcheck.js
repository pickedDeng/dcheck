
// 2种模式 

// 1：简单模式  dCheck({string:str})  
//2:多参数校验  dCheck({string:[str1,str2]})


function dCheck(obj) {
    // 校验对象参数
    if (typeof obj !== "object" || obj == null) {
        throw err("校验器参数要求是对象");
    }
    // obj js类型支持string number object array boolean

    for (var k in obj) {
        switch (k) {
            case "string": // string类型
                isRight("string", obj);
                break;
            case "number": // number类型
                isRight("number", obj);
                break;
            case "boolean": // bolean类型
                isRight("boolean", obj);
                break;
            case "object": // object类型
                isRight("object", obj)
                break;
            case "array":
                if (!obj.array instanceof Array) {
                    throw err("array");
                }
                break;
            case "length": //长度校验
                if (obj.length.hasOwnProperty("max") && !obj.length.hasOwnProperty("min") && obj.length.hasOwnProperty("value")) {
                    //最大长度
                    let maxNum = null;

                    if (typeof (parseInt(obj.length.max)) === "number") {
                        maxNum = parseInt(obj.length.max)
                    } else {
                        throw err("err")
                    }
                    const strlength = obj.length.value.toString().length
                    console.log(strlength, maxNum)
                    if (strlength > maxNum) {
                        throw err("maxLength")
                    }

                } else if (!obj.length.hasOwnProperty("max") && obj.length.hasOwnProperty("min") && obj.length.hasOwnProperty("value")) {
                    //最小值
                    let minNum = null;
                    if (typeof (parseInt(obj.length.min)) === "number") {
                        minNum = parseInt(obj.length.min)
                    } else {
                        throw err("err")
                    }
                    const strlength = obj.length.value.toString().length

                    if (strlength < minNum) {
                        throw err("minLength")
                    }
                } else if (obj.length.hasOwnProperty("max") && obj.length.hasOwnProperty("min") && obj.length.hasOwnProperty("value")) {
                    // 最大值
                    let maxNum = null;
                    if (typeof (parseInt(obj.length.max)) === "number") {
                        maxNum = parseInt(obj.length.max)
                    } else {
                        throw err("err")
                    }
                    //最小值
                    let minNum = null;
                    if (typeof (parseInt(obj.length.min)) === "number") {
                        minNum = parseInt(obj.length.min)
                    } else {
                        throw err("err")
                    }
                    const strlength = obj.length.value.toString().length

                    if (strlength < minNum) {
                        throw err("minLength")
                    }
                    if (strlength > maxNum) {
                        throw err("maxLength")
                    }
                }
                break;
            case "empty":
                if (typeof (obj.empty) == "string") {
                    if (obj.empty.length == 0) {
                        throw wrong("变量为空字符")
                    }
                } else if (obj.empty instanceof Array && obj.empty.length > 0) {
                    obj.empty.forEach((value, index) => {
                        if (String(value.length) == 0) {
                            throw wrong(`第${index+1}个是空字符`)
                        }
                    })
                }
                break;
            case "email":
                if (typeof (obj.email) !== "string") {
                    throw wrong("所传邮箱非string类型")
                }
                const emailreg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (!emailreg.test(obj.email)) {
                    throw err("email")
                }
                break;
            case "phone":
                const phonereg = /^1(3|4|5|6|7|8|9)\d{9}$/;
                if (!phonereg.test(String(obj.phone))) {
                    throw err("phone");
                }
                default:
                    err("err")
                    break;
        }
    }

    // -------------------------------------------------------
    function isRight(type, obj) {
        if (obj.hasOwnProperty(type)) {
            if (obj[type] instanceof Array) {
                if (obj[type] instanceof Array && obj[type].length > 0) {
                    // 多个number参数
                    obj[type].forEach((value, index) => {
                        if (typeof (value) !== type) {
                            throw err(type, index + 1)
                        }
                    });
                }
            } else if (typeof (obj[type]) !== type) {
                throw err(type)
            }
        }
    }

    // 错误文字提示
    function err(type, index) {
        let msg = null;
        if (type) {
            switch (type) {
                case "string":
                    if (index) {
                        msg = obj.string + `第${index}个--不是string类型`;
                    } else {
                        msg = obj.string + `--不是string类型`;
                    }
                    break;
                case "number":
                    if (index) {
                        msg = obj.number + `第${index}个--不是number类型`;
                    } else {
                        msg = obj.number + "--不是number类型";
                    }
                    break;
                case "object":
                    if (index) {
                        msg = obj.object + `第${index}个--不是object类型`;
                    } else {
                        msg = obj.object + "--不是object类型";
                    }
                    break;
                case "boolean":
                    if (index) {
                        msg = obj.boolean + `第${index}个--不是boolean类型`;
                    } else {
                        msg = obj.boolean + "--不是boolean类型";
                    }
                    break;
                case "array":
                    msg = "不是array类型";
                    break;
                case "maxLength":
                    msg = "--超过限制数字";
                    break;
                case "minLength":
                    msg = "--低于限制数字";
                    break;
                case "email":
                    msg = "--不是email格式";
                    break;
                case "phone":
                    msg = "--手机号填写错误";
                    break;
                default:
                    msg = "属性或属性有误"
                    break;
            }
        }

        return {
            errmsg: msg
        }
    }

    function wrong(msg) {
        msg = msg || "参数错误"
        return {
            errmsg: msg
        };
    }

}
module.exports = dCheck