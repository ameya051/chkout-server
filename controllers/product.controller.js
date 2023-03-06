const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const Product = require("../models/product.model");

class Product {
  async create(req, res) {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];
        if (parsedData.title.trim().length === 0) {
          errors.push({ msg: "Title is required" });
        }
        if (parseInt(parsedData.price) < 1) {
          errors.push({ msg: "Price should be above $1" });
        }
        if (parseInt(parsedData.discount) < 0) {
          errors.push({ msg: "Discount should not be negative" });
        }
        if (parseInt(parsedData.stock) < 20) {
          errors.push({ msg: "Stock should be above 20" });
        }
        if (fields.description.trim().length === 0) {
          errors.push({ msg: "Description is required" });
        }
        if (errors.length === 0) {
          if (!files["image1"]) {
            errors.push({ msg: "Image1 is required" });
          }
          if (!files["image2"]) {
            errors.push({ msg: "Image2 is required" });
          }
          if (!files["image3"]) {
            errors.push({ msg: "Image3 is required" });
          }
          if (errors.length === 0) {
            const images = {};
            for (let i = 0; i < Object.keys(files).length; i++) {
              const mimeType = files[`image${i + 1}`].mimetype;
              const extension = mimeType.split("/")[1].toLowerCase();
              if (
                extension === "jpeg" ||
                extension === "jpg" ||
                extension === "png"
              ) {
                const imageName = uuidv4() + `.${extension}`;
                const __dirname = path.resolve();
              }
            }
          }
        }
      }
    });
  }
}
