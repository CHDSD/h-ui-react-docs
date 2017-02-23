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
        this.drag = this.drag.bind(this);
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

        popupBox.style.top = pHeight/4 +'px';
        popupBox.style.left = pWidth/2-pBWidth/2 +'px';

        if(this.props.isdrag === true){
            this.drag(this.props.isdrag,popupBox);
        }
        if(this.props.callBack != undefined){
            document.getElementById('popupBoxFoot').style.display = 'block';
        }
        if(this.props.time != null){
            this.autoClose(event);
        }
    }
    //关闭按钮函数
    closePopup(event){
        var popupBox = document.getElementById(this.popupBox+""),
            popupMask = document.getElementById(this.popupMask+"");

            popupMask.style.display = 'none';
            popupBox.style.display = 'none';
    }
    //取消按钮函数
    cancel(event){
        this.closePopup(event);
        this.props.callBack(false);
    }
    //确定按钮函数
    confirm(event){
        this.closePopup(event);
        this.props.callBack(true);
    }
    //自动关闭函数
    autoClose(event){
        if(this.props.time != null){
           this.timeMark = setTimeout(function(){
                this.closePopup(event);
            }.bind(this),this.props.time);
        }
    }
    //拖拽函数
    drag(b,o){
        if(b === true){
            var disX=0;
            var disY=0;

            //getPos函数用于获取鼠标坐标
            function getPos(e){
                var e = event ? event: window.event;
                var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;

                return {x: e.clientX+scrollLeft, y: e.clientY+scrollTop};
            }

            o.onmousedown=function(e){
                var e = event ? event: window.event;
                var pos=getPos(e);

                disX=pos.x-o.offsetLeft;
                disY=pos.y-o.offsetTop;

                document.onmousemove=function(e){
                    //要防止鼠标滑动太快跑出div，所以这里应该用document.因为触发onmousemove时要重新获取鼠标的坐标，所以重新获取e和pos
                    var e = event ? event: window.event;
                    var pos=getPos(e);

                    //防止div跑出可视框
                    var l=pos.x-disX;
                    var t=pos.y-disY;
                    if(l<0)
                    {
                        l=0;
                    }
                    else if(l>document.documentElement.clientWidth-o.offsetWidth)
                    {
                        l=document.documentElement.clientWidth-o.offsetWidth;
                    }
                    if(t<0)
                    {
                        t=0;
                    }
                    else if(t>document.documentElement.clientHeight-o.offsetHeight)
                    {
                        t=document.documentElement.clientHeight-o.offsetHeight;
                    }
                    o.style.left=l+'px';
                    o.style.top=t+'px';
                }

                document.onmouseup=function(e){
                    var e = event ? event: window.event;
                    document.onmousemove=null; //将move清除
                    document.onmouseup=null;
                }
                return false;  //火狐的bug，要阻止默认事件
            }
        }else{
            o.mousedown=function (e) {
                var e = event ? event: window.event;
                //解决文字被一起拖动
                if(o.setCapture){
                    o.setCapture();
                }
                document.mouseup=function (e) {
                    var e = event ? event: window.event;
                    //解决文字被一起拖动
                    if(o.releaseCapture){
                        o.releaseCapture();
                    }
                }
            }
        }
    }
    //获取提示框的脚部div
    getFoot() {
        if (this.props.callBack != undefined) {
            return (
                <div id="popupBoxFoot" className="popupBoxFoot">
                <a onClick={this.cancel} style={{color:'#666',display: 'inline-block',padding: '5px 10px',background:'#e6e6e6',marginRight:'25px',cursor: 'pointer'}}>{this.props.cancelText}</a>
                <a onClick={this.confirm} style={{color:'#fff',display: 'inline-block',padding: '5px 10px',background:'#0e90d2',cursor: 'pointer'}}>{this.props.confirmText}</a>
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
                    <a href="javascript:;" className="popupBoxCloseBtn" onClick={this.closePopup}><i className="fa-icon icon-cancel"></i></a>
                    <div className="popupBoxBody">{this.props.content}</div>
                    {popupBoxFoot}
                </div>
            </div>
        );
    }
}
export default Popup;