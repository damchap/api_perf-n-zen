"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const sector1 = yield prisma.sector.upsert({
            where: {
                ID_sector: 1
            },
            update: {},
            create: {
                Sector_name: 'Test',
            }
        });
        const compagny1 = yield prisma.compagny.upsert({
            where: {
                ID_compagny: 1
            },
            update: {},
            create: {
                Compagny_name: 'Test',
                Activity_sector: "Test",
                Mail_adress: "test@test.fr",
                Postal_adress: "29100",
                Sector: {
                    connect: {
                        ID_sector: sector1.ID_sector
                    }
                }
            }
        });
        const damien = yield prisma.person.upsert({
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
        });
        const adeline = yield prisma.person.upsert({
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
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
