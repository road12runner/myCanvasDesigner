

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');
var img = new Image();

img.onload = function(){
  img.crossOrigin = 'anonymous';
  ctx.drawImage(img,0,0); // Or at whatever offset you like
};
img.src = 'http://localhost:9999/API/designers/1b283d18-c2bf-4ba4-990a-63d5959f2750/Images/person.png';


$('#export').click(function() {
  var dataURL = canvas.toDataURL();
  console.log('dataUrl', dataURL);

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
});
