import config from './config/config'
import express, { Express, Request, Response } from 'express'
import path from 'path'
import methodOverride from 'method-override'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import flash from 'connect-flash'

// Import Routes
import { router as viewRoute } from './routes/view'
import { router as fileRoute } from './routes/file'

// Init
const app: Express = express()
const port = config.PORT

// Middleware
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: config.SESSION_LIFETIME,
    },
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(flash())

// User Session
app.use((req, res, next) => {
  if (req.session.user) res.locals.user = req.session.user
  if (req.session.admin) res.locals.admin = req.session.admin

  next()
})

// Templating Engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// HTTP Routes
app.use('/', viewRoute)
app.use('/file', fileRoute)

// Ping
app.get('/ping', (req: Request, res: Response) => {
  console.log(`[server]: OK! ${req.headers.host} pinging the server`)
  return res.status(200).send({
    success: true,
    status: 200,
    data: {
      message: 'valenoirs',
    },
  })
})

// 404
app.use('/', (req: Request, res: Response) => {
  return res.status(404).send({
    error: true,
    status: 404,
    type: 'NotFound',
    data: {
      message: 'No API endpoint found.',
    },
  })
})

// Server
app.listen(port, (): void => {
  console.log(`[server]: OK! server running at port ${port}`)
})
