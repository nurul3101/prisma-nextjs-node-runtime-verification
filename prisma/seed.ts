import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      posts: {
        create: [
          {
            title: 'Alice\'s First Post',
            content: 'This is Alice\'s first post.',
            published: true,
          },
          {
            title: 'Alice\'s Draft',
            content: 'This is Alice\'s draft.',
            published: false,
          },
        ],
      },
    },
  })

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      posts: {
        create: [
          {
            title: 'Bob\'s Published Post',
            content: 'This is Bob\'s published post.',
            published: true,
          },
        ],
      },
    },
  })

  console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })