// str = str.replace(/\s+/g, ''); REGEX remove space and \n from string
import { Request, Response } from 'express'
import { encrypt, decrypt } from '../utils/crypt'
import path from 'path'
import { appendFileSync } from 'fs-extra'

const dir = path.join(__dirname, '../public/tmp')

export const encryptFile = async (req: Request, res: Response) => {
  console.log('ENCRYPT')
  console.log(req.file)
  try {
    const { keyword } = req.body

    const ext = path.extname(req.file!.originalname)

    const fileName = Date.now().toString() + ext

    const startTime = new Date().getTime()

    const encrypted = encrypt(req.file?.buffer, keyword.replace(/\s+/g, ''))

    const endTime = new Date().getTime()

    console.log(
      'ENCRYPT TIME :',
      ((endTime - startTime) / 1000)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      ' Second'
    )

    appendFileSync(`${dir}/${fileName}`, encrypted, 'binary')

    res.download(`${dir}/${fileName}`)
  } catch (error) {
    return
  }
}

export const decryptFile = async (req: Request, res: Response) => {
  console.log('DECRYPT')
  console.log(req.body)
  console.log(req.file)
  try {
    const { keyword } = req.body

    const ext = path.extname(req.file!.originalname)

    const fileName = Date.now().toString() + ext

    const startTime = new Date().getTime()

    const decrypted = decrypt(req.file?.buffer, keyword.replace(/\s+/g, ''))

    const endTime = new Date().getTime()

    console.log(
      'DECRYPT TIME :',
      ((endTime - startTime) / 1000)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      ' Second'
    )

    appendFileSync(`${dir}/${fileName}`, decrypted, 'binary')

    res.download(`${dir}/${fileName}`)
  } catch (error) {
    return
  }
}
