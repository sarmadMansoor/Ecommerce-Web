import cloudinary from 'cloudinary';
import productModel from '../models/productModel.js';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Add Product Controller
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Log input to debug
    console.log("📥 Form data:", req.body);
    console.log("🖼️ Uploaded files:", req.files);

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const uploaded = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
        });
        return uploaded.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === 'true',
      sizes: JSON.parse(sizes), // Expecting JSON string
      image: imageUrls,
      date: Date.now(),
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    res.json({ success: true, message: 'Product Added', product: newProduct });
  } catch (error) {
    console.error('❌ Error adding product:', error.message);
    res.status(500).json({ success: false, message: 'Error adding product' });
  }
};

// Placeholder
const listProducts = async (req, res) => {
  res.json({ success: true, message: "Product list placeholder" });
};

const removeProduct = async (req, res) => {
  res.json({ success: true, message: "Product remove placeholder" });
};

const singleProduct = async (req, res) => {
  res.json({ success: true, message: "Single product placeholder" });
};

export { addProduct, listProducts, removeProduct, singleProduct };
