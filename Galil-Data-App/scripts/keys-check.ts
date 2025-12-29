import "dotenv/config";
const requiredKeys = ["DATABASE_URL", "GEMINI_API_KEY"];
// List your required environment variable keys here

function checkEnvKeys() {
  const missing = requiredKeys.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required .env keys: ${missing.join(", ")}`);
  }
  console.log("All required .env keys are present.");
}

try {
  checkEnvKeys();
} catch (err) {
  console.error(err);
  process.exit(1);
}

checkEnvKeys();
