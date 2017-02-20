/**
 * Created by xiening on 2017/2/16.
 */
import React from 'react';
import './style.scss';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.click=this.click.bind(this);
        this.closePopup=this.closePopup.bind(this);
        this.cancel=this.cancel.bind(this);
        this.confirm=this.confirm.bind(this);
        this.autoClose=this.autoClose.bind(this);
    }

    click(event) {
        document.getElementById('popupMask').style.display='block';
        document.getElementById('popupBox').style.display='block';

        var popupBox=document.getElementById('popupBox');
        var pHeight=document.body.clientHeight;
        var pWidth=document.body.clientWidth;
        var pBHeight=popupBox.offsetHeight;
        var pBWidth=popupBox.offsetWidth;

        popupBox.style.top=pHeight/2-pBHeight/2 +'px';
        popupBox.style.left=pWidth/2-pBWidth/2 +'px';

        if(this.props.callBack !=undefined){
            document.getElementById('popupBoxFoot').style.display='block';
        }else{
            //document.getElementById('popupBoxFoot').style.display='none';
        }
        if(this.props.time !=null){
            //console.debug(this.props.time);
            this.autoClose(event);
        }

    }
    closePopup(event){
        document.getElementById('popupMask').style.display='none';
        document.getElementById('popupBox').style.display='none';
    }
    cancel(event){
        this.closePopup(event);
        this.props.callBack(false);
    }
    confirm(event){
        this.closePopup(event);
        this.props.callBack(true);
    }
    autoClose(event){
        //console.debug(this.props.time);
        if(this.props.time != null){
          setTimeout(function(){
                this.closePopup(event);
            }.bind(this),3000);
        }
    }

    getFoot() {
        if (this.props.callBack != undefined) {
            return (
                <div id="popupBoxFoot" className="popupBoxFoot">
                <a onClick={this.cancel} style={{color:'#666',display: 'inline-block',padding: '5px 10px',background:'#e6e6e6',marginRight:'25px'}}>取消</a>
                <a onClick={this.confirm} style={{color:'#fff',display: 'inline-block',padding: '5px 10px',background:'#0e90d2'}}>确定</a>
            </div>
            );
        } else {
            return null;
        }
    }

    render(){
        let popupBoxFoot = this.getFoot();
        return(
            <div className="Popup">
                <div id="popupMask" className="popupMask"></div>
                {React.Children.map(this.props.children,(element) => {
                    return(
                        <div onClick={this.click}>{element}</div>
                    );
                })
                }
                <div id="popupBox" className="popupBox" >
                    <h1 className="popupBoxTitle">系统提示</h1>
                    <a href="javascript:;" className="popupBoxCloseBtn" onClick={this.closePopup}><i className="iconClose"></i></a>
                    <div className="popupBoxBody">系统提示信息</div>
                    {popupBoxFoot}
                </div>
            </div>
        );
    }
}
export default Popup;