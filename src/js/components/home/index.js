import React from 'react';
import { Calendar } from '../h-ui';


// home页面
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div>
      	<p>这里是首页页面。</p>
      	<Calendar></Calendar>
      </div>
    );
  }
}

/*



*/


export default Home;