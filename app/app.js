
var canvas = new fabric.Canvas('canvas');
canvas. preserveObjectStacking = true;

// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

var template;
var backgroundImage;


var rect1= new fabric.Rect({
  left:10,
  top:10,
  width: 30,
  height:30,
  strokeWidth: 1,
  stroke: 'rgba(100,200,200,0.5)',
  fill: 'rgba(0,0,0,0)'
});

canvas.add(rect1);



function roundedCorners(ctx) {
  var rect = new fabric.Rect({
    left:100,
    top:100,
    rx:20 / this.scaleX,
    ry:20 / this.scaleY,
    width:this.width,
    height:this.height,
    strokeWidth: 5,
    stroke: 'rgba(100,200,200,0.5)',
    fill: 'rgba(255,255,255,0)'
  });
  rect._render(ctx, false);
}

fabric.Image.fromURL('./96039.Jpg', function(oImg){
  oImg.scaleToHeight(300);
  oImg.scaleToWidth(300);
  oImg.set({ left: 80, top: 80, opacity: 0.9 });
  canvas.add(oImg);
  backgroundImage = oImg;
  console.log('backround  loaded');
  _loadTemplate();
});

function _loadTemplate() {
  fabric.Image.fromURL('./template.png',  function(oImg) {
    oImg.scaleToHeight(153);
    oImg.scaleToWidth(261);

    // oImg.hasBorders = false;
    // oImg.hasControls = false;
    // oImg.set('selectable', false);
    // oImg.lockMovementX = true;
    // oImg.lockMovementY = true;
    oImg.set({
      left: 100,
      top: 100,
      fill: 'rgba(0,0,0,0)',
      stroke:'red',
      strokeWidth:10
      //clipTo: roundedCorners.bind(oImg),
      // clipTo: function (ctx) {
      //   ctx.arc(0, 0, 300, 0, Math.PI * 2, true);
      // }
    });
    canvas.add(oImg).setActiveObject(oImg);
    template = oImg;

    console.log('template loaded');

  });
}





canvas.on({
  'touch:gesture': function(e) {
    console.log(' Gesture ', canvas.getActiveObject());
  },
  'touch:drag': function(e) {
    //if (canvas.getActiveObject() === backgroundImage) {
    //   console.log('backgroundImage', backgroundImage);
    //   console.log('template', template);
      checkImages(template, backgroundImage);
    //}
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


function  checkImages(img1, img2) {
  //canvas.bringToFront(template);
  //canvas.setActiveObject(template);

  var coords1 =  getCoordinates(img1);
  var coords2 =  getCoordinates(img2);

  // console.log('1', coords1);
  // console.log('2', coords2);
  isInside(coords1, coords2) ? $('#coverage-message').hide() : $('#coverage-message').show();
}

function isInside(inner, outer) {
  return outer.minX <= inner.minX && outer.maxX >= inner.maxX && outer.minY <= inner.minY && outer.maxY >= inner.maxY;
}

function getCoordinates(img) {
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
}


$('#export').click(function() {

  canvas.remove(template);
  var dataURL = canvas.toDataURL({
    format: 'png',
    left: 100,
    top: 100,
    width: 261,
    height:153,
    multiplier: 0.5
  });

  var imgId = new Date().getTime();
  $.ajax('http://localhost:9999/pcs/api/v1/designers/submit/' + imgId, {
    method: 'POST',
    data: {img:  dataURL},
    success: function(){
      console.log('success');
    },
    error: function() {
      console.log('error');
    }
  });

  //console.log('dataUrl', dataURL);
});
