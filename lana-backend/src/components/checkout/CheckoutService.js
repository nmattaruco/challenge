const CheckoutModel = require('./CheckoutModel');
const CheckoutItemModel = require('./CheckoutItemModel');

const ProductService = require('./../product/ProductService');
const PriceCalculator = require('./../../providers/PriceCalculator');
const TokenGenerator = require('../../utils/TokenGenerator');

const CheckoutService = module.exports;

const createBasket = async (model) => {
  try {
    const { id, token } = TokenGenerator.generateSignedToken();

    const basket = new CheckoutModel({ id, token });
    await basket.save();
    
    return { token };
  } catch (e) {
    console.log('Error creating basket', e);
    throw new Error(e);
  }
};

const addItem = async (token, code) => {
  try {
    const id = TokenGenerator.verifySignedToken(token);
    const basket = await CheckoutModel.findOne({ id }).populate('items');

    if (basket) {
      const item = await CheckoutItemModel.findOne({ token: id, code });

      if (item) {
        await CheckoutItemModel.update({ _id: item._id }, { quantity : item.quantity + 1 })
      } else {
        const product = await ProductService.getProduct(code);
        if (product) {
          const newItem = new CheckoutItemModel({ token: id, quantity: 1, code});
          await newItem.save();
        } else {
          throw new Error('Cannot find product');
        }
      }
    } else {
      console.log('cannot find basket');
    }
  } catch (e) {
    console.log('Error creating basket', e);
    throw new Error(e);
  }
};

const removeItem = async (token, code) => {
  try {
    const id = TokenGenerator.verifySignedToken(token);
    const basket = await CheckoutModel.findOne({ id }).populate('items');

    if (basket) {
      const item = await CheckoutItemModel.findOne({ token: id, code });

      if (item) {
        (item.quantity === 1) 
        ? await CheckoutItemModel.deleteOne({ _id: item._id, code }) :
          await CheckoutItemModel.update({ _id: item._id }, { quantity: item.quantity - 1 })
      } else {
          throw new Error('Cannot find item');
      }
    } else {
      console.log('cannot find basket');
    }
  } catch (e) {
    console.log('Error creating basket', e);
    throw new Error(e);
  }
};

const calculatePrice = async (token) => {
  try {
    const id = TokenGenerator.verifySignedToken(token);
    const basketItems = await CheckoutItemModel.find({ token: id });

    let total = 0;
    let lines = [];

    for(item of basketItems) {
      const { quantity, code } = item;

      const product = await ProductService.getProduct(code);
      const { subTotal, discountLabel } = PriceCalculator.calculate(product.price, quantity, product.discounts);
      total = total + subTotal;
      lines.push(`ITEM - ${code} - UNIT PRICE - ${product.price} - QUANTITY: ${quantity} - SUBTOTAL:  ${subTotal} ${discountLabel} `);
    };

    lines.push(`TOTAL : ${total}`);

    return lines;
  } catch (e) {
    console.log('Error calculating..', e);
    throw new Error(e);
  }
}

const deleteBasket = async (tokenVerify) => {
  try {
    const id = TokenGenerator.verifySignedToken(tokenVerify);
    const basket = await CheckoutModel.deleteOne({ id });
    await CheckoutItemModel.deleteMany({ token: id });
    return basket;
  } catch (ex) {
    throw new Error(ex);
  }
}

CheckoutService.createBasket = createBasket;
CheckoutService.calculate = calculatePrice;
CheckoutService.addItem = addItem;
CheckoutService.removeItem = removeItem;
CheckoutService.deleteBasket = deleteBasket;

