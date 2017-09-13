import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getImageCategory, selectCategory, selectImage} from './actions';
import GalleryImage from './galleryImage';

class Gallery extends  Component {
  constructor() {
    super();
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gallery && !this.props.selectedCategory) {
      this.props.getImageCategory(nextProps.gallery[0].Id, nextProps.gallery[0].Url);
    }
  }

  renderCategories(categories) {
    if (categories) {
      return categories.map( (cat) => {
        return(
          <div key={cat.Id}>
            {cat.Name} - {cat.Url}
          </div>
        )
      })
    }
  }

  renderImages() {
    const selectedCategory = this.props.selectedCategory;
    const imageCategories = this.props.imageCategories;

    if (selectedCategory && imageCategories) {
      const category = imageCategories[selectedCategory];
      if (category) {
        const images = category.Images;

        return images.map( img => {
          return(
            <GalleryImage img={img} key={img.Id} onSelectImage={this.handleSelectImage}/>
          );
        });
      }
    }
  }

  handleSelectImage(img) {
    this.props.selectImage(img.id);
  }
  render() {
    const categories = this.props.gallery;
    const imageCategories = this.props.imageCategories;
    return(
      <div>
        <h1>Gallery</h1>
        <div>
          {this.renderCategories(categories)}
        </div>
        <div>
          {this.renderImages()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {gallery, imageCategories, selectedCategory, selectedImage} = state.designer;
  return {gallery, imageCategories, selectedCategory, selectedImage};
};


export default connect(mapStateToProps, {getImageCategory, selectImage})(Gallery);