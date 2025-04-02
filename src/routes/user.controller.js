import {Router} from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/user',async (req, res) => {
    const existsUser = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        }
    });
    if(existsUser) return res.status(409).send({ msg: 'User already exists' });
    const newUser = await prisma.user.create({
        data: {
            ...req.body,
        }
    });
    res.json(newUser);
});

router.get('/user', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.get('/user/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {id: +req.params.id}
    });
    if(!user) return res.status(404).send({ msg: 'User not found' });
    res.json(user);
});

router.patch('/user/:id', async (req, res) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if(!foundUser) return res.status(404).send({ msg: 'User not found' });

    const updateUser = await prisma.user.update({
        where: {id: +req.params.id},
        data: {
            ...req.body,
        }
    });
    res.json(updateUser);
});

router.delete('/user/:id', async (req, res) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if(!foundUser) return res.status(404).send({ msg: 'User not found' });

    const deleteUser = await prisma.user.delete({
        where: {id: +req.params.id}
    });
    res.json({id: deleteUser.id});
});

export default router;



