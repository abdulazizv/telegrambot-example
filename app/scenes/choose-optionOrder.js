const Markup = require("telegraf/markup");
const WizardScene = require("telegraf/scenes/wizard");
const Composer = require("telegraf/composer");
const { match } = require("telegraf-i18n");
const { ChatsModel,ProductsModel } = require("../models");
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
            const products = await ProductsModel.getAllProducts();
            let keyboard = [ctx.i18n.t('korzinka'), ctx.i18n.t('back')]
            .concat(
            products.map(product => product.id + ". " + product.name)
            )
            // return global.routes.start(ctx);
            return ctx.reply(
                ctx.i18n.t('what-size'),
                Markup.keyboard(keyboard, {
                  columns: 2
                }).resize().extra()
              )
        })
        .hears(match("main-menu"),async (ctx) => {
            return global.routes.start(ctx);
        })
        .hears(match("back"),async (ctx) => {
            await ctx.scene.leave()
            return global.routes.start(ctx);
        })
)