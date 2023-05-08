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
    'settings',
    async (ctx) => {
        await ctx.reply(
            ctx.i18n.t("settings"),
            Markup.keyboard(
              [
                  [ctx.i18n.t("setPhone"), ctx.i18n.t("setLanguage")],
                  [ctx.i18n.t("main-menu")],
              ],
              { columns: 1 }
            )
              .resize()
              .extra()
          );
        return ctx.wizard.next()
    },
    (new Composer())
    .hears(match("setPhone"),async (ctx) => {
        await Markup.removeKeyboard().extra();
        ctx.reply(ctx.i18n.t("descriptionforSetPhone"))
    })
    .hears(/^(\+)?998(\s)?\d{2}(\s)?\d{3}(\s)?\d{4}$/,async (ctx) => {
        if(ctx.message.text == "/start") {
            return global.routes.start(ctx)
        }   
        let phone = ctx.message.text.replace(/[\+\s+]/g, "");
        ctx.session.phone = phone;
        saveSession(ctx);
        await ctx.reply(
            ctx.i18n.t("afterChangephoneNumber"),
            Markup.keyboard(
              [
                  [ctx.i18n.t("settings"), ctx.i18n.t("main-menu")],
              ],
              { columns: 1 }
            )
              .resize()
              .extra()
          );
        await ctx.scene.leave();
    }
    )
    .hears(match("setLanguage"),async (ctx) => {
        return ctx.scene.enter('select-language');
    }),
    BasicCommandsHandler()
    .hears(match("main-menu"),async (ctx) => {
        await ctx.scene.leave();
        return global.routes.start(ctx);
    })
    .hears(match("settings"),async (ctx) => {
        await ctx.scene.leave();
        await ctx.scene.enter('settings')
    })
    
    
)