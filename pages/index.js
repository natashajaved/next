import Head from 'next/head'

import styles from '../styles/Home.module.css'
import axios from 'axios'
import moment from 'moment'
import { PrayTimes } from 'islamic-prayer-times'
import cc from 'country-state-city'

const index = (props) => {
  console.log({ props })
  const data = props.stars ? Object.keys(props.stars).map((k) => ({ name: k, time: props.stars[k] })) : []
  const mcontent =
    !data ?
      '' :

      data.reduce((acc, curr) => { return acc + ' ' + curr.name }, '')

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>

        <meta name="description" content={mcontent}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js Deployed</a>
        </h1>

        {data.map((p) => <p>{`${p.name} ${p.time}`}</p>)}
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <p>{props.clientIP}</p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
index.getLayout = (page) => { return <div>{page}</div> };







// Home.getS = async (ctx) => {
//   console.log({ctx},'hi')

//    let prayers={}
//   // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   // const json = await res.json()
//   // return { stars: json.stargazers_count }

//   //const position = await navigator.geolocation.getCurrentPosition((pos)=>{return pos},()=>{return{}})
//   const {coords:{latitude='32.5746688',longitude='71.57514239999999'}={}}= {}
//   axios
//     .post(
//       `http://api.accuweather.com/locations/v1/cities/geoposition/search.json?q=${latitude},${longitude}&apikey=ekhA5PxPCm3KgNImGcXtjUJqRd4Rt3Cb&language=en&details=false`
//     )
//     .then((res) => {
//       console.log(res);


//       prayers = PrayTimes().getTimes(
//         moment().toDate(),
//         [latitude, longitude],
//         res.data.TimeZone.GmtOffset
//         // "auto",
//         // "24h"
//       )


//     })
//     .catch((error) => {
//       console.log({ error });
//     });
//   return { stars: prayers }
// }

export default index