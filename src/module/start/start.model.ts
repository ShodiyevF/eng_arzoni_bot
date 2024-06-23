import { Scene } from "grammy-scenes";

const scene = new Scene('start');

scene.step(async (ctx) => {
    const message = `Видео юборинг!`;
    
    await ctx.reply(message);
    scene.exit()
});

export default scene;
