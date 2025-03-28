const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const app = express();

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.json({"message": "Welcome to application"});
    });

    app.post('/user',async (req, res) => {
        const newUser = await prisma.user.create({
            data: {
                ...req.body,
            }
        });
        res.json(newUser);
    });

    app.get('/user', async (req, res) => {
        const users = await prisma.user.findMany();
        res.json(users);
    });

    app.get('/user/:id', async (req, res) => {
        const user = await prisma.user.findUnique({
            where: {id: +req.params.id}
        });
        res.json(user);
    })

    app.patch('/user/:id', async (req, res) => {
        const updateUser = await prisma.user.update({
            where: {id: +req.params.id},
            data: {
                ...req.body,
            }
        });
        res.json(updateUser);
    });

    app.delete('/user/:id', async (req, res) => {
        const deleteUser = await prisma.user.delete({
            where: {id: +req.params.id}
        });
        res.json({id: deleteUser.id});
    })

    app.listen(3000, () => {
        console.log('Server is listening on port 3000')
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
