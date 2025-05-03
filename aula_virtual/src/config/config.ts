export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.cencapperu.com/api",
  imagesUrl: process.env.NEXT_PUBLIC_IMAGES_URL || "https://api.cencapperu.com",
  isProduction: process.env.NODE_ENV === "production",
  JWT_SECRET: process.env.JWT_SECRET || "",
  MercadoSecret: process.env.SECRET_TOKEN_MERCADO || ""
};
