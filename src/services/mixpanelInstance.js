import mixpanel from "mixpanel-browser";
import { mixPanelKey } from "../utils/variables";

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
    mixpanel.track(event, payload);
    console.log("MIXPANEL EVENT", event, payload);
  };
}
