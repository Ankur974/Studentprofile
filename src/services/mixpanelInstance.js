import mixpanel from "mixpanel-browser";
import { mixPanelKey } from "../utils/variables";
// import * as storage from "@utils/storageFactory";

export class MixpanelTracker {
  constructor() {
    if (!this._instance) {
      mixpanel.init(mixPanelKey, { cookie_domain: window.location.host });
    }
  }

  static getInstance() {
    if (!this._instance) {
      return (this._instance = new MixpanelTracker());
    }
    return this._instance;
  }

  identify = id => {
    mixpanel.identify(id);
  };

  setUserPropertyOnce = (property, value) => {
    mixpanel.people.set_once(property, value);
  };

  setPeople = (key, value) => {
    mixpanel.people.append(key, value);
  };

  optOutTracking = () => {
    mixpanel.opt_out_tracking();
  };

  reset = () => {
    mixpanel.reset();
  };

  trackEvent = ({ event, payload = {} }) => {
    let eventPayload = {};
    // let ad_user_params = storage.local.getItem("ad_user_params");
    // ad_user_params = JSON.parse(ad_user_params);
    // if (!!ad_user_params) {
    //   eventPayload = {
    //     ...payload,
    //     ...ad_user_params,
    //   };
    // } else {
    eventPayload = {
      ...payload,
      ad_user: false,
    };
    // }

    mixpanel.track(event, eventPayload);
    console.log("MIXPANEL EVENT", event, eventPayload);
  };
}
