import axios from 'axios';

export  const getAppData = () => {
  return (dispatch) => {
    axios.get('http://localhost:9999/pcs/api/v1/designers/1b283d18-c2bf-4ba4-990a-63d5959f2750').then( response =>  dispatch({type: 'APP_DATA', payload: response.data}));
  }
};