import { Router } from 'express'
import * as file from '../controllers/file'
import multer from 'multer'

const upload = multer()

export const router = Router()

router.post('/encrypt', upload.single('file'), file.encryptFile)
router.post('/decrypt', upload.single('file'), file.decryptFile)
