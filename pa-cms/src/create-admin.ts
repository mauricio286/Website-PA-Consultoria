import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const { getPayload } = await import('payload')
const { default: config } = await import('./payload.config.js')

async function run() {
  const payloadInstance = await getPayload({ config })
  const email = 'admin@agropa.com.br'
  const password = 'AdminPassProd2026!'

  console.log(`Checking if user ${email} exists...`)

  const existing = await payloadInstance.find({
    collection: 'users',
    where: {
      email: { equals: email }
    }
  })

  if (existing.docs.length > 0) {
    console.log(`User exists. Updating name, role and password...`)
    await payloadInstance.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: {
        name: 'Administrador',
        role: 'admin',
        password: password
      }
    })
    console.log(`User updated successfully!`)
  } else {
    console.log(`User does not exist. Creating...`)
    await payloadInstance.create({
      collection: 'users',
      data: {
        email: email,
        name: 'Administrador',
        role: 'admin',
        password: password
      }
    })
    console.log(`User created successfully!`)
  }
  process.exit(0)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
