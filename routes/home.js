import express from "express";
import multer from "multer";
import { addItem, addItemFunc, editItemFunc, editMenuFunc, homeFunc, ordersFunc, statusFunc } from "../controllers/home.js";
import cartFunc from "../controllers/home.js";
const router = express.Router()

const storage = multer.memoryStorage();

const upload = multer({storage}).single("file")

router.get("/",homeFunc)
router.get("/cart",cartFunc().index)
router.post("/update-cart",cartFunc().update)
router.get("/orders",ordersFunc)
router.get("/add",addItemFunc)
router.get("/editMenu",editMenuFunc)
router.get("/editItem",editItemFunc)
router.get("/status",statusFunc)
    

router.post("/add",upload, addItem)

export default router;