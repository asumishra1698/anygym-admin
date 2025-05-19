//Local
export const MEDIA_URL = "http://localhost:65273";
export const BASE_URL = "http://localhost:65273/api";

//Live
// export const BASE_URL = "https://anygym-api.iqsetters.com/api";
// export const MEDIA_URL = "https://anygym-api.iqsetters.com";

export const ADMIN_LOGIN_URL = "/admin/login";
export const ADMIN_DASHBOARD_URL = "/admin/getAdminDashboardStats";
export const STAFF_LOGIN_URL = "/staff/login-with-pass";
export const OTP_GENRATE_URL = "/staff/otp-generate-pass-reset";
export const OTP_VERIFY_URL = "/staff/otp-verify-pass-reset";
export const RESET_PASSWORD_URL = "/staff/reset-password";

export const GYM_URL = "/admin/gyms";
export const APPROVED_GYM_REQUEST_URL = "/staff/gym-request-approved";
export const GYM_BY_ID_URL = "/staff/getGymData";
export const PENDING_GYM_REQUEST_URL = "/staff/gym-request-pending";
export const APPROVE_AND_REJECT_GYM_REQUEST_URL = "/staff/approve-gym/";

export const ADD_GYM_URL = "/admin/gym/store";

export const AMENTIY_URL = "/admin/amenities";
export const DELETEAMENTY_URL = "/admin/deleteAmenities";

export const AREA_MANAGER_URL = "/admin/staff";
export const UPDATE_MANAGER_DETAILS_URL = "/staff/manager/update";
export const ADD_AREA_MANAGER_URL = "/staff/register";

export const GYM_OWNER_URL = "/owner/getAllOwners";
export const UPDATE_STATUS_OWNER_URL = "/owner/change-status";
export const GYM_OWNER_BY_AREA_MANAGER_URL = "/owner/getOwnersByAreaManager";
export const ADD_GYM_OWNER_URL = "/owner/register";

export const UPLOAD_MEDIA_URL = "/staff/gym/gallery";
export const DELETE_MEDIA_URL = "/staff/gym/deletefile";
export const EXPORT_OWNERS_URL = "/owner/export-owners";
