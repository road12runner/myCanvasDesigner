import React, {Component} from 'react';
import {connect} from 'react-redux';
class Canvas extends  Component {
  constructor() {
    super();
    this.loadTemplate.bind(this);
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas('aamjs-canvas', {width: 500, height: 500});
  }

  componentWillReceiveProps(nextProps){
    // show template
    if (!this.props.template && nextProps.template) {
      this.loadTemplate(nextProps.template.UrlLarge)
    }

    //console.log('componentWillReceiveProps', nextProps, this.props.template);
  }

  renderTemplate() {

  }
  loadTemplate(url) {
    const canvas = this.canvas;

    fabric.Image.fromURL(url,  function(oImg) {
      oImg.scaleToHeight(153);
      oImg.scaleToWidth(261);
      oImg.set({
        left: -300,
        top:  100,
        fill: 'rgba(0,0,0,0)',
        stroke:'red',
        strokeWidth:10
        //clipTo: roundedCorners.bind(oImg),
        // clipTo: function (ctx) {
        //   ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
        // }
      });
      canvas.add(oImg).setActiveObject(oImg);


      oImg.animate('left', 100, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease['easeOutBack']
      });

    });
  }


  render() {
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
 return {template};
};


export default connect(mapStateToProps)(Canvas);