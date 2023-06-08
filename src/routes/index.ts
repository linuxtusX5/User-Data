import express from 'express';
import users from './UserRoutes';

const router  = express.Router();

export default (): express.Router => {
    users(router);
    return router;
}