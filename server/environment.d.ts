declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "test" | "production";
      PORT: string;
      DATABASE_URL: string;
      TEST_DATABASE_URL: string;
      SECRET: string;
    }
  }
}

export {};
