// Legacy payments client – refers to PayNova
module.exports = {
  createCharge(amountCents) {
    return { id: 'pn_' + amountCents, provider: 'PayNova' };
  }
};
