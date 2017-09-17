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
      if (filterId === 'average') {
        state.lightness = false;
        state.luminosity = false;
      } else if (filterId === 'luminosity') {
        state.average = false;
        state.lightness = false;
      } else if (filterId === 'lightness') {
        state.average = false;
        state.luminosity = false;
      }
      const newState =  {...state};
      return newState;
    default:
      return state;
  }
};

