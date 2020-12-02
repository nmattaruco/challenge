const PriceCalculator = module.exports;

PriceCalculator.calculate = (unitPrice, quantity, discounts = []) => {
  let discountAmount = 0;
  let discountLabel = '';

  //const DISCOUNT_BY_QUANTITY_REGEX = /^\d[x]\d$/;
  //const DISCOUNT_PERCENTAGE_REGEX =/^DESC$/;

  discounts.forEach(d => {
    if (d.discountType === '3x2') {
      const discounted = calculateByQuantity(unitPrice, quantity);
      if(discounted > 0) {
        discountAmount = discountAmount + discounted;
        discountLabel += `- DISCOUNT APPLIED: ${d.discountType} -`;
      }
    }

    if (d.discountType === '3DESC25') {
      const discounted = calculateByPercentage(unitPrice, quantity);
      if(discounted > 0) {
        discountAmount = discountAmount + discounted;
        discountLabel += `- DISCOUNT APPLIED: ${d.discountType} -`;
      }
    }

  })
  return { subTotal: (quantity * unitPrice) - discountAmount, discountLabel };
}

const calculateByQuantity = (unitPrice, quantity) => {
  const DISCOUNT_QUANTITY = 3;
  const discountUnits = (quantity >= DISCOUNT_QUANTITY) ? Math.floor(quantity/DISCOUNT_QUANTITY) : 0;

  return discountUnits ? discountUnits*unitPrice : 0 ;

}

const calculateByPercentage = (unitPrice, quantity) => {
  const DISCOUNT_PERCENTAGE = 0.25;
  const DISCOUNT_APPLY_UNITS = 3;
  const applyPercentage = (quantity >= DISCOUNT_APPLY_UNITS);

  let discountPrice = 0;

  if (applyPercentage) {
    discountPrice = (unitPrice*DISCOUNT_PERCENTAGE)*quantity;
  }

  return discountPrice;

}