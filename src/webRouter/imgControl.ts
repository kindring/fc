import logger from "../lib/logger";
import {openPc} from "../lib/wol";
import router from "./pcControl";
import {mvImgFile, MvMode, showDirs} from "../control/imgManager";

router.get('/showDir',(req, res)=> {
    res.json({
        code:0,
        data: showDirs()
    });
    res.json({
        code:0,
        msg:'ok'
    });
})

router.get('/moveFile',(req, res)=> {
    try {
        const checkPath = req.query.src as string;
        const destPath = req.query.dest as string;
        const extName = req.query.extName as string;
        const minRating = req.query.rating ? Number(req.query.rating) : 1;
        const checkSubDir = req.query.subDir === '1';
        const mvModeValue = req.query.mode as string;
        const mvMode = mvModeValue === 'move' ? MvMode.move : MvMode.copy;

        if (!checkPath || !destPath || !extName)
            return res.status(400).json({ code: -1, msg: '参数错误: src: images, dest: target, extName: xmp, move: move|copy' });
        const result = mvImgFile({
            checkPath: checkPath,
            targetPath: destPath,
            checkSubDir: checkSubDir,
            extName: extName,
            minRating: minRating,
            mvMode: mvMode,
        });
        res.json({ code: 0, data: { moved: result } });
    } catch (e)
    {
        logger.error(e);
        res.status(500).json({ code: -1 });
    }
})


export default router;
