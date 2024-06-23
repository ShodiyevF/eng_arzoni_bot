import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

function resizeVideo(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const width = 620;
        const height = 620;
        
        ffmpeg.ffprobe(inputPath, (err, metadata) => {
            if (err) {
                return reject(err);
            }
            
            const videoWidth = metadata.streams[0].width;
            const videoHeight = metadata.streams[0].height;
            const cropSize = Math.min(videoWidth || 0, videoHeight || 0);
            
            ffmpeg(inputPath)
            .videoFilters(`crop=${cropSize}:${cropSize}`)
            .size(`${width}x${height}`)
            .setDuration(60)
            .videoBitrate('800k')
            
            .output(outputPath)
            .on('end', () => {
                resolve();
            })
            .on('error', (err: Error) => {
                reject(err);
            })
            .run();
        });
    });
}

export default resizeVideo