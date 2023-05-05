const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const Composer = require('telegraf/composer')

module.exports = new WizardScene(
  'select-language',
  ctx => {
    ctx.reply(
      'Здравствуйте! Давайте для начала выберем язык обслуживания!\n\nKeling, avvaliga xizmat ko’rsatish tilini tanlab olaylik.\n\nHi! Let\'s first we choose language of serving!',
      Markup.keyboard([
        '🇷🇺 Русский',
        '🇺🇿 O\'zbekcha',
        '🇬🇧 English'
      ], { columns: 1 }).resize().extra()
    )
    ctx.wizard.next()
  },
  (new Composer())
    .hears('🇺🇿 O\'zbekcha', async ctx => {
      ctx.i18n.locale('uz')
      await ctx.scene.leave()
      global.routes.start(ctx, false)
    })
    .hears('🇷🇺 Русский', async ctx => {
      ctx.i18n.locale('ru')
      await ctx.scene.leave()
      global.routes.start(ctx, false)
    })
    .hears('🇬🇧 English', async ctx => {
      ctx.i18n.locale('en')
      await ctx.scene.leave()
      global.routes.start(ctx, false)
    })
)
