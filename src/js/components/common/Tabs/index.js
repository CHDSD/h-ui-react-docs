/**
 * Created by xiening on 2017/2/14.
 */
import React from 'react';
import Tabs from '../../h-ui/Tabs';

const code = `
import Tabs from '../../h-ui/Tabs';

var tabsData = {
            currentIndex : 0, //指定刚开始显示哪个选项卡
            animate : true    //是否开启动画效果？false，true
            callBack : function(index,title){  //如果有回调函数可以添加回调函数
                console.log("tabs为：",index);
                console.log("title为：",title);
            }
        }
render:
<Tabs >
    <div name="第一选项卡">内容一......</div>
    <div name="第二选项卡">内容二......</div>
    <div name="第三选项卡">内容三.....</div>
</Tabs>
`;

class DemoTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.code.innerText = code;
        var _t = this;
        hljs.highlightBlock(_t.refs.code);
        // setTimeout(function () {
        //   // hljs.initHighlighting();
        // }, 200)
    }

    render() {
        var tabsData = {
            currentIndex : 0,
            animate : true,
            callBack : function(index,title){
                console.log("tabs为：",index);
                console.log("title为：",title);
            }
        }
        return (
            <div className="Tabs">
                <p style={{marginBottom:'30px'}}>tabs切换(Tabs)组件：</p>
                <div className="container">
                    {/*<Tabs> </Tabs>*/}
                    <Tabs {...tabsData}>
                        <div name="第一选项卡">内容一......</div>
                        <div name="第二选项卡">内容二......</div>
                        <div name="第三选项卡">内容三.....</div>
                    </Tabs>
                </div>

                <p style={{marginTop:'30px'}}>示例代码：</p>
                <div>
          <pre>
            <code ref="code" className="js"></code>
          </pre>
                </div>
            </div>
        );
    }
}

export default DemoTabs;