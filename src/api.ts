import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'

const api = new Hono()

const prisma = new PrismaClient()

api.get('/', (c) => c.text('Hello Hono!'))
api.get('/:id', async (c) => {
  const id = c.req.param('id')

  const res = await prisma.log.findUnique({
    where: {id: id}
  })

  const message = res?.message
  
  if (message) { return c.text(message) }
  return c.text('nothing')
})