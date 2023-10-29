import { PSYCHIATRIST, COUPLE_THERAPIST, THERAPIST, COACH } from "@constants";
import Bugsnag from "@bugsnag/js";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { moengage_events } from "@metadata/events/moengage";
import { getTokenHeaders } from "../axiosInstance";
import * as storage from "@utils/storageFactory";
import { openMap } from "./interfaces";
import { MixpanelTracker } from "../mixpanelInstance";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { communityUrl } from "@constants/config";

dayjs.extend(advancedFormat);

// Limit String
export const limitString = (string = "", limit = 40) => {
  return string?.slice(0, limit) + (string?.length > limit ? "..." : "");
};

//analytics
export const trackEvent = async ({ event, payload }) => {
  const blockAnalytics = storage.local.getItem("block_analytics");
  const skipAnalytics = storage.session.getItem("skip_analytics");

  if (blockAnalytics === "true" || skipAnalytics === "true") return;

  const tokenHeaders = await getTokenHeaders();
  const updatedPayload = { ...payload };
  if (
    tokenHeaders &&
    tokenHeaders["x-company-profile-name"] &&
    tokenHeaders["x-company-profile-uuid"]
  ) {
    updatedPayload.company_profile_name =
      tokenHeaders["x-company-profile-name"];
    updatedPayload.company_profile_uuid =
      tokenHeaders["x-company-profile-uuid"];
  }

  // Needed for partner organisations where user is not authenticated, so these details won't be available in tokenHeaders
  let companyDetails;
  try {
    companyDetails = JSON.parse(storage.local.getItem("company_details"));
  } catch (err) {}

  if (companyDetails) {
    updatedPayload.company_profile_name = companyDetails.name;
    updatedPayload.company_profile_uuid = companyDetails.uuid;
  }

  const growthbookDeviceId = storage.local.getItem("deviceId");
  if (growthbookDeviceId) {
    updatedPayload.growthbook_device_id = growthbookDeviceId;
  }

  MixpanelTracker.getInstance().trackEvent({ event, payload: updatedPayload });
  if (moengage_events.includes(event)) {
    try {
      await Moengage?.track_event(event, updatedPayload);
    } catch (error) {
      console.log("error in this moengage event ", error);
      Bugsnag.notify(error);
    }
  }
};

export const trackGTMEvent = eventPayload =>
  window?.dataLayer?.push(eventPayload);

export const formatSlotTime = slot => {
  const splitTime = slot?.split(":");
  const hours = splitTime?.[0];
  const mins = splitTime?.[1];

  return hours >= 12
    ? `${hours % 12 === 0 ? 12 : hours % 12}:${mins} PM`
    : `${slot} AM`;
};

//converts 24hrs time to 12 hrs
//eg 13:20--->1:20PM OR 22:22--->11:22PM
//input type & output typeof string
export const timeConvertor = time => {
  if (time.length > 1) {
    var timeString = time;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? "AM" : "PM";
    timeString = h + timeString.substr?.(2, 3) + " " + ampm;
    return timeString;
  }
};

export const decodeBase64 = encoded => {
  let decoded = {};
  try {
    let encodedBinary = Buffer.from(encoded, "base64").toString();
    const decodedToken = decodeURI(encodedBinary);
    decoded = JSON.parse(decodedToken);
  } catch (err) {
    console.log("Error while decoding data", err);
  } finally {
    return decoded;
  }
};

export const decryptMessage = (encryptedMessage, decryptionKey) => {
  try {
    let textArr = encryptedMessage.split("");
    const iv = textArr.splice(0, 32).join("");
    const ct = textArr.join("");

    let encryptedText = Buffer.from(ct, "hex");

    let decipher = createDecipheriv(
      "aes-256-cbc",
      decryptionKey,
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    Bugsnag.notify(err);
  }
};

export const encryptMessage = (text, decryptionKey) => {
  try {
    // generate iv byte array
    const iv = randomBytes(16);

    let cipher = createCipheriv("aes-256-cbc", decryptionKey, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex").concat(encrypted.toString("hex"));
  } catch (err) {
    Bugsnag.notify(err);
  }
};

export const isMobile = () => {
  if (window.innerWidth < 768) {
    return true;
  }
  return false;
};
/**
 * Checks if a corporate (b2b) user has verified their email.
 * If email is not verified, treat the user as regular b2c user.
 */
export const isVerifiedCorporateUser = user => {
  if (!user || !user?.usertype) return false;
  return user?.usertype !== "patient" && !!user?.is_verified;
};

export const currentFlow = (value, sessionType) => {
  let flow;
  if (sessionType) {
    flow =
      value === PSYCHIATRIST
        ? "psychiatry"
        : value === THERAPIST && sessionType === "single"
        ? "therapy"
        : value === COACH
        ? "coach"
        : "couples";
  } else {
    flow =
      value === PSYCHIATRIST
        ? "psychiatry"
        : value === THERAPIST
        ? "therapy"
        : value === COACH
        ? "coach"
        : value === COUPLE_THERAPIST
        ? "couples"
        : undefined;
  }

  return flow;
};

export const checkObjEmpty = (obj, filterCondition1, filterCondition2 = "") => {
  if (!obj) return;
  let sum = 0;
  const keys = Object.keys(obj);
  keys
    .filter(key => key !== filterCondition1 && key !== filterCondition2)
    .forEach(key => {
      sum += obj[key]?.length;
    });

  return Object.keys(obj)?.length === 0 || sum === 0;
};

export const getProviderForAnalytics = (
  user,
  coupleTherapist,
  providerType,
  selectedPackage,
  provider,
  showProviderInfo = true
) => {
  const packagePayload = {
    packaging_condition: user?.package?.package?.info?.analytics?.package_type,
    package_type: user?.package?.package?.info?.analytics?.package_sub_type,
  };
  const noProviderAssigned =
    !user?.mytherapist && !user?.mypsychiatrist && !user?.package_coach_id;
  let providerPayload = {};
  if (noProviderAssigned) {
    // Here we will check if selectedPackage is available then the providerType will be picked from selectedpackage else we will check for providertype.
    const type =
      (selectedPackage?.org_package_for === "package_coach"
        ? "coach"
        : selectedPackage?.org_package_for === "therapy"
        ? "therapist"
        : "psychiatrist") ||
      (providerType === "coach"
        ? "coach"
        : providerType === "psychiatrist"
        ? "psychiatry"
        : "therapy");

    if (showProviderInfo) {
      providerPayload = {
        [`${type}_name`]: provider?.firstname + " " + provider?.lastname,
        [`${type}_uuid`]: provider?.uuid,
      };
    }
    providerPayload = {
      ...providerPayload,
      // Here we will check if selectedPackage is available then the flow will be picked based on selectedpackage.org_package_for else we will check for type.
      flow:
        (selectedPackage?.org_package_for === "package_coach"
          ? "coach"
          : selectedPackage?.org_package_for) ||
        (type === "coach"
          ? "coach"
          : type === "psychiatrist"
          ? "psychiatry"
          : "therapy"),
      provider_type:
        selectedPackage?.org_package_for === "package_coach"
          ? "coach"
          : providerType,
    };
  } else {
    if (showProviderInfo) {
      providerPayload = {
        [`${providerType}_name`]:
          provider?.firstname + " " + provider?.lastname,
        [`${providerType}_uuid`]: provider?.uuid,
      };
    }
    providerPayload = {
      ...providerPayload,
      flow: coupleTherapist
        ? "couples"
        : providerType === "psychiatrist"
        ? "psychiatry"
        : "therapy",
      provider_type: providerType,
    };
  }
  return {
    ...packagePayload,
    intake_session:
      selectedPackage?.org_package_for !== "package_coach" &&
      user.is_package_client &&
      noProviderAssigned &&
      user?.package?.package?.info?.id !== 3,
    ...providerPayload,
  };
};

export const getEventName = (selectedPackage, string) => {
  let type =
    selectedPackage?.org_package_for === "package_coach"
      ? "coach"
      : selectedPackage?.org_package_for === "therapy"
      ? "therapist"
      : "psychiatrist";
  return `${type}${string}`;
};

export const handleMapOpen = (latitude, longitude, label) => {
  // opens map for locations, google maps on android and web, apple maps on ios
  // latitude: string, longitude: string, label: string
  try {
    openMap(latitude, longitude, label);
    if (window.Android) {
      window.Android.openMap(latitude, longitude, label);
    } else if (window.ReactNativeWebView) {
      const mapUrl = `http://maps.apple.com/?ll=${latitude},${longitude}`;
      window.ReactNativeWebView.postMessage(`openLink,${mapUrl}`);
    } else {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`
      );
    }
  } catch (err) {
    console.log(err, "Error in opening map");
    Bugsnag.notify(err);
  }
};

export const getYoutubeVideoId = url => {
  try {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "invalid";
    }
  } catch (err) {
    Bugsnag.notify(err);
  }
};

export const numbersOnly = e => {
  if (
    (e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 96 && e.keyCode <= 105) ||
    e.keyCode === 8
  ) {
    return false;
  } else {
    e.preventDefault();
  }
};

export const copyToClipboard = stringToCopy => {
  navigator?.clipboard
    ?.writeText(stringToCopy)
    ?.catch(() => window?.alert?.("Unable to copy"));
};

export const encodeQueryData = (data = {}) => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

// returns true if string is falsy || undefined || null
export const isStringNullable = strToCheck =>
  !strToCheck || strToCheck === "undefined" || strToCheck === "null";

export const renderNextSlotDay = (dateTime, format = "D MM") => {
  const isSlotForTomorrow = new Date(dateTime).getDate() - new Date().getDate();

  const dayOfNextAvailableDate = dayjs(dateTime).isSame(dayjs(), "day")
    ? "Today"
    : isSlotForTomorrow === 1
    ? "Tomorrow"
    : dayjs(dateTime).format(format);

  return dayOfNextAvailableDate;
};

export const openLink = link => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(`openLink,${link}`);
  } else if (window.Android) {
    window.Android.openLink(link);
  } else {
    window.open(link, "_blank");
  }
};

export const openLinkInSameWindow = link => {
  // Opens link in same tab in android/ios, opens in new tab for web
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(`openLink,${link}`);
  } else if (window.Android) {
    window.Android.openLinkInSameWindow(link);
  } else {
    window.open(link, "_blank");
  }
};

/**
 *
 * @param {String} link
 * @param {Object} obj
 * @param {String} queryString
 * @returns {String} url with appended query parameters
 */

const getAppendedUrl = (link, obj, queryString) => {
  let url = link;
  Object.entries(obj).forEach(([key, value], index) => {
    if (queryString?.indexOf(key) == -1) {
      if (index === 0 && !queryString) url += `/?${key}=${value}`;
      else url += `&${key}=${value}`;
    }
  });
  return url;
};

/**
 *
 * @param {String} link
 * This function is a wrapper for the window.open function
 * This is append the UTM params available in the storage.
 */
export const windowOpenFn = link => {
  let queryString = "";
  if (link.split("?").length > 0) {
    queryString = link.split("?")[1];
  }
  let url = link;

  let ad_user_params = storage.local.getItem("ad_user_params");

  if (!!ad_user_params) {
    ad_user_params = JSON.parse(ad_user_params);
    /**
     * Looping over the ad_user_params to append the queries to the url
     */
    url = getAppendedUrl(link, ad_user_params, queryString);
  }

  // TODO: VS to revisit this
  // if (window.ReactNativeWebView) {
  //   window.ReactNativeWebView.postMessage(`openLink,${url}`);
  // } else if (window.Android) {
  //   window.Android.openLink(url);
  // } else {
  //   window.open(url, "_blank");
  // }

  window.open(url, "_blank");
};

/**
 * Common function which will be used to return a redirection link
 * the return type could be an object or an url based on the criteria passed (shouldReturnAsObject)
 *
 * @param {String} link
 * @param {Object} query
 * @param {Boolean} shouldReturnAsObject
 * @returns {String | Object} string or object containing redirection pathname and query
 */

export const getRedirectLink = (link, query, shouldReturnAsObject = false) => {
  try {
    let url = link;
    // All the query parameters sent as an object or as query string will be kept as key value pair
    let queryObj = {};
    let queryString = "";
    // If the url sent has query parameters then split it and store it as querystring
    if (url.split("?").length > 1) {
      queryString = url.split("?")[1];
    }
    if (queryString) {
      // parse the queryString and store as key value pair in queryObj by replacing special characters such as ? & etc
      queryObj = JSON.parse(
        '{"' +
          queryString
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
    }
    // Get the UTM params from the storage
    let ad_user_params = storage.local.getItem("ad_user_params");

    // Check if UTM params are present if not check the current url if it contains UTM params
    if (!!ad_user_params) {
      ad_user_params = JSON.parse(ad_user_params);
      queryObj = { ...queryObj, ...ad_user_params };
    } else {
      let currentUrl = window.location.href;
      /** If no UTM params available in the storege then check
       * if the current url has UTM params if yes then only append
       * UTM params removing other parametres if any.
       * This is to avoid the unwanted query parametres passing to the urls
       * Rest all the steps are similar to the one's we have done above
       * */
      if (currentUrl.indexOf("utm_source") != -1) {
        let currentQueryObj = {};
        let currentQueryString = "";
        if (currentUrl.split("?").length > 1) {
          currentQueryString = currentUrl.split("?")[1];
        }
        if (currentQueryString) {
          currentQueryObj = JSON.parse(
            '{"' +
              currentQueryString
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"') +
              '"}'
          );
        }
        // at last append UTM parames to the queryObject
        const mergedObject = Object.assign({}, queryObj, currentQueryObj);
        queryObj = { ...mergedObject };
      }
    }
    // If there is an query object passed to this function then append it to the existing queryObject
    if (!!query) {
      queryObj = { ...queryObj, ...query };
    }

    const company = storage.local.getItem("company");
    if (company) {
      queryObj.company = company;
    }

    /**
     * This is to return as an object containing pathname and query.
     * Mostly for the links and the places from where the redirection
     * is done using router.push or router.replace we will return object
     */
    if (shouldReturnAsObject) {
      return {
        pathname: url.split("?")[0],
        query: queryObj,
      };
    } else {
      /**
       * Looping over the queryObj to append the queries to the url
       */
      url = getAppendedUrl(url, queryObj, queryString);
      return url;
    }
  } catch (error) {
    Bugsnag.notify(error);
  }
};

export const parseJwt = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const isValidEmailDomain = async target => {
  const blacklistedDomains = (await import("@metadata/blacklistedDomains"))
    .default;

  let left = 0;
  let right = blacklistedDomains.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const middleValue = blacklistedDomains[middle];

    if (middleValue === target) {
      return false;
    } else if (middleValue < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return true; // not found
};

export const capitalizeFirstLetter = str =>
  str?.charAt(0)?.toUpperCase() + str?.slice(1);

export const getUrlWithToken = async () => {
  try {
    const token = await getTokenHeaders();
    if (token) {
      const tokenStr = JSON.stringify(token);
      const base64Token = Buffer.from(tokenStr).toString("base64");
      return `${communityUrl}/switch?token=${base64Token}`;
    } else {
      return communityUrl;
    }
  } catch (error) {
    return communityUrl;
  }
};

export const isPartnerDomain = () => {
  try {
    const slug = getPartnerSlug();
    return slug !== null;
  } catch (err) {
    Bugsnag.notify(err);
    return false;
  }
};

export const getPartnerSlug = () => {
  try {
    const url = new URL(window.location.href);
    const subdomain = url?.hostname?.split(".")?.[0];

    const subdomainBlacklist = [
      "www",
      "preprod",
      "kaizen-staging",
      "localhost",
    ];
    return !subdomainBlacklist.includes(subdomain) ? subdomain : null;
  } catch (err) {
    Bugsnag.notify(err);
    return null;
  }
};
