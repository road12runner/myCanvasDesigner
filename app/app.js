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
      <div>
        <h1>Main App</h1>
        <Header/>
        <Designer/>
      </div>
    )
  }

}

export default connect(null, {getAppData})(App);