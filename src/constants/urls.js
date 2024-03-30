export const baseUrl = "https://pamper-backend-production.up.railway.app/";

export const URL = {
  getStore: `${baseUrl}store/getClientStore`,
  getServices: `${baseUrl}service/getAllCategoreisWithServices`,
  getAllShops: `${baseUrl}store/homePageMainSection`,

  //auth
  sendOtp: `${baseUrl}client/sendOtp`,
  submitOtp: `${baseUrl}client/verifyOtp`,
  createUser: `${baseUrl}client/createUser`,
  refreshToken: `${baseUrl}client/refreshToken`,
  loginWithGoogle: `${baseUrl}auth/google/callback`,

  approveVoucher: `${baseUrl}client/approveSpinAndWheelReward`,
};
