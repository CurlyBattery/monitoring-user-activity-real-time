import {Router} from 'express';
import userService from "../services/user.service.js";

const router = Router();

router.post('/user',async (req, res) => {
    return userService.create(req, res);
});

router.get('/user', async (req, res) => {
    return userService.getUsers(req, res);
});

router.get('/user/:id', async (req, res) => {
    return userService.getUser(req, res);
});

router.patch('/user/:id', async (req, res) => {
    return userService.update(req, res);
});

router.delete('/user/:id', async (req, res) => {
    return userService.delete(req, res);
});

export default router;



