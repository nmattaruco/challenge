require('dotenv').config();

const seeder = require('mongoose-seed');
const SeedData = require('./data/SeedData');
const environment = process.env;

seeder.connect(environment.MONGO_CONN_STRING, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    './src/components/product/ProductModel.js',
    './src/components/discount/DiscountModel.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Product', 'Discount'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(SeedData.seed, function() {
      seeder.disconnect();
    });
 
  });
});