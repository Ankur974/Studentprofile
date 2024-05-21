export const BASE_URL = "https://pamper-backend-production.up.railway.app/";

export const CDN = "https://assets-pamprazzi.b-cdn.net";

export const URL = {
  getStore: `${BASE_URL}store/getClientStore`,
  getServices: `${BASE_URL}service/getAllCategoreisWithServices`,
  getAllShops: `${BASE_URL}store/homePageMainSection`,

  //auth
  sendOtp: `${BASE_URL}client/sendOtp`,
  submitOtp: `${BASE_URL}client/verifyOtp`,
  createUser: `${BASE_URL}client/createUser`,
  refreshToken: `${BASE_URL}client/refreshToken`,
  loginWithGoogle: `${BASE_URL}auth/google/callback`,
  loginSuccess: `${BASE_URL}auth/login/success`, //required to get token for google login

  approveVoucher: `${BASE_URL}client/approveSpinAndWheelReward`,

  reviews: `${BASE_URL}rating/rate`,

  getAllRating: `${BASE_URL}rating/getRating`,
  getAllReview: `${BASE_URL}rating/getAllRating`,
};
