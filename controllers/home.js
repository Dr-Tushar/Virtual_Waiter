import { Items } from "../models/items.js";
import cloudinary from 'cloudinary';
import getDataUri from "../utils/dataUri.js";

export const homeFunc= async(req,res,next)=>{
    try{
        const items= await Items.find();
        const snacks = await Items.find({ category: "Snacks" });
        const drinks = await Items.find({ category: "Drinks" });
        const meals = await Items.find({ category: "Main Course" });
        const desserts = await Items.find({ category: "Desserts" });
        const starters = await Items.find({ category: "Appetizers" });
        res.render("01_home", {items,snacks,drinks,meals,desserts,starters} )
    } catch (error) {
        next(error)
    }
}
  const cartFunc=()=>{

    // try {
    //     const items = await Items.find();
    //     res.render("02_cart",{items})
    // } catch (error) {
    //     next(error)
    // }

        // mz code add to card
        return{
            index(req,res){
                res.render('views/02_cart')
            },
            update(req,res){
               return res.json({data:'All ok'})
                   
            }
        }
}
export default cartFunc;


export const statusFunc=async(req,res,next)=>{
    try {
        const items = await Items.find();
        res.render("03_Status",{items})
    } catch (error) {
        next(error)
    }

}
export const ordersFunc=(req,res,next)=>{
    try {
        res.render("A01_orders")
    } catch (error) {
        next(error)
    }
}
export const addItemFunc=(req,res,next)=>{
    try {
        res.render("A02_addItem")
    } catch (error) {
        next(error)
    }
}
export const editMenuFunc=async(req,res,next)=>{
    try {
        const items= await Items.find();
        const snacks = await Items.find({ category: "Snacks" });
        const drinks = await Items.find({ category: "Drinks" });
        const meals = await Items.find({ category: "Main Course" });
        const desserts = await Items.find({ category: "Desserts" });
        const starters = await Items.find({ category: "Appetizers" });
        res.render("A03_editMenu", {items,snacks,drinks,meals,desserts,starters} )
    } catch (error) {
        next(error)
    }
}
export const editItemFunc=(req,res,next)=>{
    try {
        res.render("A04_editItem")
    } catch (error) {
        next(error)
    }
}
export const addItem = async(req,res,next)=>{

    try {
        const {name, description, price, category, foodType, rating} =req.body;
        const file= req.file;
        const imageUri= getDataUri(file)
        const mycloud= await cloudinary.v2.uploader.upload(imageUri.content)

    await Items.create({
        name,description,price,
        image:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        },
        category,foodType,rating, adminId:req.user
    })
    res.json({
        success:true,
        message:"Item Added Successfully"
    })
    } 
    catch (error) {
      next(error)  
    }
}