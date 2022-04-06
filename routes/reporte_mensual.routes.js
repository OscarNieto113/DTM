const express = require('express');
const router = express.Router();
const multer = require('multer');

const reporte_mensual_controller = require('../controllers/reporte_mensual_controller');

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor,
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().getTime()+ '-' + file.originalname);
    },
});

router.post('/post',multer({ storage: fileStorage }).single('imagen_reporte'),reporte_mensual_controller.post_reportes_mensuales);
router.get('/filtrar/:search', reporte_mensual_controller.search_date);
router.use('/', reporte_mensual_controller.get_reportes_mensuales);

module.exports = router;