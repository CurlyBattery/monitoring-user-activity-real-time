import { Router } from 'express';
import userController from './user.controller.js';

const router = Router();

router.use(userController);

export default router;