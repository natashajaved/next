import axios from 'axios'
import cc from 'country-state-city'
import { PrayTimes } from 'islamic-prayer-times'
import moment from 'moment'
import '../styles/globals.css'



function MyApp({ Component, pageProps }) {

  console.log({ pageProps })
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ Component, ctx: context, }) => {
  console.log({ Component })
  let pageProps
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(context);
  }

  let ipRes = await axios.get('https://www.cloudflare.com/cdn-cgi/trace')
  const regex = /ip=[\d.]+/g

  console.log({ ipRes: ipRes.data.match(regex) })
  const ip = ipRes.data.match(regex)
  const isServer = !!context.req


  const clientIP = ip[0] ? ip[0].replace(/[ip=]/g, '') : '127.0.0.1'
  // context.req && context.req.clientIp ? context.req.clientIp !== '::1' ? context.req.clientIp : '127.0.0.1' : '127.0.0.1'
  console.log({
    isServer,
    actualip: context.req.clientIp,
    xforwarded: context.req.headers['x-forwarded-for'],
    clientIP,
    c: context.req,
    d: 'as'
  })

  const axiousIns = axios.create()
  axiousIns.interceptors.request.use(function (config) {
    console.log({ config, url: config.url })
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  // Call an external API endpoint to get posts
  let prayers = {}
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }

  //const position = await navigator.geolocation.getCurrentPosition((pos)=>{return pos},()=>{return{}})
  let Latitude = '31.5204'
  let Longitude = '74.3587'
  let loc = await axiousIns.post(`http://api.accuweather.com/locations/v1/cities/ipaddress?q=${clientIP}&apikey=ekhA5PxPCm3KgNImGcXtjUJqRd4Rt3Cb`)
  if (loc?.data) {
    const geo = loc.data.GeoPosition
    Latitude = geo.Latitude
    Longitude = geo.Longitude
  }

  let res = await axiousIns
    .post(
      `http://api.accuweather.com/locations/v1/cities/geoposition/search.json?q=${Latitude},${Longitude}&apikey=ekhA5PxPCm3KgNImGcXtjUJqRd4Rt3Cb&language=en&details=false`
    )
  //const json = await res.data.json()


  let allc = cc.getCitiesOfCountry('AF')
  let cities = await axiousIns.get('https://countriesnow.space/api/v0.1/countries')
  return {
    pageProps: {
      ...pageProps,
      cities: cities.data,
      prayers: res.data,
      gmt: res.data.TimeZone.GmtOffset,
      loc: loc.data,
      headers: context.req.headers,
      actualip: context.req.clientIp,
      clientIP: clientIP ? clientIP : 'none found',
      allc,
      stars: PrayTimes().getTimes(
        moment().toDate(),
        [Latitude, Longitude],
        res.data.TimeZone.GmtOffset
        // "auto",
        // "24h"
      )

    }
  }
}


export default MyApp
