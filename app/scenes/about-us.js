const Markup = require("telegraf/markup");
const WizardScene = require("telegraf/scenes/wizard");
const Composer = require("telegraf/composer");
const { match } = require("telegraf-i18n");
const { ChatsModel } = require("../models");
const { saveSession } = require("../methods");

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
    'about-us',
    async (ctx) => {
        ctx.replyWithHTML(ctx.i18n.t("about_usdescription"));
        ctx.replyWithLocation(41.30020525535803, 69.20969968012261,
            Markup.keyboard([
                [ctx.i18n.t("main-menu"),ctx.i18n.t("choose-food")]
            ])
        );
        return ctx.wizard.next()
    },
    BasicCommandsHandler()
    .hears(match("main-menu"),async (ctx) => {
        await ctx.scene.leave();
        return global.routes.start(ctx);
    })
    .hears(match("choose-food"),async (ctx) => {
        await ctx.scene.leave();
        console.log("choose-food")
        return global.routes.start(ctx);
    })
)