import { Router } from 'express';
var router = Router();


router.get('/ping', function(req, res, next) {
  res.end();
});

export default router;
