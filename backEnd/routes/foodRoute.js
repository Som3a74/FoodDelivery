// import express from "express";
// import { addFood, listFood, removeFood} from "../controllers/foodController.js";
// import multer from "multer";

// const foodRouter = express.Router();

// // image storage engine
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// foodRouter.post("/add", upload.single("image"), addFood);
// foodRouter.get("/list", listFood);
// foodRouter.post("/remove", removeFood);
// export default foodRouter;

// import express from "express";
// import { addFood, listFood, removeFood } from "../controllers/foodController.js";
// import multer from "multer";

// const foodRouter = express.Router();

// // إعداد التخزين في الذاكرة
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// foodRouter.post("/add", upload.single("image"), addFood);
// foodRouter.get("/list", listFood);
// foodRouter.post("/remove", removeFood);

// export default foodRouter;


import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const foodRouter = express.Router();

// إعداد Cloudinary باستخدام متغيرات البيئة
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// إعداد التخزين على Cloudinary باستخدام multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // اسم المجلد على Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"] // تنسيقات الملفات المسموح بها
  }
});

const upload = multer({ storage: storage });

// المسارات
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;