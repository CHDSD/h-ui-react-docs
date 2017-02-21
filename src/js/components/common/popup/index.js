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
        var popupData = {
            title:'提示信息标题1',
            content:'提示信息内容1'

        }
        var popupData2 = {
            title:'提示信息标题2',
            content:'提示信息内容2',
            cancelText:'否',
            confirmText:'是',
            callBack:function(b){
                if(b){
                    console.log("点击了"+this.confirmText+"按钮"+b);
                }else{
                    console.log("点击了"+this.cancelText+"按钮"+b);
                }
            }
        }
        var popupData3 = {
            title:'提示信息标题3',
            content:'提示信息内容3',
            time: 3000
        }
        return (
            <div className="Popup">
                <p style={{marginBottom:'30px'}}>popup切换(Popup)组件：</p>
                {/*<Popup></Popup>*/}
                <Popup {...popupData}>
                    <a href="javascript:;" className="alertPopup">alert</a>
                </Popup>
                <Popup {...popupData2}>
                    <a href="javascript:;" className="alertPopup" style={{marginTop:'15px'}} >带回调函数的popup</a>
                </Popup>
                <Popup {...popupData3}>
                    <a href="javascript:;" className="alertPopup" style={{marginTop:'15px'}} >3秒关闭</a>
                </Popup>
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