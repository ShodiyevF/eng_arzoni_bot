import { CommandContext } from "grammy";
import { count } from "drizzle-orm";

import BotContext from "@customTypes/botcontext";
import { users } from "@database/schema";
import { db } from "@database/pg";

async function statisticsHelper(bot: CommandContext<BotContext>) {
    try {
        const members = await db.select({
            count: count()
        })
        .from(users)

        return bot.reply(`Obunachilar soni: <b>${members[0].count}</b> ta`, {
            parse_mode: 'HTML'
        })
    } catch (error) {
        bot.reply('хатолик')
    }
}

export default statisticsHelper