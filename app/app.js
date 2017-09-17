import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './header';
import Designer from './designer';

import {getAppData} from './actions'
class App extends Component {
  componentWillMount(){
    this.props.getAppData();
  }
  render() {
    return(
      <div className="container">
        <h3>iCanvas</h3>
        <Header/>
        <Designer/>
        <p>
          Used libraries: <span className="small-text">React.js, Fabric.js, Lodash.js</span>
        </p>
        <p>
          <span className="small-text">Total minified project size ~ 600Kb</span>
        </p>

      </div>
    )
  }

}

export default connect(null, {getAppData})(App);