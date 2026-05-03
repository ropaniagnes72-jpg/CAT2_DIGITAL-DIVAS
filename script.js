// --- 1. INITIAL STATE ---
let cart = [];
let cartTotal = 0;

// --- 2. SEARCH LOGIC ---
function filterMenu() {
    const input = document.getElementById('foodSearch').value.toLowerCase();
    const items = document.querySelectorAll('.food-list .item');
    
    items.forEach(item => {
        const text = item.querySelector('p').textContent.toLowerCase();
        item.style.display = text.includes(input) ? "flex" : "none";
    });
}

// --- 3. CART CORE LOGIC ---
function addToCart(itemName, price, quantityId) {
    const quantityInput = document.getElementById(quantityId);
    
    // Error check: if the button can't find the input box
    if (!quantityInput) {
        console.error("Critical Error: Could not find input box with ID: " + quantityId);
        return;
    }

    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
        const itemTotal = price * quantity;
        
        cart.push({ 
            name: itemName, 
            quantity: quantity, 
            price: price, 
            total: itemTotal 
        });
        
        cartTotal += itemTotal;
        renderCart();
        quantityInput.value = 1; // Reset input to 1
    } else {
        alert("Please enter a valid quantity.");
    }
}

function filterMenu() {
    const input = document.getElementById('foodSearch').value.toLowerCase();
    const items = document.querySelectorAll('.food-list .item');
    
    items.forEach(item => {
        const text = item.querySelector('p').textContent.toLowerCase();
        // If the text matches, show it as 'flex', otherwise hide it
        item.style.display = text.includes(input) ? "flex" : "none";
    });
}
function removeFromCart(index) {
    cartTotal -= cart[index].total;
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    
    if (!cartItemsList || !totalDisplay) return;

    cartItemsList.innerHTML = '';
    
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.innerHTML = `
            <span>${item.quantity}x ${item.name} - UGX ${item.total.toLocaleString()}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
        `;
        cartItemsList.appendChild(li);
    });
    
    totalDisplay.textContent = cartTotal.toLocaleString();
}

// --- 4. CHECKOUT & CLEAR LOGIC ---
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const receiptDiv = document.getElementById('receipt');
    let html = '<h4>Receipt ✅</h4><ul>';
    
    cart.forEach(item => { 
        html += `<li>${item.name} x${item.quantity} - UGX ${item.total.toLocaleString()}</li>`; 
    });
    
    html += `</ul><p><strong>Total: UGX ${cartTotal.toLocaleString()}</strong></p>`;
    html += '<p>Thank you for ordering!</p>';
    
    receiptDiv.innerHTML = html;
    receiptDiv.style.display = "block"; 
    
    // Clear data
    cart = [];
    cartTotal = 0;
    renderCart();
}

function clearCart() {
    cart = [];
    cartTotal = 0;
    renderCart(); // This refreshes the screen
    const receiptDiv = document.getElementById('receipt');
    if (receiptDiv) {
        receiptDiv.style.display = "none";
        receiptDiv.innerHTML = '';
    }
}

// --- 5. CUSTOMER HUB LOGIC ---

// Tracking Logic
function trackOrder() {
    const id = document.getElementById('trackInput').value;
    const status = document.getElementById('trackStatus');
    
    if (id.trim() === "") {
        alert("Please enter an Order ID!");
        return;
    }
    
    // Simple simulation of tracking
    status.innerHTML = "Status: <strong>Your food is being prepared!</strong> 🔥";
    status.style.color = "#ff6b6b";
}

// Rating Logic
let currentRating = 0;
function rate(stars) {
    currentRating = stars;
    alert("You selected " + stars + " stars! Thank you.");
}

// Feedback Logic
function submitFeedback() {
    const text = document.getElementById('feedbackText').value;
    if (text.trim() === "") {
        alert("Please write something before submitting!");
        return;
    }
    
    alert("Thank you for your feedback! We have received it.");
    document.getElementById('feedbackText').value = ""; // Clear the box
}