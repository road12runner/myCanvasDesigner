import axios from 'axios';

const getApp = () => {
  return (dispatch) => {
    return axios.get('http://localhost:9999/pcs/api/v1/designers/1b283d18-c2bf-4ba4-990a-63d5959f2750').then( (response) =>  {
      dispatch({type: 'APP_DATA', payload: response.data});
    });
  }
};

const getGallery = (url) => {

  return (dispatch) => {
    return axios.get(url).then( (response) =>  {
      dispatch({type: 'GALLERY_DATA', payload: response.data});
    });
  }
};

export  const getAppData = () => {
  return (dispatch, getState) => {
    return dispatch(getApp()).then( () => {
      const state  = getState();
      const galleryUrl = state.designer.app.Galleries.URL;
      return dispatch(getGallery(galleryUrl));
    })
  }
};


export const getImageCategory = (catId,url) => {
  console.log('getImageCategory', catId, url);

  return (dispatch) => {

    dispatch(selectCategory(catId));

    return axios.get(url).then( (response) =>  {
      console.log('gallery', response.data);
      dispatch({type: 'IMAGE_CATEGORY_DATA', payload: response.data});
    });
  }
};


export const selectCategory = (catId) => {
  return {type: 'SELECTED_CATEGORY', payload: catId};
};


export const selectImage = (imgId) => {
  return {type: 'SELECTED_IMAGE', payload: imId};
};