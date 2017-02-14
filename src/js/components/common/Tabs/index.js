/**
 * Created by xiening on 2017/2/14.
 */
import React from 'react';

const code = `
import Tabs from '../../h-ui/Tabs';

const TabsData = [
  ];

<Tabs ></Tabs>
`;

class Tabs extends React.Component {
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
        return (
            <div className="menu">
                <p>tabs切换(Tabs)组件：</p>
                <div style={{width: '300px'}}>
                    {/*<Tabs> </Tabs>*/}
                </div>

                <p>示例代码：</p>
                <div>
          <pre>
            <code ref="code" className="js"></code>
          </pre>
                </div>
            </div>
        );
    }
}

export default Tabs;