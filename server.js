const express = require('express')
const next = require('next')
const { parse } = require('url')
const requestIp = require('request-ip')  // import it at the top 
const { createServer } = require('http')



const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()
console.log({ here: 'here' })
app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl
        ip = requestIp.getClientIp(req)
       
        if (pathname === '/') {
            console.log({ clientIpserver: ip })
            app.render({ ...req, clientIp: ip }, res, '/', query)
        } else if (pathname === '/b') {
            app.render(req, res, '/b', query)
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
    // const server = express()

    // server.all('*', (req, res) => {
    //     return handle(req, res)
    // })

    // server.listen(port, err => {
    //     if (err) throw err
    //     console.log(`> Ready on http://localhost:${port}`)
    // })

    // server.get('/', (req, res) => {
    //     ip = requestIp.getClientIp(req) 
    //     console.log({clientIpserver:ip})
    //     app.render(
    //         {
    //             ...req,
    //             clientIP: ip
    //         },
    //         res,
    //         '/index',
    //         req.query
    //     )
    // })

    // server.all('*', (req, res) => {
    //     return handle(req, res)
    // })
})


