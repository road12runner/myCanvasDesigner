import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateFilter, nextStep, previousStep} from './actions'
import classNames from 'classnames';

class Filters extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    const target = event.target;
    const id = target.id;
    console.log('filter', id, this.props.filters[id]);
    this.props.updateFilter(id, !this.props.filters[id]);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;
    const checkbox  = target.type === 'checkbox';

    console.log('filter', id, value);
    this.props.updateFilter(id, value);
  }

  buttonClassName(buttonId) {
    return classNames('btn', {'btn-default' : !buttonId, 'btn-success' : buttonId})
  }

  render() {
    const {filters} = this.props;
    return(
      <div className="controls">
        <div>
          <h3 style={{display: 'inline-block'}}>Filters:</h3>
          <button className='btn btn-primary btn-right' onClick={()=> this.props.nextStep()}>Next</button>
          <button className='btn btn-primary btn-right' onClick={()=> this.props.previousStep()}>Back</button>
        </div>
        <div className="buttons-box">
          <button id="invert" className={this.buttonClassName(filters.invert)} onClick={this.handleButtonClick}>Invert</button>
          <button id="sepia" className={this.buttonClassName(filters.sepia)} onClick={this.handleButtonClick}>Sepia</button>
          <button id="blackwhite" className={this.buttonClassName(filters.blackwhite)} onClick={this.handleButtonClick}>Black/White</button>
          <button id="brownie" className={this.buttonClassName(filters.brownie)} onClick={this.handleButtonClick}>Brownie</button>
          <button id="vintage" className={this.buttonClassName(filters.vintage)} onClick={this.handleButtonClick}>Vintage</button>
          <button id="kodachrome" className={this.buttonClassName(filters.kodachrome)} onClick={this.handleButtonClick}>Kodachrome</button>
          <button id="technicolor" className={this.buttonClassName(filters.technicolor)} onClick={this.handleButtonClick}>Technicolor</button>
          <button id="polaroid" className={this.buttonClassName(filters.polaroid)} onClick={this.handleButtonClick}>Polaroid</button>
        </div>
        <div className="buttons-box border-box inline-box">
          <button id="grayscale" className={this.buttonClassName(filters.grayscale)} onClick={this.handleButtonClick}>Grayscale</button>
          <span>Avg.</span> <input type="radio" className="radio" id="average" name="grayscale" checked={filters.average} onChange={this.handleInputChange}/>
          <span>Lum.</span> <input type="radio" className="radio"id="luminosity" name="grayscale" checked={filters.luminosity}  onChange={this.handleInputChange}/>
          <span>Light.</span> <input type="radio" className="radio"id="lightness" name="grayscale" checked={filters.lightness}  onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box border-box inline-box">
          <button id="removeColor" className={this.buttonClassName(filters.removeColor)} onClick={this.handleButtonClick}>Remove color</button>
          <label>Color: <input type="color" id="removeColorColor"  value={filters.removeColorColor} onChange={this.handleInputChange}/></label>
          <label>Distance: <input type="range" id="removeColorDistance"  min="0" max="1" step="0.01"  value={filters.removeColorDistance} onInput={this.handleInputChange}/></label>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="brightness" className={this.buttonClassName(filters.brightness)} onClick={this.handleButtonClick}>Brightness</button>
          <input type="range" id="brightnessValue"  min="-1" max="1" step="0.003921" value={filters.brightnessValue} onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="gamma" className={this.buttonClassName(filters.gamma)} onClick={this.handleButtonClick}>Gamma</button>
          <label>Red: <input type="range" id="gammaRed"  min="0.2" max="2.2" step="0.003921" value={filters.gammaRed} onChange={this.handleInputChange}/></label>
          <label>Green: <input type="range" id="gammaGreen"  min="0.2" max="2.2" step="0.003921" value={filters.gammaGreen} onChange={this.handleInputChange}/></label>
          <label>Blue: <input type="range" id="gammaBlue" min="0.2" max="2.2" step="0.003921" value={filters.gammaBlue} onChange={this.handleInputChange}/></label>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="contrast" className={this.buttonClassName(filters.contrast)} onClick={this.handleButtonClick}>Contrast</button>
          <input type="range" id="contrastValue"  min="-1" max="1" step="0.003921" value={filters.contrastValue} onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="saturation" className={this.buttonClassName(filters.saturation)} onClick={this.handleButtonClick}>Saturation</button>
          <input type="range" id="saturationValue"  min="-1" max="1" step="0.003921" value={filters.saturationValue} onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="hue" className={this.buttonClassName(filters.hue)} onClick={this.handleButtonClick}>Hue</button>
          <input type="range" id="hueValue"  min="-2" max="2" step="0.002" value={filters.hueValue} onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="noise" className={this.buttonClassName(filters.noise)} onClick={this.handleButtonClick}>Noise</button>
          <input type="range" id="noiseValue" min="0" max="1000" value={filters.noiseValue} onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="pixelate" className={this.buttonClassName(filters.pixelate)} onClick={this.handleButtonClick}>Pixelate</button>
          <input type="range" id="pixelateValue"  min="2" max="20"  value={filters.pixelateValue} onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="blur" className={this.buttonClassName(filters.blur)} onClick={this.handleButtonClick}>Blur</button>
          <input type="range" id="blurValue" min="0" max="1" step="0.01" value={filters.blurValue} onChange={this.handleInputChange}/>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="sharpen" className={this.buttonClassName(filters.sharpen)} onClick={this.handleButtonClick}>Sharpen</button>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="emboss" className={this.buttonClassName(filters.emboss)} onClick={this.handleButtonClick}>Emboss</button>
        </div>
        <div className="buttons-box  border-box inline-box">
          <button id="blend" className={this.buttonClassName(filters.blend)} onClick={this.handleButtonClick}>Blend Color</button>
          <label>Mode:</label>
          <select id="blendMode" name="blend-mode" value={filters.blendMode} onChange={this.handleInputChange}>
            <option value="add">Add</option>
            <option value="diff">Diff</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="screen">Screen</option>
            <option value="lighten">Lighten</option>
            <option value="darken">Darken</option>
            <option value="overlay">Overlay</option>
            <option value="exclusion">Exclusion</option>
            <option value="tint">Tint</option>
          </select>
          <label>Color: <input type="color" id="blendColor" value={filters.blendColor} onChange={this.handleInputChange}/></label><br/>
          <label>Alpha: <input type="range" id="blendAlpha" min="0" max="1"  step="0.01" value={filters.blendAlpha} onChange={this.handleInputChange}/></label><br/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {filters :  state.filters};
};
export default connect(mapStateToProps, {updateFilter, previousStep, nextStep})(Filters);