const multer = require('multer');
const fs = require('fs');

const useMulterStorage = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const path = './public/uploads';

            // אם התיקייה לא קיימת, ניצור אותה
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }
            cb(null, path); // תיקייה שמירת הקבצים
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + "-" + file.originalname); // שם הקובץ
        }
    });

    return multer({ storage: storage });
}

module.exports = useMulterStorage;
