const buildSeoImage = (
  title: string,
  authorString: string,
  avatarURLBase64: string
) => {
  const baseURL = `https://res.cloudinary.com/flare-community/image/upload/`;

  const mainTextFilters = `c_fit,w_1010,co_rgb:222,g_north_west,x_90,y_100,l_text:Arial_65_bold`;
  const authorTextFilters = `co_rgb:222,g_south_west,x_203,y_98,l_text:Arial_37_bold`;
  const avatarFilters = `g_south_west,h_90,r_max,w_90,x_87,y_72,l_fetch`;

  return (
    baseURL +
    mainTextFilters +
    ":" +
    title +
    "/" +
    authorTextFilters +
    ":" +
    authorString +
    "/" +
    avatarFilters +
    ":" +
    avatarURLBase64 +
    "/v1639705723/Image_bgp1of.png"
  );
};
export default buildSeoImage;
