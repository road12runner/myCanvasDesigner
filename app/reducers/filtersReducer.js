// const INITIAL_STATE ={
//   webgl : {on : true},
//   brownie: {id: 4, on: false},
//   vintage: {id: 9, on: false},
//   technicolor: {id: 14, on: false},
//   polaroid: {id: 15, on: false},
//   kodachrome: {id: 18, on: false},
//   blackwhite: {id: 19, on: false},
//   grayscale: {id: 0, on: false},
//   average: {id: 0, on: false, mode: 'average'},
//   luminosity: {id: 0, on: false, mode: 'luminosity'},
//   lightness: {id: 0, on: false, mode: 'lightness'},
//   invert: {id: 1, on: false},
//   removeColor: {id: 2, on: false, distance: 0, color: '' },
//   sepia: {id: 3, on: false},
//   brightness: {id: 5, on: false, brightnessValue: ''},
//   gamma: {id: 17, on: false, red: '', green: '', blue: ''},
//   contrast: {id: 6, on: false, value: ''},
//   saturation: {id: 7, on: false, value: ''},
//   noise: {id: 8, on: false, value:''},
//   blur: {id: 11, on: false, value: ''},
//   pixelate: {id: 10, on: false, value: ''},
//   emboss: {id: 13, on: false},
//   blend: {id: 16, on: false, color: '', mode: '', alpha:''},
//   hue: {id: 21, on: false, value: ''},
// };


const INITIAL_STATE ={
  webgl : true,
  brownie: false,
  vintage: false,
  technicolor: false,
  polaroid: false,
  kodachrome: false,
  blackwhite: false,
  grayscale: false,
  average: false,
  luminosity: false,
  lightness: false,
  invert: false,
  removeColor: false,
  removeColorDistance: '0.2',
  removeColorColor: '#00f900',
  sepia: false,
  brightness: false, brightnessValue: '0.1',
  gamma: false, gammaRed: '1', gammaGreen: '1', gammaBlue: '1',
  contrast: false, contractValue: '0',
  saturation: false, saturationValue: '0',
  noise: false, noiseValue:'100',
  blur: false, bluerValue: '0.1',
  sharpen: false,
  pixelate: false, pixelateValue: '4',
  emboss: false,
  blend: false, blendColor: '#00f900', blendMode: 'add', blendAlpha:'1',
  hue: false, hueValue: '0'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      const {filterId, value} = action.payload;
      state[filterId] = value;
      const newState =  {...state};
      return newState;
    default:
      return state;
  }
}

const setFilters = (filterId, value, state) => {
  switch(filterId) {
    case 'webgl':
    case 'brownie':
    case 'vintage':
    case 'technicolor':
    case 'polaroid':
    case 'kodachrome':
    case 'blackwhite':
    case 'grayscale':
    case 'invert':
    case 'removeColor':
    case 'sepia':
    case 'gamma':
    case 'contrast':
    case 'saturation':
    case 'brightness':
    case 'brightness':
      state[filterId] = {...state.filterId, on: value};
      return {...state};
    default:
      return state;
  }
};

