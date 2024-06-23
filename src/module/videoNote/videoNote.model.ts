import { Scene } from "grammy-scenes";
import { InputFile } from "grammy";
import path from "path";
import fs from "fs";

import resizeVideo from "@lib/ffmpeg_resizer.lib";

const scene = new Scene('videoNote')

let fileTypes = ['mov', 'mp4', 'avi', 'mpg', 'mpeg', 'webm']

scene.step(async ctx => {
    ctx.reply('Жараён бошланди, илтимос кутиб туринг!')
    
    if (!ctx.update.message?.video && !ctx.update.message?.document) {
        return ctx.reply('Iltimos video yuboring')
    }
    
    const msgId = ctx.update.message.message_id
    const chatId = ctx.update.message?.chat.id;
    let videoId = ''

    if (ctx.update.message.video) {
        videoId = ctx.update.message.video.file_id;
    } else if (ctx.update.message.document) {
        if (!ctx.update.message.document.file_name) {
            return ctx.reply('Iltimos video yuboring')
        }

        const fileType = ctx.update.message.document.file_name.split('.')
        if (!fileTypes.includes(fileType[fileType.length - 1].toLowerCase())) {
            return ctx.reply('Iltimos video yuboring')
        }
        
        videoId = ctx.update.message?.document.file_id;
    }
    
    
    const getFile = await ctx.api.getFile(videoId);
    
    const filePath = getFile.file_path;

    if (!filePath) {
        return ''
    }

    const inputVideoPath = filePath
    const outputVideoPath = path.join(process.cwd(), `${filePath.split('/').pop()}_output.mp4`);
    
    try {
        await resizeVideo(inputVideoPath, outputVideoPath)

        await ctx.api.sendVideoNote(chatId, new InputFile(outputVideoPath), {
            reply_parameters: {
                message_id: msgId
            }
        })
    } catch (error) {
        ctx.reply('Хатолик, илтимос қайта урунинг.')
    }

    fs.rmSync(outputVideoPath)
})

export default scene