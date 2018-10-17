/*
 * JSX语法：
 * 1.可以在js中书写XML(HTML)
 * 2.每个解构中有且只能有一个顶层元素
 * 3.可以像HTML一样嵌套
 * 4.JSX标签可以添加属性
 * 5.支持插值表达式
 * 
 * 其他用法请参考附录：《React》
 */
import React,{Component} from 'react';

import './index.less';

const className = "test";
class HelloMessage extends Component{
    render(){
        return (
            <div className={className}>
                <h2>Hello {this.props.name}</h2>
                <h3>Good to see you here.</h3>
            </div>
        )
    }
}

export default HelloMessage;

/*
 * 注解：
 * Less是一种动态样式语言，Less将 CSS 赋予了动态语言的特性，如 变量， 继承， 运算。
 * 了解Less语法和使用规则请前往：http://www.bootcss.com/p/lesscss/
 */