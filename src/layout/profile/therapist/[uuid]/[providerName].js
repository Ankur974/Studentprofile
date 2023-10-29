// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import axiosInstance, { tokenKey } from "@axiosInstance";
// import urls from "@urls";
// import { useRouter } from "next/router";
// import { useFeature } from "@growthbook/growthbook-react";
// import useMobileView from "@hooks/useMobileView";
// import ProfilePage from "@components/ProfilePage";
// import { THERAPIST, COUPLE_THERAPIST } from "@constants";
// import Meta from "@layout/Meta";
// import Loader from "@common/ui/Loader";
// import { trackEvent } from "@utils/helpers";
// import { updateInAppFunnelEvent } from "@utils/mobileAppUtils";
// import HomePageLayout from "@layout/HomePageLayout";
// import ProviderProfileNew from "@components/ProviderProfileNew";
// import * as storage from "@utils/storageFactory";
// import { BooleanParam, useQueryParam, withDefault } from "use-query-params";

// const TherapistProfile = ({ therapist, fetchClientSide }) => {
//   const router = useRouter();
//   const [b2cProfile, setB2cProfile] = useState(therapist);
//   const [b2bProfile, setB2bProfile] = useState(null);
//   const user = useSelector(state => state.auth?.user);
//   const isTflFlow = useSelector(state => state.tfl?.isTflFlow);
//   const { sessionType, source, origin, uuid } = router.query;
//   const isMobile = useMobileView();

//   const provider = !!b2bProfile ? b2bProfile : b2cProfile;

//   const profileExperiment = useFeature("profile-page-experiment");
//   // enum: ["v0" = old, "v1" = new]
//   const [showProfileVersion, setShowProfileVersion] = useState(() => {
//     if (provider?.show_book_cta === false) return "v0";
//     return null;
//   });

//   const [video] = useQueryParam("video", withDefault(BooleanParam, false));

//   useEffect(async () => {
//     if (
//       !!user ||
//       fetchClientSide ||
//       process?.env?.NEXT_PUBLIC_ENV !== "production"
//     ) {
//       try {
//         setB2cProfile(null);
//         const response = await axiosInstance.get(
//           `${urls.therapistPublicProfile}/${uuid}`
//         );
//         setB2bProfile(response?.data?.therapist || null);
//       } catch (err) {
//         console.log("Error while fetching b2b therapist profile", err.message);
//       }
//     }
//   }, [user]);

//   useEffect(() => {
//     (async () => {
//       const loadTracker = exp => {
//         trackEvent({
//           event: "profile_page_expt_assigned",
//           payload: {
//             expt_variant: exp,
//           },
//         });
//       };

//       if (!!showProfileVersion && !user) {
//         loadTracker(showProfileVersion === "v1" ? "new_page" : "old_page");
//         return;
//       }

//       if (router.isReady) {
//         const { token: queryToken } = router.query;

//         const localToken = storage.local.getItem(tokenKey);

//         if (profileExperiment.source === "experiment") {
//           const experimentValue = profileExperiment.value;

//           if (!user && !queryToken && !localToken) {
//             setShowProfileVersion(experimentValue);
//             loadTracker(experimentValue === "v1" ? "new_page" : "old_page");
//           } else if (!!user && !!b2bProfile) {
//             if (
//               user.usertype !== "patient" ||
//               b2bProfile?.show_book_cta === false
//             ) {
//               setShowProfileVersion("v0");
//               loadTracker("old_page");
//             } else {
//               setShowProfileVersion(experimentValue);
//               loadTracker(experimentValue === "v1" ? "new_page" : "old_page");
//             }

//             updateInAppFunnelEvent(user?.firebaseid, {
//               ranking: 5,
//               slug: "providerProfileDropOff",
//               status: "pending",
//               type: "popup",
//               uuidList: [provider?.uuid],
//               providerType:
//                 sessionType === "couple" ? COUPLE_THERAPIST : THERAPIST,
//             });
//           }
//         }
//       }
//     })();
//   }, [router.isReady, profileExperiment.source, user, b2bProfile]);

//   const providerName = `${provider?.firstname} ${provider?.lastname}`;
//   // const metaDescription = `Book an online therapy session with Amaha${
//   //   provider?.uuid === "e2b2018d-724e-4724-baf9-53ff27cd3e2b" ? "'s Lead" : ""
//   // } Therapist ${providerName} for mental health issues like stress, depression, or anxiety.`;
//   const metaDescription =
//     "Book an appointment with the best therapist doctor online. Consult with an Amaha psychologist for the treatment of mental health disorders & conditions including Anxiety, OCD, Depression and many more";

//   const jsonLdData = {
//     "@context": "https://schema.org/",
//     "@type": "Service",
//     category: "Psychological Treatment",
//     serviceType: "Online therapy",
//     description: "Book an online therapy session",
//     provider: {
//       "@type": "Person",
//       name: providerName,
//       url: `${process?.env?.NEXT_PUBLIC_WEBSITE_URL}/profile/therapist/${provider?.uuid}`,
//       image: "https:" + provider?.image,
//       jobTitle: "Therapist",
//       worksFor: {
//         "@type": "Organization",
//         name: "Amaha",
//         url: "https://www.amahahealth.com/",
//       },
//     },
//     offers: {
//       "@type": "Offer",
//       price: provider?.online_offering?.minimum_fee,
//       priceCurrency: "INR",
//     },
//   };

//   const hideHomePageLayout = isTflFlow;

//   const navContainerStyles = {
//     position: "unset",
//     display: video ? "none" : "flex",
//   };

//   if (
//     !fetchClientSide &&
//     !therapist &&
//     process?.env?.NEXT_PUBLIC_ENV === "production"
//   )
//     return <div>Therapist not found</div>;

//   if ((!b2cProfile && !b2bProfile) || !showProfileVersion) return <Loader />;

//   return (
//     <>
//       <Meta
//         title={`Best Therapist in India | Consult Therapist ${providerName} Online`}
//         description={metaDescription}
//         image={provider?.image && `https:${provider?.image}`}
//         type="profile"
//         canonical={`/profile/therapist/${uuid}/${router.query.providerName}/`}
//       >
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
//         />
//       </Meta>

//       {hideHomePageLayout ? (
//         showProfileVersion === "v0" ? (
//           <ProfilePage
//             isMobile={isMobile}
//             provider={!!b2bProfile ? b2bProfile : b2cProfile}
//             sessionType={sessionType}
//             providerType={THERAPIST}
//             source={source}
//             origin={origin}
//           />
//         ) : (
//           <ProviderProfileNew
//             providerData={provider}
//             providerType={THERAPIST}
//             sessionType={sessionType}
//           />
//         )
//       ) : showProfileVersion === "v0" ? (
//         <HomePageLayout>
//           <ProfilePage
//             isMobile={isMobile}
//             provider={!!b2bProfile ? b2bProfile : b2cProfile}
//             sessionType={sessionType}
//             providerType={THERAPIST}
//             source={source}
//             origin={origin}
//           />
//         </HomePageLayout>
//       ) : (
//         <HomePageLayout navContainerStyles={navContainerStyles}>
//           <ProviderProfileNew
//             providerData={provider}
//             providerType={THERAPIST}
//             sessionType={sessionType}
//           />
//         </HomePageLayout>
//       )}
//     </>
//   );
// };

// export async function getServerSideProps(context) {
//   let props = { therapist: null };
//   try {
//     if (context?.query?.source === "provider_dashboard") {
//       return { props: { therapist: null, fetchClientSide: true } };
//     }
//     const response = await axiosInstance.get(
//       `${urls.therapistPublicProfile}/${context?.params?.uuid}`
//     );
//     const therapist = response?.data?.therapist;
//     if (therapist) {
//       const { firstname, lastname } = therapist;
//       const kebabCaseName = `${firstname} ${lastname}`
//         .replace(/\s+/g, "-")
//         .toLocaleLowerCase();
//       if (kebabCaseName === context?.params?.providerName) {
//         props = { therapist };
//       }
//     }
//   } catch (err) {
//     if (process?.env?.NEXT_PUBLIC_ENV === "production") {
//       return { notFound: true };
//     } else props = { therapist: null };
//   }
//   return { props };
// }

// export default TherapistProfile;
