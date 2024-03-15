import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "@common/ui/Loader";
import NavBar from "@common/NavBar";
import Footer from "@common/Footer";
import useMobileView from "@hooks/useMobileView";
import FloatingCart from "@components/Cart/FloatingCart";

const HomePageLayout = ({
  children,
  showMobileWhatsappIcon,
  showMobileCallIcon,
  navContainerStyles,
}) => {
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [loading, setLoading] = useState(true);
  const partnerMetaInfo = useSelector(state => state?.auth?.partnerMetaInfo);
  const isMobile = useMobileView();

  useEffect(() => {
    const isMobileApp =
      !!window?.Android || !!window?.ReactNativeWebView || !!window?.YouMatter;
    setHideHeader(isMobileApp || partnerMetaInfo?.feature_flags?.hide_header);
    setHideFooter(isMobileApp || partnerMetaInfo?.feature_flags?.hide_footer);
    setLoading(false);
  }, [partnerMetaInfo]);

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
      {children}
      {isMobile && <FloatingCart/>}
      {!hideFooter && <Footer />}
    </>
  );
};

export default HomePageLayout;
