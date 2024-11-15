import "@std/dotenv/load";
import { cleanEnv, num, str } from "envalid";

export default cleanEnv(Deno.env.toObject(), {
  AUTH_STRING: str(),
  OWNER_ID: num(),
});
