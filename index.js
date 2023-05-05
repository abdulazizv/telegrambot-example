const Telegraf = require("telegraf");
const TelegrafI18N = require("telegraf-i18n");
const Stage = require("telegraf/stage");
const Markup = require("telegraf/markup");
const { match } = TelegrafI18N;
const path = require("path");
const scenes = require("./scenes");
const { ChatsModel } = require("./app/models");

const { mysqlSession, saveSession } = require("./app/methods");
const bot = new Telegraf(process.env.BOT_TOKEN);

global.i18n = new TelegrafI18N({
    useSession:true,
    directory: path.resolve(__dirname,"app/locales"),
    defaultLanguage:"unset"
});

const stage = new Stage(Object.keys(scenes).map((x) => scenes[x]));
const enter = (scene) => (ctx) => ctx.scene.enter(scene);

bot.use(async (ctx,next) => {
    if(ctx.chat && ctx.chat.type !== "private") {
        return;
    }
    return next(ctx);
});

bot.use(mysqlSession.middleware());
bot.use(i18n.middleware());
bot.use(stage.middleware());

global.routes = {
    start: async(ctx,welcome = true) => {
        if(!ctx.session.__language_code || ctx.i18n.locale() === "unset") {
            
        }
    }
}