const productCards = document.querySelectorAll('.productCard');

btnCards.forEach((button) => {
  const quantityElement = button.parentElement.querySelector('.spam-quantity');
  let quantity = 1;

  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    const data = {
      productId: productId,
      spamQuantity: quantity
    };

  })
});