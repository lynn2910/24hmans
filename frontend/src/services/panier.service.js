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

function getUserCart(user_id) {
    const cart = getCart();
    if (!cart[user_id]) cart[user_id] = {items: []};

    return cart[user_id];
}

function addUserCart(user_id) {
    const cart = getCart();
    cart[user_id] = {items: []};

    saveCart(cart);
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

function getItem(user_id, item_id) {
    const carts = getCart();

    if (!carts[user_id]) carts[user_id] = {items: []};
    const cart = carts[user_id];

    return cart.items.find((i) => i.item_id === item_id);
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
    console.log(1)
    const carts = getCart();

    if (!carts[user_id]) carts[user_id] = {items: []};
    const cart = carts[user_id];

    const index = cart.items.findIndex((i) => i.id === item_id);
    if (index >= 0) {
        cart.items[index].count = count;
    }
    saveCart(carts)
}

function clearUserCart(user_id) {
    const cart = getCart();
    delete cart[user_id];
    saveCart(cart);
}

function getItemCount(user_id) {
    return getUserCart(user_id)?.items.reduce((a, b) => a += b.count, 0) || 0;
}

function clearCart(user_id) {
    const cart = getCart();
    cart[user_id] = {items: []};
    saveCart(cart);
}

export default {
    getUserCart,
    addUserCart,
    addItemToCart,
    removeItemFromCart,
    clearUserCart,
    getItem,
    getItemCount,
    setCountOfItem,
    getCart,
    clearCart
}