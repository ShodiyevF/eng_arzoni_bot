import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { Api, Bot, session } from 'grammy';
import ffmpeg from 'fluent-ffmpeg';
import dotenv from 'dotenv';

import { starterScene } from '@scene/starter.scene';
import { syncUsers } from '@config/user.controller';
import BotContext from '@customTypes/botcontext';
import scenes from '@scene/scenes';

dotenv.config();

function initializer() {
    
    const botToken = process.env.BOT_TOKEN || 'not_found'
    
    const bot = new Bot<BotContext>(botToken, {
        client: {
            apiRoot: process.env.BOT_BASE_URL
        }
    });
    const api = new Api(botToken, {
        apiRoot: process.env.BOT_BASE_URL
    });

    function initializeMiddlewares():void {
        bot.use(
            session({ 
                initial: () => ({})
            })
        );
        
        bot.use(scenes.manager());
        bot.use(scenes);
    }

    function initializeFFMPEG():void {
        ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    }

    function libs():void {
        syncUsers(bot, api)
    }
    
    function initializeScenes():void {
        starterScene(bot)
    }

    function startBot():void {
        bot.start();
        console.log('SUCCESSFULLY ✅');
    }

    function runner():void {
        // initializeFFMPEG();
        initializeMiddlewares();
        initializeScenes();
        libs();
        startBot();
    }

    runner();

}

initializer();