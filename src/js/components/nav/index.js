import React from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<div className="nav">
  			{this.props.children}
  		</div>
		);
  }
}

export default Nav;