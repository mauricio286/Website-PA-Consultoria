import { getPayload } from 'payload'
import config from './payload.config.js'

async function inspect() {
  const payloadInstance = await getPayload({ config })
  const homePage = await payloadInstance.findGlobal({
    slug: 'home-page',
  })
  console.log('--- HOMEPAGE DATA ---')
  console.log(JSON.stringify(homePage, null, 2))
  process.exit(0)
}

inspect().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
