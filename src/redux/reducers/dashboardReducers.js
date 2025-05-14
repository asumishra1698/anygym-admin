import {
  FETCH_DASHBOARD_METRICS_REQUEST,
  FETCH_DASHBOARD_METRICS_SUCCESS,
  FETCH_DASHBOARD_METRICS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: {
    gyms: {
      total: 0,
      active: 0,
      pending: 0,
      rejected: 0,
      approve: 0,
    },
    owners: {
      total: 0,
      active: 0,
      pending: 0,
      rejected: 0,
      inactive: 0,
    },
    area_managers: {
      total: 0,
      active: 0,
      pending: 0,
      rejected: 0,
      inactive: 0,
    },
  },
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_METRICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DASHBOARD_METRICS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_DASHBOARD_METRICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;