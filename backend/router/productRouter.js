import express from 'express';
import {
  addProduct,
  removeProduct,
  listProducts,
  singleProduct
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

/* ---------- POST /add (with images) ---------- */
productRouter.post(
  '/add',adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

/* ---------- DELETE /remove/:id --------------- */
productRouter.delete('/remove/:id',adminAuth, removeProduct);

/* ---------- optional helpers ----------------- */
productRouter.get('/single/:id', singleProduct);   // e.g. /single/123
productRouter.get('/list', listProducts);

export default productRouter;
