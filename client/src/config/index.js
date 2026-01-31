// API Base URL Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "engines", label: "Engines" },
      { id: "gearboxes", label: "Gearboxes" },
      { id: "alternators", label: "Alternators" },
      { id: "radiators", label: "Radiators" },
      { id: "ac_compressors", label: "AC Compressors" },
      { id: "steering_pumps", label: "Steering Pumps" },
      { id: "others", label: "Others" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "ford", label: "Ford" },
      { id: "chevrolet", label: "Chevrolet" },
      { id: "dodge", label: "Dodge" },
      { id: "jeep", label: "Jeep" },
      { id: "cadillac", label: "Cadillac" },
      { id: "gmc", label: "GMC" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "contact",
    label: "Contact Us",
    path: "/shop/contact",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  engines: "Engines",
  gearboxes: "Gearboxes",
  alternators: "Alternators",
  radiators: "Radiators",
  ac_compressors: "AC Compressors",
  steering_pumps: "Steering Pumps",
  others: "Others",
};

export const brandOptionsMap = {
  ford: "Ford",
  chevrolet: "Chevrolet",
  dodge: "Dodge",
  jeep: "Jeep",
  cadillac: "Cadillac",
  gmc: "GMC",
};

export const filterOptions = {
  category: [
    { id: "engines", label: "Engines" },
    { id: "gearboxes", label: "Gearboxes" },
    { id: "alternators", label: "Alternators" },
    { id: "radiators", label: "Radiators" },
    { id: "ac_compressors", label: "AC Compressors" },
    { id: "steering_pumps", label: "Steering Pumps" },
    { id: "others", label: "Others" },
  ],
  brand: [
    { id: "ford", label: "Ford" },
    { id: "chevrolet", label: "Chevrolet" },
    { id: "dodge", label: "Dodge" },
    { id: "jeep", label: "Jeep" },
    { id: "cadillac", label: "Cadillac" },
    { id: "gmc", label: "GMC" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
