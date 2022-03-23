const multer = require('multer');
const fse = require('fs-extra')
const path = require('path');;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        // const dir = '../../uploads';
        const dir = path.join(__dirname, "../../uploads");
        if (!fse.existsSync(dir))
            fse.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        console.log(file);
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + "." + extension);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


module.exports.upload = upload;