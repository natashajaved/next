// const next = require('next')
// const cacheableResponse = require('cacheable-response')
// const helmet = require('helmet')
// const featurePolicy = require('feature-policy')
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const express = require('express')
// const server = express()

// const handle = app.getRequestHandler()

// const ssrCache = cacheableResponse({
//   ttl: 1000 * 60 * 60, // 1hour
//   get: async ({ req, res, pagePath, queryParams }) => ({
//     data: await app.renderToHTML(req, res, pagePath, queryParams)
//   }),
//   send: ({ data, res }) => res.send(data)
// })

// server.set('trust proxy', true);

// Header security. See: https://observatory.mozilla.org/
// server.use(helmet());

// //Sets "Referrer-Policy: same-origin".
// server.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// // Sets Feature-policy
// server.use(featurePolicy({
//     features: {
//       fullscreen: ["'self'"],
//       vibrate: ["'none'"],
//       payment: ['https://yyy.com'],
//       syncXhr: ["'self'"],
//       geolocation: ["'self'"]
//     }
// }));

// app.prepare().then(() => {
//   server.get('*', function(req,res,next) {
//     if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
//     res.redirect('https://'+req.hostname+req.url)
//     else
//     next() /* Continue to other routes if we're not redirecting */
//   });

//   server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

//   server.get('*', (req, res) => handle(req, res))

//   server.listen((port, err) => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:3000`)
//   })
// })



const express = require('express')
const next = require('next')
const { parse } = require('url')
const requestIp = require('request-ip')  // import it at the top 
const { createServer } = require('http')
const { hostname } = require('os')


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
        console.log({ headers:req.headers })

        if (pathname === '/') {
            console.log({ clientIpserver: ip })
            app.render({ ...req, clientIp: ip, started:'yes' }, res, '/', query)
        } else if (pathname === '/b') {
            app.render(req, res, '/b', query)
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(port,hostname, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:'+port, {hostname})
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













// const express = require('express')
// const next = require('next')
// const { parse } = require('url')
// const requestIp = require('request-ip')  // import it at the top 
// const { createServer } = require('http')



// const port = parseInt(process.env.PORT, 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()
// const server = express()
// console.log({ here: 'here' })
// app.prepare().then(() => {
//     createServer((req, res) => {
//         // Be sure to pass `true` as the second argument to `url.parse`.
//         // This tells it to parse the query portion of the URL.
//         const parsedUrl = parse(req.url, true)
//         const { pathname, query } = parsedUrl
//         ip = requestIp.getClientIp(req)

//         if (pathname === '/') {
//             console.log({ clientIpserver: ip })
//             app.render({ ...req, clientIp: ip }, res, '/', query)
//         } else if (pathname === '/b') {
//             app.render(req, res, '/b', query)
//         } else {
//             handle(req, res, parsedUrl)
//         }
//     }).listen(3000, (err) => {
//         if (err) throw err
//         console.log('> Ready on http://localhost:3000')
//     })
//     // const server = express()

//     // server.all('*', (req, res) => {
//     //     return handle(req, res)
//     // })

//     // server.listen(port, err => {
//     //     if (err) throw err
//     //     console.log(`> Ready on http://localhost:${port}`)
//     // })

//     // server.get('/', (req, res) => {
//     //     ip = requestIp.getClientIp(req) 
//     //     console.log({clientIpserver:ip})
//     //     app.render(
//     //         {
//     //             ...req,
//     //             clientIP: ip
//     //         },
//     //         res,
//     //         '/index',
//     //         req.query
//     //     )
//     // })

//     // server.all('*', (req, res) => {
//     //     return handle(req, res)
//     // })
// })


