import { Request, Response, Router } from 'express'

export const router = Router()

// Public
router.get('/', async (req: Request, res: Response) => {
  return res.render('index', {
    layout: 'layout',
    notification: req.flash('notification'),
  })
})

router.get('/faq', async (req: Request, res: Response) => {
  return res.render('faq', {
    layout: 'layout',
    notification: req.flash('notification'),
  })
})

router.get('/algorithm', async (req: Request, res: Response) => {
  return res.render('algorithm', {
    layout: 'layout',
    notification: req.flash('notification'),
  })
})
