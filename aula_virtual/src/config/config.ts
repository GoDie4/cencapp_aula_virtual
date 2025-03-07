export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  imagesUrl: process.env.NEXT_PUBLIC_IMAGES_URL || "http://localhost:4000",
  isProduction: process.env.NODE_ENV === "production",
  JWT_SECRET: process.env.JWT_SECRET || "",
  MercadoSecret: process.env.SECRET_TOKEN_MERCADO || ""
};
