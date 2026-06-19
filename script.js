// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// Add item to cart
function orderItem(name, price) {

    let existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
}

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display cart
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <li>
                ${item.name} - ₹${item.price}

                <button onclick="decreaseQuantity(${index})">➖</button>

                ${item.quantity}

                <button onclick="increaseQuantity(${index})">➕</button>

                = ₹${item.price * item.quantity}
            </li>
        `;
    });

    totalElement.innerText = total;
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    updateCart();
}

// Decrease quantity
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

// Place order
function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let items = cart
        .map(item => `${item.name} x${item.quantity}`)
        .join("\n");

    alert(
        `Order Placed!\n\n${items}\n\nTotal: ₹${total}`
    );

    clearCart();
}

// Load cart automatically when page opens
window.onload = updateCart;