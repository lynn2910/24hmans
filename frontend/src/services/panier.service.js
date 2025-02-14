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

function addItemToCart(user_id, item) {
    const carts = getCart();

    if (!carts[user_id]) carts[user_id] = {items: []};
    const cart = carts[user_id];

    const itemInCart = cart.items.find(i => i.id === item.id);
    if (!itemInCart) {
        console.log("Item not found in the cart, add it")
        cart.items.push(item);
    } else {
        console.log("Item found in the cart, increase the count")
        itemInCart.count += item.count;
    }
    saveCart(carts);
}

function removeItemFromCart(user_id, item_id) {
    const carts = getCart();

    if (!carts[user_id]) carts[user_id] = {items: []};
    const cart = carts[user_id];

    const index = cart.items.findIndex((i) => i.id === item_id);
    if (index >= 0) {
        cart.items.splice(index, 1);
    }
    saveCart(carts);
}

function setCountOfItem(user_id, item_id, count) {
    const carts = getCart();

    if (!carts[user_id]) carts[user_id] = {items: []};
    const cart = carts[user_id];

    const index = cart.items.findIndex((i) => i.id === item_id);
    if (index >= 0) {
        cart.items[index].count = count;
    }
    saveCart(carts)
}

function clearCart(user_id) {
    const cart = getCart();
    cart[user_id] = {items: []};
    saveCart(cart);
}

export default {
    addItemToCart,
    removeItemFromCart,
    setCountOfItem,
    getCart,
    clearCart
}