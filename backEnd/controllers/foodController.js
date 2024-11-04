import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();


// إعداد Cloudinary باستخدام المتغيرات البيئية
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// إضافة عنصر غذائي
const addFood = async (req, res) => {
  try {
    // تحقق مما إذا كان الملف موجودًا
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // استخدام معلومات الصورة المخزنة مباشرة من Cloudinary
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path, // رابط الصورة من Cloudinary
      image_public_id: req.file.filename, // تخزين المعرف العام للصورة لحذفها لاحقًا
    });

    await food.save();
    res.json({ success: true, message: "Food item added successfully", data: food });
  } catch (error) {
    console.error("Error in addFood function:", error);
    res.status(500).json({ success: false, message: "Failed to add food item" });
  }
};

// قائمة جميع العناصر الغذائية
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error in listFood function:", error.message);
    res.status(500).json({ success: false, message: "Failed to get food list", error: error.message });
  }
};

// حذف عنصر غذائي
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // طباعة التفاصيل للتأكد من البيانات المستلمة
    // console.log("Found food item:", food);
    console.log("Image public ID:", food.image_public_id);

    // تحقق مما إذا كان `image_public_id` موجودًا قبل محاولة الحذف
    if (food.image_public_id) {
      await cloudinary.uploader.destroy(food.image_public_id);
      console.log("Image deleted from Cloudinary successfully.");
    } else {
      console.log("No image_public_id found, skipping Cloudinary deletion.");
    }

    // حذف العنصر الغذائي من قاعدة البيانات
    await foodModel.findByIdAndDelete(req.body.id);
    console.log("Food item deleted from database successfully.");

    res.json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    console.log("Error in removeFood function:", error.message);
    res.status(500).json({ success: false, message: "Failed to remove food item", error: error.message });
  }
};


export { addFood, listFood, removeFood };
