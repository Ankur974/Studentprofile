// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import styled, { css } from "styled-components";
// import Cookies from "universal-cookie";
// import dynamic from "next/dynamic";

// import LazyImage from "./LazyImage";
// import CustomLinkComponent from "@utils/CustomLinkComponent";

// import { H3, H4, H5, H6, TextLabel } from "@common/Headings";
// import { APPSTORE_LINK, PLAYSTORE_LINK } from "@constants";
// import {
//   ACCENT_100,
//   ACCENT_600,
//   ACCENT_800,
//   PRIMARY_800,
//   SECONDARY_600,
//   WHITE,
// } from "@constants/colors";
// import {
//   aboutAmaha,
//   conditions,
//   library,
//   locations,
//   moreUrls,
//   partnerships,
//   professionals,
//   services,
//   socialMediaData,
// } from "@metadata/Footer";
// // import * as storage from "@utils/storageFactory";
// import FlexBox from "./ui/FlexBox";

// const CookieConsentPopup = dynamic(() => import("../Popups/CookieConsent"));

// const FooterContainer = styled(FlexBox)`
//   background: ${ACCENT_100};
// `;

// const DesktopFooterWrapper = styled(FlexBox)`
//   max-width: 75rem;
//   width: 86.67%;
//   padding: 2.5rem 0 5rem;
//   @media only screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// const MobileFooterWrapper = styled(DesktopFooterWrapper)`
//   display: none;
//   padding-bottom: 2.25rem;

//   @media only screen and (max-width: 768px) {
//     display: flex;
//   }
// `;

// const FooterColumn = styled(FlexBox)`
//   width: 100%;
//   max-width: 17.625rem;

//   ${props =>
//     props.hidden &&
//     css`
//       display: none;
//     `}
// `;

// const TrophyWrapper = styled.div`
//   width: 4.875rem;
//   min-width: 4.875rem;
//   max-width: 4.875rem;
// `;

// const DownloadCtasWrapper = styled(FlexBox)`
//   width: 100%;
//   margin-top: -3.5625rem;

//   @media only screen and (max-width: 768px) {
//     margin-top: -1.5625rem;
//   }
// `;

// const PlayStoreCtaWrapper = styled.div`
//   width: 8.125rem;
//   min-width: 8.125rem;
//   max-width: 8.125rem;
//   height: 2.5rem !important;
//   cursor: pointer;
// `;

// const AppStoreCtaWrapper = styled.div`
//   width: ${props => (!props.isShowingLocations ? "7.5rem" : "8.125rem")};
//   min-width: ${props => (!props.isShowingLocations ? "7.5rem" : "8.125rem")};
//   max-width: ${props => (!props.isShowingLocations ? "7.5rem" : "8.125rem")};
//   margin-top: ${props => (!props.isShowingLocations ? 0 : "-3rem")};

//   cursor: pointer;

//   @media only screen and (max-width: 768px) {
//     width: 7.5rem;
//     min-width: 7.5rem;
//     max-width: 7.5rem;

//     margin-top: 0;
//   }
// `;

// const ListItemContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const TagButton = styled.div`
//   height: 1.3rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${PRIMARY_800};
//   color: ${WHITE};
//   font-size: 0.6rem;
//   margin-left: 0.5rem;
//   border-radius: 16px;
//   padding: 0.2rem 0.5rem;
//   text-transform: uppercase;
//   font-weight: 700;
//   letter-spacing: 0.8px;
// `;

// const TagButtonNotPresent = styled.div`
//   margin-left: 0.5rem;
//   display: flex;
//   align-items: center;
//   color: ${SECONDARY_600};
//   font-size: 0.8rem;
// `;

// const Dot = styled.div`
//   height: 5px;
//   width: 5px;
//   border-radius: 50%;
//   background-color: ${SECONDARY_600};
//   margin-right: 0.5rem;
// `;

// const ImgBox = styled.div`
//   height: ${({ height }) => `${height}px`};
//   width: ${({ width }) => `${width}px`};
// `;

// const Footer = () => {
//   const [showCookiePopup, setShowCookiePopup] = useState(false);
//   const cookies = new Cookies();

//   const router = useRouter();
//   let filteredConditions = conditions;

//   if (router.query.utm_campaign) {
//     filteredConditions = conditions?.filter(c => {
//       return (
//         c.link !== "/alcohol-addiction/" && c.link !== "/tobacco-addiction/"
//       );
//     });
//   }

//   useEffect(() => {
//     const existing =
//       cookies.get("cookies") || storage.local.getItem("isCookieConsentHidden");
//     if (!existing) {
//       setShowCookiePopup(true);
//     }
//   }, []);

//   const acceptCookiesConsent = () => {
//     const expiry = new Date(
//       new Date().setFullYear(new Date().getFullYear() + 5)
//     );
//     cookies.set("cookies", "accepted", { path: "/", expires: expiry });
//     setShowCookiePopup(false);
//   };

//   const hideCookiesConsent = () => {
//     storage.local.setItem("isCookieConsentHidden", "true");
//     setShowCookiePopup(false);
//   };

//   const moreUrlsMarkup = moreUrls?.map(moreUrl => (
//     <CustomLinkComponent href={moreUrl.link} key={moreUrl.title}>
//       <H6 className="pointer" color={ACCENT_800}>
//         {moreUrl.title}
//       </H6>
//     </CustomLinkComponent>
//   ));

//   const socialMediaMarkup = socialMediaData?.map((socialMedia, i) => (
//     <a
//       href={socialMedia.link}
//       target="_blank"
//       rel="noopener noreferrer"
//       key={i}
//     >
//       {socialMedia.icon}
//     </a>
//   ));

//   const lastNote = (
//     <H6 color={ACCENT_600}>
//       Amaha does not deal with medical or psychological emergencies. We are not
//       designed to offer support in crisis situations - including when an
//       individual is experiencing thoughts of self-harm or suicide, or is showing
//       symptoms of severe clinical disorders such as schizophrenia and other
//       psychotic conditions. In these cases, in-person medical intervention is
//       the most appropriate form of help.
//       <br />
//       <br />
//       If you feel you are experiencing any of these difficulties, we would urge
//       you to seek help at the nearest hospital or emergency room where you can
//       connect with a psychiatrist, social worker, counsellor or therapist in
//       person. We recommend you to involve a close family member or a friend who
//       can offer support.
//       <br />
//       <br />
//       You can also reach out to a suicide hotline in your country of
//       residence:&nbsp;
//       <CustomLinkComponent href="http://www.healthcollective.in/contact/helplines">
//         <a
//           href="http://www.healthcollective.in/contact/helplines"
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: ACCENT_600, textDecoration: "none" }}
//         >
//           http://www.healthcollective.in/contact/helplines
//         </a>
//       </CustomLinkComponent>
//     </H6>
//   );

//   const renderSiteLinks = list =>
//     list.map(item => {
//       if (item.link) {
//         return (
//           <CustomLinkComponent
//             href={`${item.link}?source=ftr`}
//             key={item.title}
//           >
//             <ListItemContainer>
//               <H5
//                 color={ACCENT_800}
//                 className="pointer"
//                 onClick={() => item.onClick?.()}
//                 // style={{ textTransform: "lowercase" }}
//               >
//                 {item.title}
//               </H5>
//               {item.tag && <TagButton>{item.tag}</TagButton>}
//             </ListItemContainer>
//           </CustomLinkComponent>
//         );
//       } else {
//         return (
//           <ListItemContainer key={item.title}>
//             <H5
//               color={ACCENT_800}
//               className="pointer"
//               onClick={() => item.onClick?.()}
//               // style={{ textTransform: "lowercase" }}
//             >
//               {item.title}
//             </H5>
//             {item.tag && (
//               <TagButtonNotPresent>
//                 <Dot />
//                 {item.tag}
//               </TagButtonNotPresent>
//             )}
//           </ListItemContainer>
//         );
//       }
//     });

//   return (
//     <>
//       <FooterContainer align="center" justify="center">
//         <DesktopFooterWrapper justify="center" column>
//           <FlexBox justify="space-between" width="100%" columnGap="1.5rem">
//             <FooterColumn column rowGap="0.5rem" width="100%">
//               <TextLabel color={ACCENT_600}>About Amaha</TextLabel>
//               {renderSiteLinks(aboutAmaha)}
//             </FooterColumn>
//             <FooterColumn column rowGap="0.5rem" width="100%">
//               <TextLabel color={ACCENT_600}>Services</TextLabel>
//               {renderSiteLinks(services)}
//             </FooterColumn>
//             <FooterColumn column rowGap="0.5rem" width="100%">
//               <TextLabel color={ACCENT_600}>Conditions</TextLabel>
//               {renderSiteLinks(filteredConditions)}
//             </FooterColumn>

//             {process.env.NEXT_PUBLIC_SHOW_OFFLINE_FEATURES === "true" && (
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>Centers</TextLabel>
//                 {renderSiteLinks(locations)}
//               </FooterColumn>
//             )}

//             <FooterColumn column rowGap="1rem" width="79%">
//               <H4 bold textAlign="center">
//                 Build a good life for yourself with Amaha
//               </H4>
//               <FlexBox align="center" justify="flex-end" columnGap="0.5rem">
//                 <FlexBox column rowGap="0.25rem">
//                   <H3 textAlign="right" bold>
//                     Best App
//                     <br />
//                     for Good
//                   </H3>
//                   <H5 textAlign="right">on Google Play India</H5>
//                 </FlexBox>
//                 <TrophyWrapper>
//                   <LazyImage
//                     src="https://cdn.theinnerhour.com/assets/images/footer/bestof_trophy.webp"
//                     width="78px"
//                     height="78px"
//                     draggable={false}
//                     alt='Awarded "The Best App for Good" by Google Play in 2020'
//                   />
//                 </TrophyWrapper>
//               </FlexBox>
//             </FooterColumn>
//           </FlexBox>
//           <FlexBox
//             columnGap="1.5rem"
//             justify="space-between"
//             margin="4rem 0 0 0"
//           >
//             <FlexBox width="100%" columnGap="1.5rem">
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>Partnerships</TextLabel>
//                 {renderSiteLinks(partnerships)}
//               </FooterColumn>
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>EXPERTS</TextLabel>
//                 {renderSiteLinks(professionals)}
//               </FooterColumn>
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>LIBRARY</TextLabel>
//                 {renderSiteLinks(library)}
//               </FooterColumn>
//               {/* empty block added to align with above row  */}
//               {process.env.NEXT_PUBLIC_SHOW_OFFLINE_FEATURES === "true" && (
//                 <FooterColumn
//                   column
//                   rowGap="0.5rem"
//                   width="100%"
//                 ></FooterColumn>
//               )}
//               <FooterColumn>
//                 <DownloadCtasWrapper
//                   columnGap="0.5625rem"
//                   width="100%"
//                   justify="flex-end"
//                   align="flex-start"
//                   wrap="wrap"
//                 >
//                   <a href={PLAYSTORE_LINK} target="_blank">
//                     <PlayStoreCtaWrapper>
//                       <LazyImage
//                         src="https://cdn.theinnerhour.com/assets/images/footer/play-store-download-cta.webp"
//                         width="130px"
//                         height="40px"
//                         draggable={false}
//                         alt="PlayStore Button"
//                       />
//                     </PlayStoreCtaWrapper>
//                   </a>
//                   <a href={APPSTORE_LINK} target="_blank">
//                     <AppStoreCtaWrapper
//                       isShowingLocations={
//                         process.env.NEXT_PUBLIC_SHOW_OFFLINE_FEATURES === "true"
//                       }
//                     >
//                       <LazyImage
//                         src="https://cdn.theinnerhour.com/assets/images/footer/app-store-download-cta.webp"
//                         width="130px"
//                         height="44px"
//                         draggable={false}
//                         alt="AppStore Button"
//                       />
//                     </AppStoreCtaWrapper>
//                   </a>
//                 </DownloadCtasWrapper>
//               </FooterColumn>
//             </FlexBox>
//           </FlexBox>
//           <FlexBox margin="2.5rem 0 0 0" columnGap="1.5rem">
//             <LazyImage
//               src={"https://cdn.theinnerhour.com/assets/images/footer/iso.webp"}
//               width="60px"
//               height="60px"
//               draggable={false}
//               alt="ISO Icon"
//             />
//             <LazyImage
//               src={
//                 "https://cdn.theinnerhour.com/assets/images/footer/hippa.webp"
//               }
//               width="100px"
//               height="60px"
//               draggable={false}
//               alt="HIPAA Icon"
//             />
//             <LazyImage
//               src={"https://cdn.theinnerhour.com/assets/images/footer/eu.webp"}
//               width="60px"
//               height="60px"
//               draggable={false}
//               alt="EU GDPR Icon"
//             />
//           </FlexBox>
//           <FlexBox margin="1.5rem 0 0.5rem" justify="space-between">
//             <FlexBox columnGap="2.125rem" align="center" padding="0.25rem 0">
//               <FlexBox
//                 columnGap="0.125rem"
//                 align="center"
//                 style={{ color: ACCENT_800 }}
//               >
//                 &#169;
//                 <H6>Amaha</H6>
//               </FlexBox>
//               {moreUrlsMarkup}
//             </FlexBox>
//             <FlexBox columnGap="2.5rem">{socialMediaMarkup}</FlexBox>
//           </FlexBox>
//           {lastNote}
//         </DesktopFooterWrapper>
//         <MobileFooterWrapper column>
//           <FlexBox justify="space-between" rowGap="1.5rem" column>
//             <FlexBox width="100%" rowGap="1.5rem" columnGap="1rem">
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>About Amaha</TextLabel>
//                 {renderSiteLinks(aboutAmaha)}
//               </FooterColumn>
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>Services</TextLabel>
//                 {renderSiteLinks(services)}
//               </FooterColumn>
//             </FlexBox>
//             <FlexBox width="100%" rowGap="1.5rem" columnGap="1rem">
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>Conditions</TextLabel>
//                 {renderSiteLinks(filteredConditions)}
//               </FooterColumn>
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>Professionals</TextLabel>
//                 {renderSiteLinks(professionals)}
//               </FooterColumn>
//             </FlexBox>
//             <FlexBox width="100%" rowGap="1.5rem" columnGap="1rem">
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>Partnerships</TextLabel>
//                 {renderSiteLinks(partnerships)}
//               </FooterColumn>
//               <FooterColumn column rowGap="0.5rem" width="100%">
//                 <TextLabel color={ACCENT_600}>LIBRARY</TextLabel>
//                 {renderSiteLinks(library)}
//               </FooterColumn>
//             </FlexBox>
//             <FlexBox>
//               {" "}
//               {process.env.NEXT_PUBLIC_SHOW_OFFLINE_FEATURES === "true" && (
//                 <FooterColumn column rowGap="0.5rem" width="100%">
//                   <TextLabel color={ACCENT_600}>Locations</TextLabel>
//                   {renderSiteLinks(locations)}
//                 </FooterColumn>
//               )}
//             </FlexBox>
//           </FlexBox>
//           <FlexBox margin="1.5rem 0 0 0" columnGap="0.5rem" justify="center">
//             <ImgBox width={60} height={60}>
//               <img
//                 src={
//                   "https://cdn.theinnerhour.com/assets/images/footer/iso.webp"
//                 }
//                 width="60px"
//                 height="60px"
//                 draggable={false}
//                 layout="responsive"
//                 alt="ISO Icon"
//               />
//             </ImgBox>
//             <ImgBox width={100} height={60}>
//               <img
//                 src={
//                   "https://cdn.theinnerhour.com/assets/images/footer/hippa.webp"
//                 }
//                 width="100px"
//                 height="60px"
//                 draggable={false}
//                 layout="responsive"
//                 alt="HIPAA Icon"
//               />
//             </ImgBox>
//             <ImgBox width={60} height={60}>
//               <img
//                 src={
//                   "https://cdn.theinnerhour.com/assets/images/footer/eu.webp"
//                 }
//                 width="60px"
//                 height="60px"
//                 draggable={false}
//                 layout="responsive"
//                 alt="EU GDPR Icon"
//               />
//             </ImgBox>
//           </FlexBox>
//           <FooterColumn
//             justify="space-between"
//             column
//             rowGap="0.5rem"
//             margin="2.5rem 0"
//           >
//             <H4 bold textAlign="center">
//               Build a good life for yourself
//               <br />
//               with Amaha
//             </H4>
//             <FlexBox align="center" justify="center" columnGap="1.5rem">
//               <FlexBox column rowGap="0.25rem">
//                 <H3 textAlign="right" bold>
//                   Best App
//                   <br />
//                   for Good
//                 </H3>
//                 <H5 textAlign="right">on Google Play India</H5>
//               </FlexBox>
//               <TrophyWrapper>
//                 <img
//                   src={
//                     "https://cdn.theinnerhour.com/assets/images/footer/bestof_trophy.webp"
//                   }
//                   width="78px"
//                   height="78px"
//                   draggable={false}
//                   alt='Awarded "The Best App for Good" by Google Play in 2020'
//                   layout="responsive"
//                 />
//               </TrophyWrapper>
//             </FlexBox>
//           </FooterColumn>
//           <DownloadCtasWrapper
//             columnGap="0.5625rem"
//             width="100%"
//             justify="center"
//           >
//             <a href={PLAYSTORE_LINK} target="_blank">
//               <PlayStoreCtaWrapper>
//                 <img
//                   src="https://cdn.theinnerhour.com/assets/images/footer/play-store-download-cta.webp"
//                   width="130px"
//                   height="40px"
//                   draggable={false}
//                   alt="PlayStore Button"
//                 />
//               </PlayStoreCtaWrapper>
//             </a>

//             <a href={APPSTORE_LINK} target="_blank">
//               <AppStoreCtaWrapper
//                 isShowingLocations={
//                   process.env.NEXT_PUBLIC_SHOW_OFFLINE_FEATURES === "true"
//                 }
//               >
//                 <img
//                   src="https://cdn.theinnerhour.com/assets/images/footer/app-store-download-cta.webp"
//                   width="120px"
//                   height="40px"
//                   draggable={false}
//                   alt="AppStore Button"
//                 />
//               </AppStoreCtaWrapper>
//             </a>
//           </DownloadCtasWrapper>
//           <FlexBox margin="2.5rem 0 1.5rem" justify="space-between">
//             <FlexBox rowGap="0.5rem" align="flex-start" column>
//               <FlexBox
//                 style={{ color: ACCENT_800 }}
//                 columnGap="0.125rem"
//                 align="center"
//               >
//                 &#169;
//                 <H6>Amaha</H6>
//               </FlexBox>
//               {moreUrlsMarkup}
//             </FlexBox>
//             <FlexBox columnGap="2.5rem">{socialMediaMarkup}</FlexBox>
//           </FlexBox>
//           {lastNote}
//         </MobileFooterWrapper>
//       </FooterContainer>
//       {showCookiePopup && (
//         <CookieConsentPopup
//           hideCookiesConsent={hideCookiesConsent}
//           acceptCookiesConsent={acceptCookiesConsent}
//         />
//       )}
//     </>
//   );
// };

// export default Footer;
