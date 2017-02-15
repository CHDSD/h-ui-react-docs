/**
 * Created by xiening on 2017/2/14.
 */
import React from 'react';
import Tabs from '../../h-ui/Tabs';

const code = `
import Tabs from '../../h-ui/Tabs';

this.state = {
            currentIndex : 1
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
        this.state = {
            currentIndex : 0
        }
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
        return (
            <div className="Tabs">
                <p style={{marginBottom:'30px'}}>tabs切换(Tabs)组件：</p>
                <div className="container">
                    {/*<Tabs> </Tabs>*/}
                    <Tabs>
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