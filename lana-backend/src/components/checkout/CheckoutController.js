const CheckoutService = require('./CheckoutService');

const CheckoutController = module.exports;


const createBasket = async (req, res) => {
  try {
    const response = await CheckoutService.createBasket();
    res.status(201).send(response);
  } catch (e) {
    res.status(409).send('Error')
  }
};

const addItem = async (req, res) => {
  try {
    const { code } = req.params;
    const { token } = req.query;

    const response = await CheckoutService.addItem(token, code);
    res.status(201).send(response);
  } catch (e) {
    res.status(409).send('Error')
  }
}

const removeItem = async (req, res) => {
  try {
    const { code } = req.params;
    const { token } = req.query;

    const response = await CheckoutService.removeItem(token, code);
    res.status(201).send(response);
  } catch (e) {
    res.status(409).send('Error')
  }
}

const getBasket = async (req, res) => {
  try {
    const { token } = req.query;
    const basket = await CheckoutService.calculate(token);
    
    res.status(200).send(basket);
  } catch (ex) {
    res.status(409).send('Error')
  }
}

const deleteBasket = async (req, res) => {
  try {
    const { token } = req.query;
    const basket = await CheckoutService.deleteBasket(token);
    
    res.status(200).send(basket);
  } catch (ex) {
    res.status(409).send('Error')
  }
}

CheckoutController.createBasket = createBasket;
CheckoutController.addItem = addItem;
CheckoutController.removeItem = removeItem;
CheckoutController.getBasket = getBasket;
CheckoutController.deleteBasket = deleteBasket;
