import { z, ZodFormattedError } from "zod";

export const serverSchema = z.object({
  MONGODB_URI: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  CLIENT_ORIGIN: z.string().url(),
});

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value) return `${name}: ${value._errors.join(", ")}\n`;
      return "";
    })
    .filter(Boolean);

const _serverEnv = serverSchema.safeParse(process.env);

if (!_serverEnv.success) {
  console.error("❌ Invalid environment variables:\n", ...formatErrors(_serverEnv.error.format()));
  process.exit(1);
}

export const env = _serverEnv.data;
