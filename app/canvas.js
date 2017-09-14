import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitImage} from './actions'
import Filters from'./filters';
const PERSON_URL ='http://localhost:9999/API/designers/1b283d18-c2bf-4ba4-990a-63d5959f2750/Images/person.png';

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
      //isInside(coords1, coords2) ? $('#coverage-message').hide() : $('#coverage-message').show();
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
    // show template
    if (!this.props.template && nextProps.template) {
      this.loadTemplate(nextProps.template.UrlLarge)
    }
    if (nextProps.selectedImage && nextProps.selectedImage.imgId !== this.state.currentBackgroundImage) {
      console.log('nextProps.selectedImage', nextProps.selectedImage);
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

    //console.log('componentWillReceiveProps', nextProps, this.props.template);
  }

  renderTemplate() {

  }
  loadTemplate(url) {
    const canvas = this.canvas;

    const templateImage = new fabric.Image();
    templateImage.crossOrigin = 'anonymous';
    fabric.Image.fromURL(url,  function(oImg) {
      oImg.scaleToHeight(153);
      oImg.scaleToWidth(261);
      oImg.set({
        left: -300,
        top:  100,
        fill: 'rgba(0,0,0,0)',
        stroke:'red',
        strokeWidth:10,
        //clipTo: roundedCorners.bind(oImg),
        // clipTo: function (ctx) {
        //   ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
        // }
      });
      //oImg.setAttribute('crossOrigin', 'anonymous');

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
        }
      });

    }, {crossOrigin :'anonymous'});
  }

  loadBackgroundImage(url) {
    const canvas = this.canvas;

    fabric.Image.fromURL(url,  function(oImg) {
      oImg.scaleToHeight(300);
      oImg.scaleToWidth(300);
      oImg.set({
        left: -300,
        top:  80,
        //clipTo: roundedCorners.bind(oImg),
        // clipTo: function (ctx) {
        //   ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
        // }
      });
      canvas.insertAt(oImg, 0).setActiveObject(oImg);


      oImg.animate('left', 80, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        easing: fabric.util.ease['easeOutBack']
      });

    }, {crossOrigin :'anonymous'});

  }

  unLoadBackgroundImage(id) {
    const canvas = this.canvas;
    var img = canvas._objects[0];
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

    const text = new fabric.Text(this.textInput.value, { left: 120, top: -320, fill: '#fff' });
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
        left: 580,
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

    // remove template
    const template = canvas._objects[0];

    //canvas.remove(template);

    const dataURL = this.canvas.toDataURL({
      format: 'png',
      left: 100,
      top: 100,
      width: 261,
      height:153,
      multiplier: 0.5
    });
    this.props.submitImage(dataURL);
    // var imgId = new Date().getTime();
    // $.ajax('http://localhost:9999/pcs/api/v1/designers/submit/' + imgId, {
    //   method: 'POST',
    //   data: {img:  dataURL},
    //   success: function(){
    //     console.log('success');
    //   },
    //   error: function() {
    //     console.log('error');
    //   }
    // });


  }

  render() {
    const selectedImage = this.props.selectedImage;
    return(
    <div>
      <div className="row">
        <div className="col-xs12">
          <div className="tool-bar">
            <div className="form-group">
              <input type="text" className="form-control" ref={(input) => { this.textInput = input; }}/>
              <button className="btn bnt-primary" onClick={this.onAddText}>Add Text</button>
            </div>
            <div className="form-group">
              <button className="btn bnt-primary" onClick={this.onAddLogo}>Add Logo</button>
              <button className="btn bnt-primary" onClick={this.onSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <canvas id="aamjs-canvas" className="designer-canvas"></canvas>
        <div>
          {this.renderCoverageMessage()}
        </div>
      </div>
      <div>
        <Filters/>
      </div>

    </div>

    );
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
  const {template, selectedImage} = state.designer;
 return {template, selectedImage};
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



function filters() {
  (function() {
    // manually initialize 2 filter backend to give ability to switch:
    var webglBackend = new fabric.WebglFilterBackend();
    var canvas2dBackend = new fabric.Canvas2dFilterBackend();

    fabric.filterBackend = webglBackend;
    fabric.Object.prototype.transparentCorners = false;

    function applyFilter(index, filter) {
      const obj = canvas.getActiveObject();
      obj.filters[index] = filter;
      obj.applyFilters();
      const dimString = canvas.getActiveObject().width + ' x ' +
        canvas.getActiveObject().height;
      canvas.renderAll();
    }

    function getFilter(index) {
      const obj = canvas.getActiveObject();
      return obj.filters[index];
    }

    function applyFilterValue(index, prop, value) {
      const obj = canvas.getActiveObject();
      if (obj.filters[index]) {
        obj.filters[index][prop] = value;
        obj.applyFilters();
        canvas.renderAll();
      }
    }

    fabric.Object.prototype.padding = 5;
    fabric.Object.prototype.transparentCorners = false;

    var canvas = this.__canvas = new fabric.Canvas('c'),
      f = fabric.Image.filters;



    var indexF;
    $('webgl').onclick = function() {
      if (this.checked) {
        fabric.filterBackend = webglBackend;
      } else {
        fabric.filterBackend = canvas2dBackend;
      }
    };
    $('brownie').onclick = function() {
      applyFilter(4, this.checked && new f.Brownie());
    };
    $('vintage').onclick = function() {
      applyFilter(9, this.checked && new f.Vintage());
    };
    $('technicolor').onclick = function() {
      applyFilter(14, this.checked && new f.Technicolor());
    };
    $('polaroid').onclick = function() {
      applyFilter(15, this.checked && new f.Polaroid());
    };
    $('kodachrome').onclick = function() {
      applyFilter(18, this.checked && new f.Kodachrome());
    };
    $('blackwhite').onclick = function() {
      applyFilter(19, this.checked && new f.BlackWhite());
    };
    $('grayscale').onclick = function() {
      applyFilter(0, this.checked && new f.Grayscale());
    };
    $('average').onclick = function() {
      applyFilterValue(0, 'mode', 'average');
    };
    $('luminosity').onclick = function() {
      applyFilterValue(0, 'mode', 'luminosity');
    };
    $('lightness').onclick = function() {
      applyFilterValue(0, 'mode', 'lightness');
    };
    $('invert').onclick = function() {
      applyFilter(1, this.checked && new f.Invert());
    };
    $('remove-color').onclick = function () {
      applyFilter(2, this.checked && new f.RemoveColor({
          distance: $('remove-color-distance').value,
          color: $('remove-color-color').value,
        }));
    };
    $('remove-color-color').onchange = function() {
      applyFilterValue(2, 'color', this.value);
    };
    $('remove-color-distance').oninput = function() {
      applyFilterValue(2, 'distance', this.value);
    };
    $('sepia').onclick = function() {
      applyFilter(3, this.checked && new f.Sepia());
    };
    $('brightness').onclick = function () {
      applyFilter(5, this.checked && new f.Brightness({
          brightness: parseFloat($('brightness-value').value)
        }));
    };
    $('brightness-value').oninput = function() {
      applyFilterValue(5, 'brightness', parseFloat(this.value));
    };
    $('gamma').onclick = function () {
      var v1 = parseFloat($('gamma-red').value);
      var v2 = parseFloat($('gamma-green').value);
      var v3 = parseFloat($('gamma-blue').value);
      applyFilter(17, this.checked && new f.Gamma({
          gamma: [v1, v2, v3]
        }));
    };
    $('gamma-red').oninput = function() {
      var current = getFilter(17).gamma;
      current[0] = parseFloat(this.value);
      applyFilterValue(17, 'gamma', current);
    };
    $('gamma-green').oninput = function() {
      var current = getFilter(17).gamma;
      current[1] = parseFloat(this.value);
      applyFilterValue(17, 'gamma', current);
    };
    $('gamma-blue').oninput = function() {
      var current = getFilter(17).gamma;
      current[2] = parseFloat(this.value);
      applyFilterValue(17, 'gamma', current);
    };
    $('contrast').onclick = function () {
      applyFilter(6, this.checked && new f.Contrast({
          contrast: parseFloat($('contrast-value').value)
        }));
    };
    $('contrast-value').oninput = function() {
      applyFilterValue(6, 'contrast', parseFloat(this.value));
    };
    $('saturation').onclick = function () {
      applyFilter(7, this.checked && new f.Saturation({
          saturation: parseFloat($('saturation-value').value)
        }));
    };
    $('saturation-value').oninput = function() {
      applyFilterValue(7, 'saturation', parseFloat(this.value));
    };
    $('noise').onclick = function () {
      applyFilter(8, this.checked && new f.Noise({
          noise: parseInt($('noise-value').value, 10)
        }));
    };
    $('noise-value').oninput = function() {
      applyFilterValue(8, 'noise', parseInt(this.value, 10));
    };
    $('pixelate').onclick = function() {
      applyFilter(10, this.checked && new f.Pixelate({
          blocksize: parseInt($('pixelate-value').value, 10)
        }));
    };
    $('pixelate-value').oninput = function() {
      applyFilterValue(10, 'blocksize', parseInt(this.value, 10));
    };
    $('blur').onclick = function() {
      applyFilter(11, this.checked && new f.Blur({
          value: parseFloat($('blur-value').value)
        }));
    };
    $('blur-value').oninput = function() {
      applyFilterValue(11, 'blur', parseFloat(this.value, 10));
    };
    $('sharpen').onclick = function() {
      applyFilter(12, this.checked && new f.Convolute({
          matrix: [  0, -1,  0,
            -1,  5, -1,
            0, -1,  0 ]
        }));
    };
    $('emboss').onclick = function() {
      applyFilter(13, this.checked && new f.Convolute({
          matrix: [ 1,   1,  1,
            1, 0.7, -1,
            -1,  -1, -1 ]
        }));
    };
    $('blend').onclick= function() {
      applyFilter(16, this.checked && new f.BlendColor({
          color: document.getElementById('blend-color').value,
          mode: document.getElementById('blend-mode').value,
          alpha: document.getElementById('blend-alpha').value
        }));
    };

    $('blend-mode').onchange = function() {
      applyFilterValue(16, 'mode', this.value);
    };

    $('blend-color').onchange = function() {
      applyFilterValue(16, 'color', this.value);
    };

    $('blend-alpha').oninput = function() {
      applyFilterValue(16, 'alpha', this.value);
    };

    $('hue').onclick= function() {
      applyFilter(21, this.checked && new f.HueRotation({
          rotation: document.getElementById('hue-value').value,
        }));
    };

    $('hue-value').oninput = function() {
      applyFilterValue(21, 'rotation', this.value);
    };

    $('blend-image').onclick= function() {
      applyFilter(20, this.checked && new f.BlendImage({
          image: fImage,
        }));
    };

    $('blend-image-mode').onchange = function() {
      applyFilterValue(20, 'mode', this.value);
    };
    var imageElement = document.createElement('img');
    imageElement.src = '../assets/printio.png';
    var fImage = new fabric.Image(imageElement);
    fImage.scaleX = 1;
    fImage.scaleY = 1;
    fImage.top = 15;
    fImage.left = 15;
  })();
}

export default connect(mapStateToProps, {submitImage})(Canvas);