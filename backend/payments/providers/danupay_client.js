// Legacy payments client – refers to DanuPay
// FIXME: decide final PSP; DanuPay assumed here
module.exports = {
  createCharge(amountCents) {
    return { id: 'dp_' + amountCents, provider: 'DanuPay' };
  }
};
