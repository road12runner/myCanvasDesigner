import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateFilter} from './actions'


class Filters extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;
    const checkbox  = target.type === 'checkbox';

    console.log('filter', id, value);
    this.props.updateFilter(id, value);
  }
  render() {
    const {filters} = this.props;
    console.log('render filters', filters);
    return(
      <div className="controls">
        <h3>Filters:</h3>
        <label>Use WebGl<input type="checkbox" id="webgl" checked={filters.webgl} onChange={this.handleInputChange}/></label>
        <p>
          <label><span>Grayscale:</span> <input type="checkbox" id="grayscale" checked={filters.grayscale} onChange={this.handleInputChange}/></label><br/>
          <label><span>Avg.</span> <input type="radio" id="average" name="grayscale" checked={filters.average} onChange={this.handleInputChange}/></label>
          <label><span>Lum.</span> <input type="radio" id="lightness" name="grayscale" checked={filters.lightness}  onChange={this.handleInputChange}/></label>
          <label><span>Light.</span> <input type="radio" id="luminosity" name="grayscale" checked={filters.luminosity}  onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Invert:</span> <input type="checkbox" id="invert" checked={filters.invert} onChange={this.handleInputChange} /></label>
        </p>
        <p>
          <label>Colormatrix filters:</label>
        </p>
        <p>
          <label><span>Sepia:</span> <input type="checkbox" name="sepia" id="sepia" checked={filters.sepia} onChange={this.handleInputChange}/></label>
        </p>
        <p></p>
        <label><span>Black/White:</span> <input type="checkbox" id="blackwhite" checked={filters.blackwhite} onChange={this.handleInputChange}/></label>

        <p>
          <label><span>Brownie:</span> <input type="checkbox" id="brownie" checked={filters.brownie} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Vintage:</span> <input type="checkbox" id="vintage" checked={filters.vintage} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Kodachrome:</span> <input type="checkbox" id="kodachrome" checked={filters.kodachrome} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Technicolor:</span> <input type="checkbox" id="technicolor" checked={filters.technicolor} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Polaroid:</span> <input type="checkbox" id="polaroid" checked={filters.polaroid} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Remove color:</span> <input type="checkbox" id="removeColor" checked={filters.removeColor} onChange={this.handleInputChange}/></label><br/>
          <label>Color: <input type="color" id="removeColorColor"  value={filters.removeColorColor} onChange={this.handleInputChange}/></label><br/>
          <br/>
          <label>Distance: <input type="range" id="removeColorDistance"  min="0" max="1" step="0.01"  value={filters.removeColorDistance} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Brightness:</span> <input type="checkbox" id="brightness" checked={filters.brightness} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Value: <input type="range" id="brightnessValue"  min="-1" max="1" step="0.003921" value={filters.brightnessValue} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Gamma:</span> <input type="checkbox" id="gamma" checked={filters.gamma} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Red: <input type="range" id="gammaRed"  min="0.2" max="2.2" step="0.003921" value={filters.gammaRed} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Green: <input type="range" id="gammaGreen"  min="0.2" max="2.2" step="0.003921" value={filters.gammaGreen} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Blue: <input type="range" id="gammaBlue" min="0.2" max="2.2" step="0.003921" value={filters.gammaBlue} onChange={this.handleInputChange}/></label>

        </p>
        <p>
          <label><span>Contrast:</span> <input type="checkbox" id="contrast" checked={filters.contrast} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Value: <input type="range" id="contrastValue"  min="-1" max="1" step="0.003921" value={filters.contrastValue} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Saturation:</span> <input type="checkbox" id="saturation" checked={filters.saturation} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Value: <input type="range" id="saturationValue"  min="-1" max="1" step="0.003921" value={filters.saturationValue} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Hue:</span> <input type="checkbox" id="hue" checked={filters.hue} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Value: <input type="range" id="hueValue"  min="-2" max="2" step="0.002" value={filters.hueValue} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Noise:</span> <input type="checkbox" id="noise" checked={filters.noise} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Value: <input type="range" id="noiseValue" min="0" max="1000" value={filters.noiseValue} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Pixelate</span> <input type="checkbox" id="pixelate" checked={filters.pixelate} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Value: <input type="range" id="pixelateValue"  min="2" max="20"  value={filters.pixelateValue} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Blur:</span> <input type="checkbox" id="blur" checked={filters.blur} onChange={this.handleInputChange}/></label>
          <br/>
          <label>Value: <input type="range" id="blurValue" min="0" max="1" step="0.01" value={filters.blurValue} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Sharpen:</span> <input type="checkbox" id="sharpen" checked={filters.sharpen} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Emboss:</span> <input type="checkbox" id="emboss" checked={filters.emboss} onChange={this.handleInputChange}/></label>
        </p>
        <p>
          <label><span>Blend Color:</span> <input type="checkbox" id="blend"  checked={filters.blend} onChange={this.handleInputChange}/></label>
          <br/>
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
          <br/>
          <label>Color: <input type="color" id="blendColor" value={filters.blendColor} onChange={this.handleInputChange}/></label><br/>
          <label>Alpha: <input type="range" id="blendAlpha" min="0" max="1"  step="0.01" value={filters.blendAlpha} onChange={this.handleInputChange}/></label><br/>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {filters :  state.filters};
};
export default connect(mapStateToProps, {updateFilter})(Filters);