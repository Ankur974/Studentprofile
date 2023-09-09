import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Footer from "@common/Footer";
import FooterNote from "@common/FooterNote";
import { Loader } from "@common/Loader";
import NavBar from "@common/NavBar";
import PartnerNavBar from "@common/PartnerNavBar";

const HomePageLayout = ({
  color,
  children,
  footerNote,
  footerColor,
  showMobileWhatsappIcon,
  showMobileCallIcon,
  navContainerStyles,
}) => {
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [loading, setLoading] = useState(true);
  const partnerMetaInfo = useSelector(state => state.auth?.partnerMetaInfo);

  useEffect(() => {
    const isMobileApp =
      !!window?.Android || !!window?.ReactNativeWebView || !!window?.YouMatter;
    setHideHeader(isMobileApp || partnerMetaInfo?.feature_flags?.hide_header);
    setHideFooter(isMobileApp || partnerMetaInfo?.feature_flags?.hide_footer);
    setLoading(false);
  }, [partnerMetaInfo]);

  const isCrnLogin = !!partnerMetaInfo?.company_profile?.is_crn_based_login;

  if (loading) return <Loader />;

  return (
    <>
      {!hideHeader && (
        <NavBar
          navContainerStyles={navContainerStyles}
          showMobileWhatsappIcon={showMobileWhatsappIcon}
          showMobileCallIcon={showMobileCallIcon}
        />
      )}
      {hideHeader && isCrnLogin && <PartnerNavBar />}
      {children}
      {!hideFooter && (
        <>
          <FooterNote color={color} footerColor={footerColor}>
            {footerNote}
          </FooterNote>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePageLayout;
