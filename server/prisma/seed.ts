const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const restrictions = [
    { type: 'CELIACO' },
    { type: 'LACTOSE' },
    { type: 'DIABETES' },
    { type: 'HIPERTENSAO' },
    { type: 'VEGANO' },
    { type: 'VEGETARIANO' },
    { type: 'APLV' },
    { type: 'TIREOIDE' },
    { type: 'FRUTOS_DO_MAR' },
    { type: 'NOZES' },
  ]

  for (const restriction of restrictions) {
    await prisma.restriction.create({
      data: restriction,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })