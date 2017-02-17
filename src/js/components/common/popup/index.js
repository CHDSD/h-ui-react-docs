/**
 * Created by xiening on 2017/2/16.
 */
import React from 'react';
import Popup from '../../h-ui/Popup';

const code = `
示例代码
`;

class DemoPopup extends React.Component {
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
            <div className="Popup">
                <p style={{marginBottom:'30px'}}>popup切换(Popup)组件：</p>
                {/*<Popup></Popup>*/}
                <Popup> </Popup>
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

export default DemoPopup;