// expres CRUD for Person prisma model
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
/**
 * function get all role
 * @param req Request
 * @param res Response
 */

export const getRole= async (req: Request, res: Response) => {
    
    const role = await prisma.role.findMany();
    if (role.length > 0) {
        res.status(200).json(role);
    } else {
        res.status(404).json({
            message: "Aucun role n'a été trouvé",
        });
    }
}
/**
 * function get role by id
 * @route  POST /api/role/:id
 * @returns role by id
 */
export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
        where: {
            ID_role: id,
        },
    });
    if (role !== null) {
        res.status(200).json(role);
    } else {
        res.status(404).json({
            message: "Aucun role n'a été trouvé",
        });
    }
}

export const getRoleByIdPerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const owner = await prisma.owner.findMany({
        where: {
            ID_person: Number(id),
        },
    });
    const role = await prisma.role.findUnique({
        where: {
            ID_role: owner[0].ID_role,
        },
    });
    if (role) {
        res.status(200).json(role);
    }
}

/**
 * function create role
 * @route  POST /api/role/
 * @returns role created
 */
export const createRole = async (req: Request, res: Response) => {
    const { roleCreated } = req.body;
    const roleCreatedName = roleCreated.Role_name;
    // test si le non du role existe deja
    let role = await prisma.role.findUnique({
        where: {
            Role_name: roleCreatedName,
        },
    });
    if (role) {
        return res.status(400).json({
            msg: `Le role ${roleCreatedName} existe deja`,
        });
    } else {
        role = await prisma.role.create({
            data: roleCreated,
        });
    }
    res.json(role);
}
export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roleUpdated } = req.body;
    const roleUpdatedName = roleUpdated.Role_name;
    // test si le non du role existe deja
    let role = await prisma.role.findUnique({
        where: {
            Role_name: roleUpdatedName,
        },
    });
    if (role) {
        return res.status(400).json({
            msg: `Le role ${roleUpdatedName} existe deja`,
        });
    } else {
        role = await prisma.role.update({
            where: {
                ID_role: id,
            },
            data: roleUpdated,
        });
    }
    res.json(role);
}

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const role = await prisma.role.delete({
        where: {
            ID_role: id,
        },
    });
    res.json(role);
}
