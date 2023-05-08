const Telegraf = require("telegraf");
const TelegrafI18N = require("telegraf-i18n");
const Stage = require("telegraf/stage");
const Markup = require("telegraf/markup");
const { match } = TelegrafI18N;
const path = require("path");
const scenes = require("./app/scenes/index");
const { ChatsModel } = require("./app/models");

const { mysqlSession, saveSession } = require("./app/methods");
const bot = new Telegraf("5623718105:AAEssxfe9CBp7rl0ohuFiseH-YNKNdSbWBY");

global.i18n = new TelegrafI18N({
  useSession: true,
  directory: path.resolve(__dirname, "app/locales"),
  defaultLanguage: "unset",
});

const stage = new Stage(Object.keys(scenes).map((x) => scenes[x]));
const enter = (scene) => (ctx) => ctx.scene.enter(scene);

bot.use(async (ctx, next) => {
  if (ctx.chat && ctx.chat.type !== "private") {
    return;
  }
  return next(ctx);
});

bot.use(mysqlSession.middleware());
bot.use(i18n.middleware());
bot.use(stage.middleware());

global.routes = {
  start: async (ctx, welcome = true) => {
    if (!ctx.session.__language_code || ctx.i18n.locale() === "unset") {
      const check = await ChatsModel.getById(ctx.from.id);
      if (!check) {
        await ChatsModel.saveUser(ctx.from);
      }
      return global.routes.selectLanguage(ctx);
    }
    if (!ctx.session.phone || !ctx.session.isRegistered) {
      return global.routes.register(ctx);
    }
    ctx.session.cart = [];
    ctx.session.__scenes = {};
    await saveSession(ctx);

    return ctx.reply(
      welcome ? ctx.i18n.t("greeting") : ctx.i18n.t("main-menu"),
      Markup.keyboard(
        [
          [ctx.i18n.t("choose-food")],
          [ctx.i18n.t("settings"), ctx.i18n.t("korzinka")],
          [ctx.i18n.t("about-us"), ctx.i18n.t("support")],
        ],
        { columns: 1 }
      )
        .resize()
        .extra()
    );
  },

  selectLanguage: enter("select-language"),
  register: enter("register"),
};

bot.on("text", (ctx) => {
  global.routes.start(ctx);
});

bot.catch((err) => {
  console.log("Ooops", err);
});
bot.telegram.deleteWebhook();
bot.launch();
