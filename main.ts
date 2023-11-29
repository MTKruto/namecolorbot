import {
  Client,
  getColorFromPeerId,
  getColorName,
  StorageLocalStorage,
} from "https://deno.land/x/mtkruto@0.1.116/mod.ts";
import env from "./env.ts";
import { getColorCodes } from "./util.ts";

const client = new Client(
  new StorageLocalStorage("client"),
  env.API_ID,
  env.API_HASH,
);
const startTime = Date.now();

let requestsProcessed = 0;

function n(color: number) {
  const name = getColorName(color) as string;
  return name[0].toUpperCase() + name.slice(1);
}
function c(color: number) {
  let name = getColorName(color) as string;
  name = name[0].toUpperCase() + name.slice(1);
  return `${name} ${
    getColorCodes(color).map((v) => `<code>${v.toUpperCase()}</code>`).join(
      ", ",
    )
  }`;
}

client.use(async (ctx, next) => {
  await next();
  if (ctx.inlineQuery !== undefined) {
    requestsProcessed++;
  }
});

function getUrl(
  chosen: ReturnType<typeof getColorCodes>,
  original: ReturnType<typeof getColorCodes>,
) {
  const url = new URL("https://namecolor.deno.dev/g");
  url.searchParams.set("data", JSON.stringify([chosen, original]));
  return url.toString();
}

client.on("inlineQuery", (ctx) => {
  if (ctx.inlineQuery.query.trim().length != 0) {
    return Promise.resolve();
  }
  const color = ctx.from.color;
  const idColor = getColorFromPeerId(ctx.from.id);
  const url = getUrl(getColorCodes(color), getColorCodes(idColor));
  console.log(JSON.stringify({ ...ctx.from, idColor }));
  console.log(url);
  return ctx.answerInlineQuery([{
    id: crypto.randomUUID(),
    type: "photo",
    photoUrl: url,
    thumbnailUrl: url,
    title: "My colors",
    photoWidth: 768,
    photoHeight: 468,
    caption: `My chosen name color: ${c(color)}\nMy original name color: ${
      c(idColor)
    }\n\n<i>Original name colors are constant colors that depend on the user’s ID. They were used by clients before users were able to choose name colors.</i>`,
    description: `${n(color)}, ${n(idColor)}`,
    parseMode: "HTML",
  }], { cacheTime: 5, isPersonal: true });
});

client.command("stats", () => {
  client.on(["message", "text"], (ctx, next) => {
    if (ctx.chat.id != env.OWNER_ID) {
      return next();
    }
    const memoryUsed = Math.ceil(Deno.memoryUsage().rss / 1024 / 1024);
    return ctx.reply(
      `Uptime: ${
        (Date.now() - startTime) / 1_000 / 60 / 60
      }h\nMemory used: ${memoryUsed} MB\nRequests processed: ${requestsProcessed}`,
    );
  });
});

await client.start(env.BOT_TOKEN);
await client.sendMessage(env.OWNER_ID, "Up.");
