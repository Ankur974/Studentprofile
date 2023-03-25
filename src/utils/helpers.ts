import { MixpanelTracker } from "./mixpanelInstance";

//analytics
export const trackEvent = async (event: string, payload = {}) => {
  const blockAnalytics = localStorage.getItem("block_analytics");

  if (blockAnalytics === "true") return;

  // const tokenHeaders = await getTokenHeaders();
  const updatedPayload = { ...payload };
  // if (
  //   tokenHeaders &&
  //   tokenHeaders["x-company-profile-name"] &&
  //   tokenHeaders["x-company-profile-uuid"]
  // ) {
  //   updatedPayload.company_profile_name =
  //     tokenHeaders["x-company-profile-name"];
  //   updatedPayload.company_profile_uuid =
  //     tokenHeaders["x-company-profile-uuid"];
  // }
  MixpanelTracker.getInstance().trackEvent(event, updatedPayload);
};