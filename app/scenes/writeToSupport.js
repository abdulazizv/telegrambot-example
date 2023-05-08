const Markup = require("telegraf/markup");
const WizardScene = require("telegraf/scenes/wizard");
const Composer = require("telegraf/composer");
const { match } = require("telegraf-i18n");
const { ChatsModel } = require("../models");
const { saveSession } = require("../methods");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("5623718105:AAEssxfe9CBp7rl0ohuFiseH-YNKNdSbWBY");
const admin_id = '1622168001'
function BasicCommandsHandler(handler) {
    if (!handler) {
      handler = new Composer();
    }
    handler.command(
      "start",
      async (ctx) => (await global.routes.start(ctx, false), ctx.scene.leave())
    );
    return handler;
  
}

module.exports = new WizardScene(
    'write-support',async (ctx) => {
        ctx.replyWithHTML(
            ctx.i18n.t("descriptionSupport"),
            Markup.keyboard([
                [ctx.i18n.t("main-menu")]
            ])
            .resize()
            .extra()
        )
        return ctx.wizard.next()
    },
    BasicCommandsHandler()
    .hears(match("main-menu"),async (ctx) => {
        await ctx.scene.leave();
        return global.routes.start(ctx);
    })
    .on("text",async(ctx) => {
        await bot.telegram.sendMessage(admin_id,ctx.message.text);
        ctx.reply(ctx.i18n.t("success_message"));
        await ctx.scene.leave();
        return global.routes.start(ctx);
    })
)