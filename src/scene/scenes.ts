import { ScenesComposer } from "grammy-scenes"

import videoNote from '@module/videoNote/videoNote.model'
import start from '@module/start/start.model'

const scenes = new ScenesComposer(start, videoNote)

export default scenes