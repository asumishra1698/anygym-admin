import {
  ADD_GYM_REQUEST,
  ADD_GYM_SUCCESS,
  ADD_GYM_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false, 
  gymData: null,  
  error: null,   
};

const addGymReducer = (state = initialState, action) => {  
  switch (action.type) {
    case ADD_GYM_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_GYM_SUCCESS:
      return { ...state, loading: false, gymData: action.payload };

    case ADD_GYM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default addGymReducer;