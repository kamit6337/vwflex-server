import dotenv from "dotenv";
dotenv.config();

export const environment = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN) || 2592000000, // 30 days
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  ENCRYPTION_IV: process.env.ENCRYPTION_IV,
  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  MY_GMAIL_ID: process.env.MY_GMAIL_ID,
  MY_GMAIL_PASSWORD: process.env.MY_GMAIL_PASSWORD,
  AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
  AWS_S3_ACCESS_KEY_SECRET: process.env.AWS_S3_ACCESS_KEY_SECRET,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  REDIS_URL: process.env.REDIS_URL,
  TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
};
