const Markup = require("telegraf/markup");
const WizardScene = require("telegraf/scenes/wizard");
const Composer = require("telegraf/composer");
const { match } = require("telegraf-i18n");
const { ChatsModel, OrdersModel } = require("../models");
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
    'order',
    async (ctx) => {
        const order = await OrdersModel.getAllOrders();
        if(order.length < 1) {
            await ctx.scene.leave()
            return ctx.reply(ctx.i18n.t("noContentinOrder"),
                Markup.keyboard(
                    [
                        [ctx.i18n.t("")]
                    ]
                )
            )
        } else {
            await ctx.scene.leave()
            ctx.reply("Hello World");
            global.routes.start(ctx);
        }
    }
)