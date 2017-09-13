import React, {Component} from 'react';

import Canvas from './canvas';
import Gallery from './gallery';

class Designer extends  Component {
  render() {
    return(
      <div>
        <h1>Designer</h1>
        <Canvas/>
        <Gallery/>
      </div>

    );
  }
}

export default Designer;