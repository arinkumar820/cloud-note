import { maxLength } from "better-auth";
import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { Content } from "next/font/google";

const Noteschems= new mongoose.Schema({

   title:{
    type: String,
    require:true,
    trim:true,
    maxLength:30
   },
   Content:{
    type:String,
    require:true,
    trim:true
   },
   userId:{
    type:string,
    required:true,
    index:true
   },
},
{
Timestamp:true



})

const Note= 
  mongoose.model.Note || mongoose.model("Note",Noteschems)


export default Note  