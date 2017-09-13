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
        <h3>Canvas Designer</h3>
        <Header/>
        <Designer/>
          Used libraries:
          <ul className="list-group">
            <li className="list-group-item">React.js</li>
            <li className="list-group-item">Fabric.js</li>
            <li className="list-group-item">Lodash.js</li>
            <li className="list-group-item">Bootstrap</li>
          </ul>
      </div>
    )
  }

}

export default connect(null, {getAppData})(App);