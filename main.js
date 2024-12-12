document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.add-to-cart');
    let totalPrice = 0;
  
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Get the price from the product
        const price = parseFloat(this.previousElementSibling.textContent.replace('$', ''));
        
        // Add the price to the total
        totalPrice += price;
        
        // Show the alert with the total price
        alert(`Product added to cart! Total price: $${totalPrice.toFixed(2)}`);
      });
    });
  });
  