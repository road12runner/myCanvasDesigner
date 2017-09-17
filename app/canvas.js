import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransitionGroup  from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

import {submitImage, nextStep, previousStep} from './actions'
import Filters from'./filters';
import Gallery from './gallery';
const PERSON_URL ='http://localhost:9999/API/designers/1b283d18-c2bf-4ba4-990a-63d5959f2750/Images/person.png';

const STATES = ['background', 'filters', 'text', 'logo', 'submit'];

class Canvas extends  Component {
  constructor() {
    super();
    this.onAddText = this.onAddText.bind(this);
    this.onAddLogo = this.onAddLogo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {currentBackgroundImage : 0}
  }

  componentDidMount() {


    this.canvas = new fabric.Canvas('aamjs-canvas', {width: 500, height: 350});
    this.canvas.preserveObjectStacking = true;

    const canvas = this.canvas;
    const that = this;
    const checkImages = (img1, img2) => {
      const coords1 =  getCoordinates(img1);
      const coords2 =  getCoordinates(img2);
      that.setState({showCoverageMessage: !isInside(coords1, coords2)})
    };

    canvas.on({
      'touch:gesture': function(e) {
        console.log(' Gesture ', canvas.getActiveObject());
      },
      'touch:drag': function(e) {
        if (canvas._objects.length > 1) {
          checkImages(canvas._objects[1], canvas._objects[0]);
        }
      },
      'touch:orientation': function() {
        console.log(' Orientation ');
      },
      'touch:shake': function() {
        console.log(' Shaking ');
      },
      'touch:longpress': function() {
        console.log(' Longpress ');
      }
    });

  }

  componentWillReceiveProps(nextProps){

    if (!this.props.template && nextProps.template) {
      this.loadTemplate(nextProps.template.UrlLarge)
    }
    if (nextProps.selectedImage && nextProps.selectedImage.imgId !== this.state.currentBackgroundImage) {
      if (this.state.currentBackgroundImage) {
        // unload
        this.unLoadBackgroundImage(this.state.currentBackgroundImage).then(() => {
          this.loadBackgroundImage(nextProps.selectedImage.url);
        });
      } else {
        this.loadBackgroundImage(nextProps.selectedImage.url);
      }

      this.setState({currentBackgroundImage: nextProps.selectedImage.imgId});


    }


    if (nextProps.filters != this.props.filters && STATES[this.props.currentStep] === 'filters') {
        this.renderFilters(this.props.filters);
    }

  }

  loadTemplate(url) {
    const that = this;
    const canvas = this.canvas;
    const templateImage = new fabric.Image();
    fabric.Image.fromURL(url,  function(oImg) {
      oImg.scaleToHeight(153);
      oImg.scaleToWidth(261);
      oImg.set({
        left: -100,
        top:  100,
      });
      canvas.add(oImg);
      oImg.animate('left', 100, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease['easeOutBack'],
        onComplete: () => {
          oImg.hasBorders = false;
          oImg.hasControls = false;
          oImg.set('selectable', false);
          oImg.lockMovementX = true;
          oImg.lockMovementY = true;

          const rect = new fabric.Rect({
            left: 100,
            top: 100,
            stroke: 'red',
            fill: 'rgba(0,0,0,0)',
            width: 261,
            height: 153,
          });
          rect.hasBorders = false;
          rect.hasControls = false;
          rect.set('selectable', false);
          rect.lockMovementX = true;
          rect.lockMovementY = true;

          canvas.add(rect);
        }
      });


    },{crossOrigin :'anonymous'});

  }

  loadBackgroundImage(url) {
    const canvas = this.canvas;
    const that = this;
    fabric.Image.fromURL(url,  function(oImg) {
      oImg.scaleToHeight(300);
      oImg.scaleToWidth(300);
      oImg.set({
        left: -300,
        top:  80,
      });
      canvas.insertAt(oImg, 0).setActiveObject(oImg);


      oImg.animate('left', 80, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease['easeOutBack'],
        onComplete: () => {
          that.props.nextStep();
        }
      });

    }, {crossOrigin :'anonymous'});

  }

  unLoadBackgroundImage(id) {
    const canvas = this.canvas;
    const img = canvas._objects[0];
    return new Promise( (resolve, reject) => {

      img.animate('left', -300, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: () => {
          canvas.remove(img);
          resolve({isRemoved: true});
        },
        easing: fabric.util.ease['easeInBack']
      });

    });


  }

  onAddText(){
    const canvas = this.canvas;
    const txt = this.textInput.value;
    const text = new fabric.Text(txt, { left: 120, top: 0, fill: '#fff' });
    canvas.add(text);

    text.animate('top', 120, {
      duration: 1000,
      onChange: canvas.renderAll.bind(canvas),
      easing: fabric.util.ease['easeOutBack']
    });

  }
  onAddLogo() {
    const canvas = this.canvas;

    fabric.Image.fromURL(PERSON_URL,  function(oImg) {
      oImg.scaleToHeight(50);
      oImg.scaleToWidth(50);
      oImg.set({
        left: 380,
        top:  140,
      });
      canvas.add(oImg).setActiveObject(oImg);


      oImg.animate('left', 280, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease['easeOutBack']
      });

    },{crossOrigin :'anonymous'});

  }


  onSubmit() {
    const canvas = this.canvas;

    // remove rectange
    const rectangle = canvas._objects[2];
    canvas.remove(rectangle);

    const dataURLWithTemplate = this.canvas.toDataURL({
      format: 'png',
      left: 100,
      top: 100,
      width: 261,
      height:153,
      multiplier: 1
    });

    const template = canvas._objects[1];
    canvas.remove(template);

    const dataURL = this.canvas.toDataURL({
      format: 'png',
      left: 100,
      top: 100,
      width: 261,
      height:153,
      multiplier: 1
    });


    this.props.submitImage(dataURL, dataURLWithTemplate);
  }

  renderFilters(filters) {
    console.log('render filters', filters);

    const webglBackend = new fabric.WebglFilterBackend();
    const canvas2dBackend = new fabric.Canvas2dFilterBackend();
    const f = fabric.Image.filters;

    if (filters.webgl) {
      fabric.filterBackend = webglBackend;
    } else {
      fabric.filterBackend = canvas2dBackend;
    }

    const filterList= [];

    filterList[4] = filters.brownie && new f.Brownie();
    filterList[9] = filters.vintage && new f.Vintage();
    filterList[14] = filters.technicolor && new f.Technicolor();
    filterList[15] = filters.polaroid && new f.Polaroid();
    filterList[18] = filters.kodachrome && new f.Kodachrome();
    filterList[19] = filters.blackwhite && new f.BlackWhite();

    const grayScaleMode = filters.average ? 'average' : filters.luminosity ? 'luminosity' : filters.lightness ? 'lightness' : '';
    if (grayScaleMode) {
      filterList[0] = filters.grayscale && new f.Grayscale({
          mode: grayScaleMode
        });
    } else {
      filterList[0] = filters.grayscale && new f.Grayscale();

    }
    filterList[1] = filters.invert && new f.Invert();
    filterList[2] = filters.removeColor && new f.RemoveColor({
            distance: filters.removeColorDistance,
            color: filters.removeColorColor,
          });
    filterList[3] = filters.sepia && new f.Sepia();
    filterList[5] = filters.brightness && new f.Brightness({
      brightness: parseFloat(filters.brightnessValue)
    });
    filterList[17] = filters.gamma && new f.Gamma({
      gamma: [
        parseFloat(filters.gammaRed), parseFloat(filters.gammaGreen), parseFloat(filters.gammaBlue)
      ]
    });

    filterList[6] = filters.contrast && new f.Contrast({
      contrast: parseFloat(filters.contractValue)
    });

    filterList[7] = filters.saturation && new f.Saturation({
      saturation: parseFloat(filters.saturationValue)
    });

    filterList[8] = filters.noise && new f.Noise({
      noise: parseInt(filters.noiseValue, 10)
    });

    filterList[10] = filters.pixelate && new f.Pixelate({
      blocksize: parseInt(filters.pixelateValue, 10)
    });

    filterList[11] = filters.blur && new f.Blur({
      value: parseFloat(filters.bluerValue)
    });

    filterList[12] = filters.sharpen && new f.Convolute({
      matrix: [  0, -1,  0,
        -1,  5, -1,
        0, -1,  0 ]
    });
    filterList[13] = filters.emboss && new f.Convolute({
      matrix: [ 1,   1,  1,
        1, 0.7, -1,
        -1,  -1, -1 ]
    });

    filterList[16] = filters.blend && new f.BlendColor({
      color: filters.blendColor,
      mode: filters.blendMode,
      alpha: filters.blendAlpha
    });

    filterList[21] = filters.hue && new f.HueRotation({
      rotation: filters.hueValue,
    });

    if (this.canvas && this.canvas._objects.length > 1) {
      const obj = this.canvas._objects[0];
      obj.filters = filterList;
      obj.applyFilters();
      this.canvas.renderAll();
    }
  }


  render() {


    return(
      <div>
        <div>
          <canvas id="aamjs-canvas" className="designer-canvas"/>
          <div>
            {this.renderCoverageMessage()}
          </div>
        </div>
        <TransitionGroup>
          {this.renderTools()}
        </TransitionGroup>
      </div>
    );
  }

  renderTools() {
    console.log('step', this.props.currentStep);
    const duration = 300;
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
      exiting: {opacity: 0},
      exited: {opacity : 0},
      unmounted: {opacity: 0}
    };

    switch(STATES[this.props.currentStep]) {

      case 'background':
        return (
          <Transition key='background' in={true} timeout={duration} mountOnEnter={true} unmountOnExit={true} appear={true}>
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <Gallery/>
              </div>
            )}
          </Transition>
        );
      case 'filters':
        return (
          <Transition key='filters' in={true} timeout={duration} mountOnEnter={true} unmountOnExit={true} appear={true}>
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <Filters/>
              </div>
            )}
          </Transition>
        );
      case 'logo' :
        return (
          <Transition key='logo' in={true} timeout={duration} mountOnEnter={true} unmountOnExit={true} appear={true}>
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <div>
                  <div className="form-group">
                    <button className="btn bnt-primary" onClick={this.onAddLogo}>Add Logo</button>
                  </div>
                  <div>
                    <button className='btn btn-primary btn-right' onClick={()=> this.props.nextStep()}>Next</button>
                    <button className='btn btn-primary btn-right' onClick={()=> this.props.previousStep()}>Back</button>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        );
      case 'text':
        return (
          <Transition key='text' in={true} timeout={duration} mountOnEnter={true} unmountOnExit={true} appear={true}>
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <div>
                  <div className="form-group">
                    <input type="text" className="form-control" ref={(input) => { this.textInput = input; }}/>
                    <button className="btn bnt-primary" onClick={this.onAddText}>Add Text</button>
                  </div>
                  <div>
                    <button className='btn btn-primary btn-right' onClick={()=> this.props.nextStep()}>Next</button>
                    <button className='btn btn-primary btn-right' onClick={()=> this.props.previousStep()}>Back</button>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        );
      case 'submit':
        return(
          <Transition key='submit' in={true} timeout={duration} mountOnEnter={true} unmountOnExit={true} appear={true}>
            {(state) => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <div>
                  <div className="form-group">
                    <button className="btn btn-success" onClick={this.onSubmit}>Submit</button>
                  </div>
                  <div>
                    <button className='btn btn-primary pull-right' onClick={()=> this.props.previousStep()}>Back</button>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        );

      default:
        return null;
    }
  }

  renderCoverageMessage() {
    if(this.state.showCoverageMessage) {
      return (
        <span className="cardcoverage-message">Place background image in good position</span>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const {template, selectedImage, currentStep} = state.designer;
  const filters = state.filters;
 return {template, selectedImage, filters, currentStep};
};

const getCoordinates = (img) => {
  var coords = img.calcCoords(true);
  var coordArray= [
    {x: coords.bl.x, y: coords.bl.y},
    {x: coords.br.x, y: coords.br.y},
    {x: coords.tl.x, y: coords.tl.y},
    {x: coords.tr.x, y: coords.tr.y}
  ];

  var minX = _.minBy(coordArray, 'x').x;
  var manX = _.maxBy(coordArray, 'x').x;
  var minY = _.minBy(coordArray, 'y').y;
  var maxY = _.maxBy(coordArray, 'y').y;
  return {
    minX: minX,
    maxX: manX,
    minY: minY,
    maxY: maxY
  }
};

const isInside = (inner, outer) => {
  return outer.minX <= inner.minX && outer.maxX >= inner.maxX && outer.minY <= inner.minY && outer.maxY >= inner.maxY;
};



// function filters() {
//   (function() {
//     // manually initialize 2 filter backend to give ability to switch:
//   })();
// }

export default connect(mapStateToProps, {submitImage, nextStep, previousStep})(Canvas);