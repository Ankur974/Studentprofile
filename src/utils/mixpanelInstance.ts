// /*eslint-disable*/
// import mixpanel from "mixpanel-browser";

// // Replace YOUR_TOKEN with your Project Token
// // mixpanel.init('8f8144d0f858fec54a93e221f2210d60', {debug: true});

// // Set this to a unique identifier for the user performing the event.
// // eg: their ID in your database or their email address.
// // mixpanel.identify(/* "<USER_ID"> */)

// // // Track an event. It can be anything, but in this example, we're tracking a Signed Up event.
// // // Include a property about the signup, like the Signup Type
// // mixpanel.track('Signed Up', {
// //   'Signup Type': 'Referral',
// // });

// const mixPanelKey = "8f8144d0f858fec54a93e221f2210d60";

// export class MixpanelTracker {
//   private instance: any;
//   static instance: any;

//   constructor() {
//     if (!this.instance) {
//       mixpanel.init(mixPanelKey, { cookie_domain: window.location.host });
//     }
//   }

//   static getInstance() {
//     if (!this.instance) {
//       return (this.instance = new MixpanelTracker());
//     }
//     return this.instance;
//   }

//   identify = (firebaseId: string | undefined) => {
//     mixpanel.identify(firebaseId);
//   };

//   setUserPropertyOnce = (property: string, value: any) => {
//     mixpanel.people.set_once(property, value);
//   };

//   setPeople = (key: string, value: any) => {
//     mixpanel.people.append(key, value);
//   };

//   optOutTracking = () => {
//     mixpanel.opt_out_tracking();
//   };

//   reset = () => {
//     mixpanel.reset();
//   };

//   trackEvent = (event: string, payload = {}) => {
//     // let eventPayload = {};
//     // let ad_user_cookies = storage.local.getItem("ad_user_cookies");
//     // ad_user_cookies = JSON.parse(ad_user_cookies);
//     // if (!!ad_user_cookies) {
//     //   eventPayload = {
//     //     ...payload,
//     //     ...ad_user_cookies,
//     //   };
//     // } else {
//     //   eventPayload = {
//     //     ...payload,
//     //     ad_user: false,
//     //   };
//     // }

//     // mixpanel.track(event, eventPayload);
//     mixpanel.track(event, payload);
//     // if (process.env.NEXT_PUBLIC_ENV === "staging") {
//     // console.log("MIXPANEL EVENT", event, eventPayload);
//     console.log("MIXPANEL EVENT", event, payload);
//     // }
//   };
// }
