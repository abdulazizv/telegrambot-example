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
    "register",
    async (ctx) => {
        ctx.replyWithHTML(
            ctx.i18n.t("start-sharePhone"),
            Markup.keyboard([Markup.contactRequestButton(ctx.i18n.t("my-number"))])
            .resize()
            .extra()
        )
        return ctx.wizard.next();
    },
    BasicCommandsHandler()
    .on("contact",async(ctx) => {
      let phone = ctx.message.contact.phone_number.replace(/\+/,"");
      ctx.session.phone = phone;
      saveSession(ctx);
      return global.routes.start(ctx);
    })  
)