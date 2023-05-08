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
    'choose-optionOrder',
        async (ctx) => {
            ctx.replyWithHTML(
                ctx.i18n.t("start-order"),
                Markup.keyboard([
                    [ctx.i18n.t("withdelivery"),ctx.i18n.t("withsoboy")],
                    [ctx.i18n.t("main-menu")]
                ])
                .resize()
                .extra()
            )
            return ctx.wizard.next()
        },
        (new Composer())
        .hears(match("withdelivery"),async (ctx) => {
            return global.routes.start(ctx)
        }) 
        .hears(match("withsoboy"),async (ctx) => {
            return global.routes.start(ctx);
        })
        .hears(match("main-menu"),async (ctx) => {
            return global.routes.start(ctx);
        })
)