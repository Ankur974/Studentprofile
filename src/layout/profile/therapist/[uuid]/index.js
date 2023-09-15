// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import axiosInstance from "@axiosInstance";
// import urls from "@urls";
// import { useRouter } from "next/router";
// import useMobileView from "@hooks/useMobileView";
// import ProfilePage from "@components/ProfilePage";
// import { THERAPIST } from "@constants";
// import Meta from "@layout/Meta";
// import { Loader } from "@common/Loader";
// import { encodeQueryData, isStringNullable } from "@utils/helpers";
// import HomePageLayout from "@layout/HomePageLayout";

// const TherapistProfile = ({ therapist }) => {
//   const router = useRouter();
//   const [b2cProfile, setB2cProfile] = useState(therapist);
//   const [b2bProfile, setB2bProfile] = useState(null);
//   const user = useSelector(state => state.auth?.user);
//   const { sessionType, source, origin, uuid } = router.query;
//   const isMobile = useMobileView();

//   useEffect(async () => {
//     if (
//       (!!user && user.usertype !== "patient") ||
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

//   if (!therapist && process?.env?.NEXT_PUBLIC_ENV === "production")
//     return <div>Therapist not found</div>;
//   if (!b2cProfile && !b2bProfile) return <Loader />;

//   const provider = !!b2bProfile ? b2bProfile : b2cProfile;

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

//   const kebabCaseName = `${provider?.firstname} ${provider?.lastname}`
//     .replace(/\s+/g, "-")
//     .toLocaleLowerCase();

//   return (
//     <>
//       <Meta
//         title={`Best Therapist in India | Consult Therapist ${providerName} Online`}
//         description={metaDescription}
//         image={provider?.image && `https:${provider?.image}`}
//         type="profile"
//         canonical={`/profile/therapist/${uuid}/${kebabCaseName}/`}
//       >
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
//         />
//       </Meta>
//       <HomePageLayout>
//         <ProfilePage
//           isMobile={isMobile}
//           provider={!!b2bProfile ? b2bProfile : b2cProfile}
//           sessionType={sessionType}
//           providerType={THERAPIST}
//           source={source}
//           origin={origin}
//         />
//       </HomePageLayout>
//     </>
//   );
// };

// export async function getServerSideProps(context) {
//   let props = { therapist: null };
//   try {
//     const response = await axiosInstance.get(
//       `${urls.therapistPublicProfile}/${context?.params?.uuid}`
//     );
//     const therapist = response?.data?.therapist || null;
//     if (therapist) {
//       props = { therapist };
//       const { firstname, lastname } = therapist;
//       const kebabCaseName = `${firstname} ${lastname}`
//         .replace(/\s+/g, "-")
//         .toLocaleLowerCase();
//       const sessionType = context?.query?.sessionType;
//       const source = context?.query?.source;
//       const clinicId = context?.query?.clinic_id;
//       const defaultMode = context?.query?.default_mode;
//       const platform = context?.query?.platform;
//       const filter = context?.query?.filter;
//       const listingExperimentVariant = context?.query?.listingExperimentVariant;
//       const token = context?.query?.token;
//       const isDisableEdit = context?.query?.isDisableEdit;

//       const utm_source = context?.query?.utm_source;
//       const utm_campaign = context?.query?.utm_campaign;
//       const utm_content = context?.query?.utm_content;
//       const utm_medium = context?.query?.utm_medium;
//       const ad_user = context?.query?.ad_user;

//       let params = {
//         sessionType:
//           !sessionType || sessionType === "undefined" ? "single" : sessionType,
//         source: source,
//       };

//       if (source === "booking") params.showBackButton = true;
//       if (!isStringNullable(token)) params.token = token;
//       if (!isStringNullable(clinicId)) params.clinic_id = clinicId;
//       if (!isStringNullable(defaultMode)) params.default_mode = defaultMode;
//       if (!isStringNullable(platform)) params.platform = platform;
//       if (!isStringNullable(filter)) params.filter = filter;
//       if (!isStringNullable(listingExperimentVariant)) {
//         params.listingExperimentVariant = listingExperimentVariant;
//       }
//       if (!isStringNullable(isDisableEdit)) {
//         params.isDisableEdit = isDisableEdit;
//       }

//       if (!isStringNullable(utm_source)) params.utm_source = utm_source;
//       if (!isStringNullable(utm_campaign)) params.utm_campaign = utm_campaign;
//       if (!isStringNullable(utm_content)) params.utm_content = utm_content;
//       if (!isStringNullable(utm_medium)) params.utm_medium = utm_medium;
//       if (!isStringNullable(ad_user)) params.ad_user = ad_user;

//       const urlParam = encodeQueryData(params);
//       return {
//         redirect: {
//           destination: `/profile/therapist/${therapist.uuid}/${kebabCaseName}?${urlParam}`,
//           permanent: false,
//         },
//       };
//     }
//   } catch (err) {
//     console.log("Error while fetching therapist profile", err.message);
//     if (process?.env?.NEXT_PUBLIC_ENV === "production") {
//       return {
//         redirect: {
//           destination: "/therapy-psychiatry",
//           permanent: false,
//         },
//       };
//     } else props = { therapist: null };
//   }
//   return { props };
// }

// export default TherapistProfile;
