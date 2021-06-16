const router = require('express').Router();
const checkToken=require('../middelwers/verify-token')
const{addImgBySite,getImages, addComputer}=require('../controllers/imgController')
//images

router.post('/addImageStock',checkToken,addImgBySite);
// router.post('/addImageComputer',checkToken,addImgByUser);
router.get('/getImages/:userId',checkToken,getImages)
router.post('/add',checkToken,addComputer)
module.exports = router