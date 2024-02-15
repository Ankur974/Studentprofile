export const filterMeta = [
  {
    title: "Sort By",
    slug: "sort_by",
    type: "radio",
    options: [
      { label: "Most Popular", slug: "popular", isPopular: true },
      { label: "Price: Low to High", slug: "price_low_high" },
      { label: "Price: High to Low", slug: "price_high_low" },
      { label: "Newest", slug: "newest" },
    ],
  },
  {
    title: "Gender",
    slug: "gender",
    type: "radio",
    options: [
      { label: "Unisex", slug: "unisex", isPopular: true },
      { label: "Male", slug: "male" },
      { label: "Female", slug: "female" },
    ],
  },
  {
    title: "Price Range",
    slug: "price_range",
    type: "checkbox",
    options: [
      { label: "Under ₹500", slug: "under_500" },
      { label: "₹500 - ₹1000", slug: "500_1000" },
      { label: "₹1000 - ₹2000", slug: "1000_2000" },
      { label: "Over ₹2000", slug: "over_2000" },
    ],
  },
  {
    title: "Services Offered",
    slug: "services_offered",
    type: "checkbox",
    options: [
      { label: "Haircut", slug: "haircut", isPopular: true },
      { label: "Manicure", slug: "manicure", isPopular: true },
      { label: "Pedicure", slug: "pedicure" },
      { label: "Facial", slug: "facial" },
      { label: "Nails", slug: "nails", isPopular: true },
    ],
  },
  {
    title: "Special Offers",
    slug: "special_offers",
    type: "checkbox",
    options: [
      { label: "Discounts", slug: "discounts", isPopular: true },
      { label: "Package Deals", slug: "package_deals", isPopular: true },
      { label: "Freebies", slug: "freebies" },
    ],
  },
];
