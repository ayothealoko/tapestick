import { ConfigFile, generateEndpoints } from "@rtk-query/codegen-openapi";

if (process.env.NEXT_PUBLIC_OPENAPI_SCHEMA_FILE === undefined) {
  throw new Error("not set : process.env.NEXT_PUBLIC_OPENAPI_SCHEMA_FILE");
}

const config: ConfigFile = {
  schemaFile: process.env.NEXT_PUBLIC_OPENAPI_SCHEMA_FILE,
  apiFile: "./api.template.ts",
  apiImport: "tapestickEmptyApi",
  outputFile: "./api.openapi.ts",
  exportName: "tapestickGeneratedApi",
  hooks: true,
};

export default config;
