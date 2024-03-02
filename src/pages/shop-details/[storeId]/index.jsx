import React from "react";
import { useRouter } from "next/router";

import ShopDetailPage from "@components/ShopDetailPage";
import HomePageLayout from "@layout/client/HomePageLayout";

const ShopDetails = () => {
  const router = useRouter();
  const storeId = router?.query?.storeId;

  return (
    <HomePageLayout>
      <ShopDetailPage storeId={storeId} />
    </HomePageLayout>
  );
};
export default ShopDetails;
