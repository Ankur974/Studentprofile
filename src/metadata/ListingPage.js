export const filterMeta = [
  {
    title: "Sort By",
    slug: "sort_by",
    type: "radio",
    options: [
      { label: "Most Popular", slug: "pop", isPopular: true },
      { label: "Price: Low to High", slug: "asc" },
      { label: "Price: High to Low", slug: "des" },
      { label: "Newest", slug: "new" },
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
    type: "radio",
    options: [
      { label: "Under ₹500", slug: "1" },
      { label: "₹500 - ₹1000", slug: "2" },
      { label: "₹1000 - ₹2000", slug: "3" },
      { label: "Over ₹2000", slug: "4" },
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
