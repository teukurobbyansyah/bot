import { Telegraf } from "telegraf";

let options = {
  channelMode: true,
}

const bot = new Telegraf("1384020113:AAGOBV_Q8jwZSTctnVIZq1fGrTdReKqYbdQ", options);

bot.on('channel_post', (ctx) => {
  console.log(ctx.update.channel_post.sender_chat);
  ctx.telegram.sendMessage('-1001578100427', 'your content')
})

bot.command("quit", (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  ctx.leaveChat();
});

bot.on("text", (ctx) => {
  // Explicit usage
  // console.log(ctx);
  // console.log(ctx.update.message.from);
  // console.log(ctx.update.message.chat);
  // console.log(ctx.update.message.text);
  // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

  // ctx.telegram.forwardMessage(937253559, 52696870, 462)

  // Using context shortcut
  // ctx.reply(`Hello ${ctx.state.role}`);

  ctx.reply("Hi there!", {
    reply_markup: {
      inline_keyboard: [
        /* Inline buttons. 2 side-by-side */
        [
          { text: "Button 1", callback_data: "btn-1" },
          { text: "Button 2", callback_data: "btn-2" },
        ],

        /* One button */
        [{ text: "Next", callback_data: "next" }],

        /* Also, we can have URL buttons. */
        [{ text: "Open in browser", url: "telegraf.js.org" }],
      ],
    },
  });
});

bot.on("callback_query", (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  ctx.answerCbQuery();
});

bot.on("inline_query", (ctx) => {
  const result = [];
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  ctx.answerInlineQuery(result);
});

bot.command("oldschool", (ctx) => ctx.reply("Hello"));
bot.command("hipster", Telegraf.reply("λ"));

bot.command("about", (ctx) => {
  ctx.reply("Hi there!", {
    reply_markup: {
      inline_keyboard: [
        /* Inline buttons. 2 side-by-side */
        [
          { text: "Button 1", callback_data: "btn-1" },
          { text: "Button 2", callback_data: "btn-2" },
        ],

        /* One button */
        [{ text: "Next", callback_data: "next" }],

        /* Also, we can have URL buttons. */
        [{ text: "Open in browser", url: "telegraf.js.org" }],
      ],
    },
  });
});
bot.launch();
console.log("BOT is Running");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
