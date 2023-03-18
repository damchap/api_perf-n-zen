import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const sector1 = await prisma.sector.upsert({
        where: {
            ID_sector: 1
        },
        update: {},
        create: {
            Sector_name: 'Test',
        }
    });
    const compagny1 = await prisma.compagny.upsert({
        where: {
            ID_compagny: 1
        },
        update: {},
        create: {
            Compagny_name: 'Test',
            Activity_sector: "Test",
            Mail_adress:"test@test.fr",
            Postal_adress: "29100",
            Sector: {
                connect: {
                    ID_sector: sector1.ID_sector
                }
            }
        }
    });
    const damien = await prisma.person.upsert({
        where: {
            ID_person: 1
        },
        update: {},
        create: {
            Mail_adress: 'dam@test.fr',
            First_name: 'Damien',
            Last_name: 'Test',
            Password: 'test',
            Compagny: {
                connect: {
                    ID_compagny: compagny1.ID_compagny
                }
            }
        }
    })
    const adeline = await prisma.person.upsert({
        where: {
            ID_person: 2
        },
        update: {},
        create: {
            Mail_adress: 'adeline@test.fr',
            First_name: 'adeline',
            Last_name: 'Test',
            Password: 'test',
            Compagny: {
                connect: {
                    ID_compagny: compagny1.ID_compagny
                }
            }
        }
    })
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