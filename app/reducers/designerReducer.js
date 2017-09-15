const INITIAL_STATE ={ imageCategories: {}, selectedCategory: null, selectedImage: null, currentStep: 0};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'APP_DATA':
      console.log(action.payload);
      const {DesignTemplate, Galleries} = action.payload;
      return {...state, app: action.payload, template: DesignTemplate};
    case 'GALLERY_DATA':
      return {...state , gallery: action.payload};
    case 'SELECTED_CATEGORY':
      return {...state, selectedCategory: action.payload};
    case 'SELECTED_IMAGE':
      return {...state, selectedImage: action.payload};
    case 'IMAGE_CATEGORY_DATA':
      console.log('payload', action.payload);
      const category = action.payload;
      let imageCategories = {...state.imageCategories};
      imageCategories[category.Id] = category;
      return {...state , imageCategories};
    case 'NEXT_STEP':
      return {...state, currentStep: state.currentStep +1 };
    case 'PREVIOUS_STEP':
        return {...state, currentStep: state.currentStep - 1 };
    default:
      return state;
  }

}