import crypto from 'crypto'

const algorithm = 'aes-256-ctr'

export const encrypt = (buffer: any, keyword = 'v4l3n01r5'): any => {
  const key = crypto
    .createHash('sha256')
    .update(String(keyword))
    .digest('base64')
    .substring(0, 32)

  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, key, iv)

  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()])

  return result
}

export const decrypt = (encrypted: any, keyword = 'v4l3n01r5'): any => {
  const key = crypto
    .createHash('sha256')
    .update(String(keyword))
    .digest('base64')
    .substring(0, 32)

  const iv = encrypted.slice(0, 16)

  const buffer = encrypted.slice(16)

  const dechiper = crypto.createDecipheriv(algorithm, key, iv)

  const result = Buffer.concat([dechiper.update(buffer), dechiper.final()])

  return result
}
