const mongoose = require("mongoose");
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
    title: {type: String, required: true},
    image: String,
    ingredients: [],
    directions: [],
    
}, { timestamps: true },);

module.exports = mongoose.model("recipe", RecipeSchema);
