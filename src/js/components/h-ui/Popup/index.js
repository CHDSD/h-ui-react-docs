/**
 * Created by xiening on 2017/2/16.
 */
import React from 'react';
import './style.scss';

class Popup extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <div className = "m-mask"></div>
                <div className = "m-dialog">
                    <div className="md-dialog">
                        <div className="md-dialog-title">
                            <h4>{title}</h4>
                            <span className="btn">
                                <i className="iconfont">&time</i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Popup;