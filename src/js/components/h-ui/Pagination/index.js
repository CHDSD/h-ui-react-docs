import React from 'react';
import './style.scss';

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.handleclick = this.handleclick.bind(this);
		this.handleup = this.handleup.bind(this);
		this.handledown = this.handledown.bind(this);
	}
	handleclick(event) {
		var value = event.target.innerHTML;
		if(event.target.className == 'disable'){
			return ;
		}else if(event.target.innerHTML == this.props.current){
			return ;
		}else{
			this.props.click(value);
		}
	}
	handleup() {
		this.props.click('up');
	}
	handledown() {
		this.props.click('down');
	}
	render() {
		var total = parseInt(this.props.total),
			current = parseInt(this.props.current),
			range = parseInt(this.props.range),
			dif = total - current;
		var sp = [],i;
		var part = Math.ceil(range/2);
		if(current < (range + 1)){
			if(dif < range){
				for(i = 1;i < total + 1;i++){
					if(i == current){
						sp.push(<span onClick={this.handleclick} key={i} className='active'>{i}</span>);
					}else{
						sp.push(<span onClick={this.handleclick} key={i}>{i}</span>);
					}
				}
			}else{
				for(i = 1;i < Math.min(total + 1,range + 1);i++){
					if(i == current){
						sp.push(<span onClick={this.handleclick} key={i} className='active'>{i}</span>);
					}else{
						sp.push(<span onClick={this.handleclick} key={i}>{i}</span>);
					}
				};
				sp.push(<span key={'dot'}>...</span>);
				sp.push(<span onClick={this.handleclick} key={total}>{total}</span>);
			}
		}else{
			if(dif < part){
				sp.push(<span onClick={this.handleclick} key={1}>1</span>);
				sp.push(<span key={'dot'}>...</span>);
				for(i = current - (range - 1);i < total + 1;i++){
					if(i == current){
						sp.push(<span onClick={this.handleclick} key={i} className='active'>{i}</span>);
					}else{
						sp.push(<span onClick={this.handleclick} key={i}>{i}</span>);
					}
				}
			}else {
				sp.push(<span onClick={this.handleclick} key={1}>1</span>);
				sp.push(<span key={'dot'}>...</span>);
				
				for(i = current - part;i < current + range - part;i++){
					if(i == current){
						sp.push(<span onClick={this.handleclick} key={i} className='active'>{i}</span>);
					}else{
						sp.push(<span onClick={this.handleclick} key={i}>{i}</span>);
					}
				};
				sp.push(<span key={'anotherdot'}>...</span>);
				sp.push(<span onClick={this.handleclick} key={total}>{total}</span>);
			}
		}
		return(
			<div className="pagination">
				<span onClick={this.handleup} className='up'>
					&nbsp;
					<svg width="48" height="48" viewBox="0 0 48 48">
					  <g transform="translate(10,14) scale(-1,1) translate(-10,-14) translate(-14,-10) ">
					    <path d="m3.93096,19.5l-2.43096,2.6319l12.03714,11.8681l-12.03714,12.03797l2.43096,2.46203l14.56904,-14.5l-14.56904,-14.5z" fill="#999">
					    </path>
					  </g>
					</svg>
				</span>
				{sp}
				<span onClick={this.handledown} className='down'>
					&nbsp;
					<svg width="48" height="48" viewBox="0 0 48 48">
						<path fill="#999" d="m17.93096,9.5l-2.43096,2.6319l12.03714,11.8681l-12.03714,12.03797l2.43096,2.46203l14.56904,-14.5l-14.56904,-14.5z">
						</path>
					</svg>
				</span>
			</div>
		);
	}
}
export default Pagination;