const seed = [
  {
    'model': 'Discount',
    'documents': [
        {
            'id': 2,
            'name': '25 off more than 3 units',
            'discountType': '3DESC25'
        },
        {
            'id': 1,
            'name': 'Buy 2 Get 1',
            'discountType': '3x2'
        }
    ]
},
  {
      'model': 'Product',
      'documents': [
          {
              'code': 'PEN',
              'name': 'Lana Pen',
              'price': 5.00,
              'discounts': [1]
          },
          {
            'code': 'TSHIRT',
            'name': 'Lana T-Shirt',
            'price': 20.00,
            'discounts': [2]
        },
        {
            'code': 'MUG',
            'name': 'Lana Coffee Mug',
            'price': 7.50,
            'discounts': []
        }
      ]
  }
];

const SeedData = module.exports;
SeedData.seed = seed;
