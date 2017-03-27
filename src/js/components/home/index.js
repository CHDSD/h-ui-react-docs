import React from 'react';


// home页面
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className="home-page">
        <h2>HONG-UI-react</h2>
        <p>通用react UI组件库</p>

        <h3>快速开始:</h3>
        <p>
          安装：
          <pre className="pre">npm install h-ui-react</pre><br/>

          引入：
          <pre className="pre">import h-ui-react;</pre><br/>
        </p>

        <h3>文档：</h3>
        <a href="https://github.com/CHDSD/HONG-UI-react/blob/master/README.md">HONG-UI-react</a>
        <br/><br/>
        <a href="https://chdsd.github.io/h-ui-react-docs/">demo</a>

        <h3>组件列表:</h3>

      </div>
    );
  }
}

/*



*/


export default Home;