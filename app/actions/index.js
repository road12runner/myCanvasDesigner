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


export const selectImage = (imgId, url) => {
  return {type: 'SELECTED_IMAGE', payload: {imgId, url}};
};

export const updateFilter = (filterId, value) => {
  return {type: 'UPDATE_FILTER', payload: {filterId, value}}
};

export const submitImage = (data) => {
  const url = 'http://localhost:9999/pcs/api/v1/designers/submit/' + new Date().getTime();
  return (dispatch) => {
    return axios.post(url, {img: data}).then( (response) =>  {
      console.log('submit image', response);
      dispatch({type: 'SUBMIT_IMAGE'});
    });
  };
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

};