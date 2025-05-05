export const config = {
  apiUrl: "https://api.cencapperu.com/api",
  imagesUrl: "https://api.cencapperu.com",
  isProduction: process.env.NODE_ENV === "production",
  JWT_SECRET: process.env.JWT_SECRET || "",
  MercadoSecret: process.env.SECRET_TOKEN_MERCADO || ""
};
