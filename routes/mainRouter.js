import { Router } from 'express';
var router = Router();
import { indexFunc} from '../controller/userControl'



/* GET home page. */
router.get('/', indexFunc);

  
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('respond with a resource');
  });

export {router};
