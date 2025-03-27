import express from 'express';
import users from './users';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Routes!');
});

router.use('/users', users);

export default router;
