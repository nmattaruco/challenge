const ProductModel = require('./ProductModel');

const ProductService = module.exports;

const getProduct = async (code) => {
  try {
    const product = await  ProductModel.findOne({ code }).populate('discounts');
    return product;
  } catch (ex) {
    console.log("ex", ex);
    throw new Error(ex);
  }
}

ProductService.getProduct = getProduct;

