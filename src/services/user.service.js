import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserService {
  constructor() {}

  async create(req, res) {
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
  }

  async getUsers(req, res) {
    const users = await prisma.user.findMany();
    res.json(users);
  }

  async getUser(req, res) {
    const user = await prisma.user.findUnique({
      where: {id: +req.params.id}
    });
    if(!user) return res.status(404).send({ msg: 'User not found' });
    res.json(user);
  }

  async update(req, res) {
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
  }

  async delete(req, res) {
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
  }

}


export default new UserService();

