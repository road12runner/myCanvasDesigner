import React, {Component} from 'react';
import {connect} from 'react-redux';
class Canvas extends  Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas('aamjs-canvas', 500, 500);
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    // "add" rectangle onto canvas
    this.canvas.add(rect);

  }

  componentWillReceiveProps(nextProps){
    // show template
    if (!this.props.template && nextProps.template) {
      console.log('rendering template', nextProps.template);
    }

    //console.log('componentWillReceiveProps', nextProps, this.props.template);
  }
  render() {
    console.log('canvas', this.canvas);
    return(
      <div>
        <h1>Canvas</h1>
        <canvas id="aamjs-canvas" className="designer-canvas"></canvas>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  const {template} = state.designer;
  console.log('template', template);
 return {template};
};


export default connect(mapStateToProps)(Canvas);