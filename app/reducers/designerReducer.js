const INITIAL_STATE ={};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'APP_DATA':
      console.log(action.payload);
      const {DesignTemplate} = action.payload;

      return {...state, app: action.payload, template: DesignTemplate};
    default:
      return state;
  }
}