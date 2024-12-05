function ensureCart() {
    if (!localStorage.getItem('cart'))
        localStorage.setItem('cart', "{}");
}

function saveCart(newCart) {
    localStorage.setItem('cart', JSON.stringify(newCart));
}

function getCart() {
    ensureCart();
    return JSON.parse(localStorage.getItem('cart') || "{}");
}

function addUserCart(user_id) {
    const cart = getCart();
    cart[user_id] = {items: []};

    saveCart(cart);
}

function getUserCart(user_id) {
    const cart = getCart();
    return cart[user_id];
}

function addItemToCart(user_id, item) {
    const cart = getUserCart(user_id);
    if (!cart.items.some((i) => i.item_id === item.item_id)) {
        cart.items.push(item);
    }
    saveCart(cart);
}

function removeItemFromCart(user_id, item_id) {
    const cart = getUserCart(user_id);
    const index = cart.items.findIndex((i) => i.item_id === item_id);
    if (index >= 0) {
        cart.items.splice(index, 1);
    }
    saveCart(cart);
}

function clearUserCart(user_id) {
    const cart = getCart();
    delete cart[user_id];
    saveCart(cart);
}

export default {getUserCart, addUserCart, addItemToCart, removeItemFromCart, clearUserCart}