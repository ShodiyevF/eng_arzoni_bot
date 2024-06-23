import BotContext from "@customTypes/botcontext"
import { Bot } from "grammy"

export function starterScene(bot: Bot<BotContext>) {
    bot.command('start', (msg: any) => {
        msg.scenes.enter('start')
    }) 

    bot.on('message:video', async ctx => {
        ctx.scenes.enter('videoNote')
    })

    bot.on('message:document', async ctx => {
        ctx.scenes.enter('videoNote')
    })
}