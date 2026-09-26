/**
 * Utility functions for pricing, currency, cuotas, and discounts
 */

export function formatPriceARS(amount) {
  if (typeof amount !== 'number') return '$0';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateCuotas(total, installments = 6) {
  if (!total || total <= 0) return 0;
  return Math.round(total / installments);
}

export function calculateDiscount(subtotal, coupon) {
  if (!coupon || !subtotal) return { discountAmount: 0, isFreeShipping: false };

  let discountAmount = 0;
  let isFreeShipping = false;

  switch (coupon.type) {
    case 'percentage':
      discountAmount = Math.round((subtotal * coupon.value) / 100);
      break;
    case 'fixed':
      discountAmount = Math.min(coupon.value, subtotal);
      break;
    case 'freeship':
      isFreeShipping = true;
      break;
    case 'gift':
      // Gift sample is free, doesn't discount the subtotal directly but adds gift item
      break;
    default:
      break;
  }

  return { discountAmount, isFreeShipping };
}
