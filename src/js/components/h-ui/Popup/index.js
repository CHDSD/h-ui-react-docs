/**
 * Created by xiening on 2017/2/16.
 */
import React from 'react';
import './style.scss';

class Popup extends React.Component {

    constructor(props) {
        super(props);
        var timestamp = new Date().getTime(),
            timeMark = false;
        this.click = this.click.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
        this.autoClose = this.autoClose.bind(this);
        this.popupBox = "popupBox"+timestamp;
        this.popupMask = "popupMask"+timestamp;
        this.timeMark = timeMark;
    }
    click(event) {
        clearTimeout(this.timeMark);
        var popupBox = document.getElementById(this.popupBox+""),
            popupMask = document.getElementById(this.popupMask+""),
            pHeight = document.body.clientHeight,
            pWidth = document.body.clientWidth,
            pBHeight = popupBox.offsetHeight,
            pBWidth = popupBox.offsetWidth;

        popupBox.style.display = 'block';
        popupMask.style.display = 'block';

        popupBox.style.top = pHeight/2-pBHeight/2 +'px';
        popupBox.style.left = pWidth/2-pBWidth/2 +'px';

        if(this.props.callBack != undefined){
            document.getElementById('popupBoxFoot').style.display = 'block';
        }
        if(this.props.time != null){
            this.autoClose(event);
        }
    }
    closePopup(event){
        var popupBox = document.getElementById(this.popupBox+""),
            popupMask = document.getElementById(this.popupMask+"");

            popupMask.style.display = 'none';
            popupBox.style.display = 'none';
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
        if(this.props.time != null){
           this.timeMark = setTimeout(function(){
                this.closePopup(event);
            }.bind(this),3000);
        }
    }
    getFoot() {
        if (this.props.callBack != undefined) {
            return (
                <div id="popupBoxFoot" className="popupBoxFoot">
                <a onClick={this.cancel} style={{color:'#666',display: 'inline-block',padding: '5px 10px',background:'#e6e6e6',marginRight:'25px'}}>{this.props.cancelText}</a>
                <a onClick={this.confirm} style={{color:'#fff',display: 'inline-block',padding: '5px 10px',background:'#0e90d2'}}>{this.props.confirmText}</a>
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
                <div id={this.popupMask} className="popupMask"></div>
                {React.Children.map(this.props.children,(element) => {
                    return(
                        <div onClick={this.click}>{element}</div>
                    );
                })
                }
                <div id={this.popupBox} className="popupBox" >
                    <h1 className="popupBoxTitle">{this.props.title}</h1>
                    <a href="javascript:;" className="popupBoxCloseBtn" onClick={this.closePopup}><i className="iconClose"></i></a>
                    <div className="popupBoxBody">{this.props.content}</div>
                    {popupBoxFoot}
                </div>
            </div>
        );
    }
}
export default Popup;