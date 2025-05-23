// Auth Actions
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Forgot Password Actions
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

// Verify OTP Actions
export const VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";

// Reset Password Actions
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const FETCH_DASHBOARD_METRICS_REQUEST =
  "FETCH_DASHBOARD_METRICS_REQUEST";
export const FETCH_DASHBOARD_METRICS_SUCCESS =
  "FETCH_DASHBOARD_METRICS_SUCCESS";
export const FETCH_DASHBOARD_METRICS_FAILURE =
  "FETCH_DASHBOARD_METRICS_FAILURE";

// Gym Actions
export const ADD_GYM_REQUEST = "ADD_GYM_REQUEST";
export const ADD_GYM_SUCCESS = "ADD_GYM_SUCCESS";
export const ADD_GYM_FAILURE = "ADD_GYM_FAILURE";

export const APPROVE_GYM_REQUEST = "APPROVE_GYM_REQUEST";
export const APPROVE_GYM_SUCCESS = "APPROVE_GYM_SUCCESS";
export const APPROVE_GYM_FAILURE = "APPROVE_GYM_FAILURE";

export const REJECT_GYM_REQUEST = "REJECT_GYM_REQUEST";
export const REJECT_GYM_SUCCESS = "REJECT_GYM_SUCCESS";
export const REJECT_GYM_FAILURE = "REJECT_GYM_FAILURE";

export const UPDATE_GYM_STATUS_REQUEST = "UPDATE_GYM_STATUS_REQUEST";
export const UPDATE_GYM_STATUS_SUCCESS = "UPDATE_GYM_STATUS_SUCCESS";
export const UPDATE_GYM_STATUS_FAILURE = "UPDATE_GYM_STATUS_FAILURE";

export const FETCH_GYMS_REQUEST = "FETCH_GYMS_REQUEST";
export const FETCH_GYMS_SUCCESS = "FETCH_GYMS_SUCCESS";
export const FETCH_GYMS_FAILURE = "FETCH_GYMS_FAILURE";

// Fetch single gym by ID
export const FETCH_GYM_BY_ID_REQUEST = "FETCH_GYM_BY_ID_REQUEST";
export const FETCH_GYM_BY_ID_SUCCESS = "FETCH_GYM_BY_ID_SUCCESS";
export const FETCH_GYM_BY_ID_FAILURE = "FETCH_GYM_BY_ID_FAILURE";

export const FETCH_PENDING_GYMS_REQUEST = "FETCH_PENDING_GYMS_REQUEST";
export const FETCH_PENDING_GYMS_SUCCESS = "FETCH_PENDING_GYMS_SUCCESS";
export const FETCH_PENDING_GYMS_FAILURE = "FETCH_PENDING_GYMS_FAILURE";

export const FETCH_APPROVED_GYMS_REQUEST = "FETCH_APPROVED_GYMS_REQUEST";
export const FETCH_APPROVED_GYMS_SUCCESS = "FETCH_APPROVED_GYMS_SUCCESS";
export const FETCH_APPROVED_GYMS_FAILURE = "FETCH_APPROVED_GYMS_FAILURE";

export const UPLOAD_GALLERY_REQUEST = "UPLOAD_GALLERY_REQUEST";
export const UPLOAD_GALLERY_SUCCESS = "UPLOAD_GALLERY_SUCCESS";
export const UPLOAD_GALLERY_FAILURE = "UPLOAD_GALLERY_FAILURE";

export const DELETE_MEDIA_REQUEST = "DELETE_MEDIA_REQUEST";
export const DELETE_MEDIA_SUCCESS = "DELETE_MEDIA_SUCCESS";
export const DELETE_MEDIA_FAILURE = "DELETE_MEDIA_FAILURE";

// Amenities Actions
export const ADD_AMENITY_REQUEST = "ADD_AMENITY_REQUEST";
export const ADD_AMENITY_SUCCESS = "ADD_AMENITY_SUCCESS";
export const ADD_AMENITY_FAILURE = "ADD_AMENITY_FAILURE";

export const FETCH_AMENITIES_REQUEST = "FETCH_AMENITIES_REQUEST";
export const FETCH_AMENITIES_SUCCESS = "FETCH_AMENITIES_SUCCESS";
export const FETCH_AMENITIES_FAILURE = "FETCH_AMENITIES_FAILURE";

export const UPDATE_AMENITY_REQUEST = "UPDATE_AMENITY_REQUEST";
export const UPDATE_AMENITY_SUCCESS = "UPDATE_AMENITY_SUCCESS";
export const UPDATE_AMENITY_FAILURE = "UPDATE_AMENITY_FAILURE";

export const DELETE_AMENITY_REQUEST = "DELETE_AMENITY_REQUEST";
export const DELETE_AMENITY_SUCCESS = "DELETE_AMENITY_SUCCESS";
export const DELETE_AMENITY_FAILURE = "DELETE_AMENITY_FAILURE";

// Area Manager Actions
export const ADD_AREA_MANAGER_REQUEST = "ADD_AREA_MANAGER_REQUEST";
export const ADD_AREA_MANAGER_SUCCESS = "ADD_AREA_MANAGER_SUCCESS";
export const ADD_AREA_MANAGER_FAILURE = "ADD_AREA_MANAGER_FAILURE";

export const UPDATE_AREA_MANAGER_REQUEST = "UPDATE_AREA_MANAGER_REQUEST";
export const UPDATE_AREA_MANAGER_SUCCESS = "UPDATE_AREA_MANAGER_SUCCESS";
export const UPDATE_AREA_MANAGER_FAILURE = "UPDATE_AREA_MANAGER_FAILURE";

export const FETCH_AREA_MANAGERS_REQUEST = "FETCH_AREA_MANAGERS_REQUEST";
export const FETCH_AREA_MANAGERS_SUCCESS = "FETCH_AREA_MANAGERS_SUCCESS";
export const FETCH_AREA_MANAGERS_FAILURE = "FETCH_AREA_MANAGERS_FAILURE";

export const FETCH_AREA_MANAGER_DETAILS_REQUEST =
  "FETCH_AREA_MANAGER_DETAILS_REQUEST";
export const FETCH_AREA_MANAGER_DETAILS_SUCCESS =
  "FETCH_AREA_MANAGER_DETAILS_SUCCESS";
export const FETCH_AREA_MANAGER_DETAILS_FAILURE =
  "FETCH_AREA_MANAGER_DETAILS_FAILURE";

export const UPDATE_AREA_MANAGER_STATUS_REQUEST =
  "UPDATE_AREA_MANAGER_STATUS_REQUEST";
export const UPDATE_AREA_MANAGER_STATUS_SUCCESS =
  "UPDATE_AREA_MANAGER_STATUS_SUCCESS";
export const UPDATE_AREA_MANAGER_STATUS_FAILURE =
  "UPDATE_AREA_MANAGER_STATUS_FAILURE";

// Gym Owner Actions
export const FETCH_GYM_OWNERS_REQUEST = "FETCH_GYM_OWNERS_REQUEST";
export const FETCH_GYM_OWNERS_SUCCESS = "FETCH_GYM_OWNERS_SUCCESS";
export const FETCH_GYM_OWNERS_FAILURE = "FETCH_GYM_OWNERS_FAILURE";

export const ADD_GYM_OWNER_REQUEST = "ADD_GYM_OWNER_REQUEST";
export const ADD_GYM_OWNER_SUCCESS = "ADD_GYM_OWNER_SUCCESS";
export const ADD_GYM_OWNER_FAILURE = "ADD_GYM_OWNER_FAILURE";

export const UPDATE_GYM_OWNER_STATUS_REQUEST =
  "UPDATE_GYM_OWNER_STATUS_REQUEST";
export const UPDATE_GYM_OWNER_STATUS_SUCCESS =
  "UPDATE_GYM_OWNER_STATUS_SUCCESS";
export const UPDATE_GYM_OWNER_STATUS_FAILURE =
  "UPDATE_GYM_OWNER_STATUS_FAILURE";

// Export Data Actions
export const EXPORT_OWNER_DATA_REQUEST = "EXPORT_OWNER_DATA_REQUEST";
export const EXPORT_OWNER_DATA_SUCCESS = "EXPORT_OWNER_DATA_SUCCESS";
export const EXPORT_OWNER_DATA_FAILURE = "EXPORT_OWNER_DATA_FAILURE";

export const EXPORT_GYM_DATA_REQUEST = "EXPORT_GYM_DATA_REQUEST";
export const EXPORT_GYM_DATA_SUCCESS = "EXPORT_GYM_DATA_SUCCESS";
export const EXPORT_GYM_DATA_FAILURE = "EXPORT_GYM_DATA_FAILURE";

export const EXPORT_AM_DATA_REQUEST = "EXPORT_AM_DATA_REQUEST";
export const EXPORT_AM_DATA_SUCCESS = "EXPORT_AM_DATA_SUCCESS";
export const EXPORT_AM_DATA_FAILURE = "EXPORT_AM_DATA_FAILURE";



// User Actions
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

