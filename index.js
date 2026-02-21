function goToCheckout() {
    // 檢查有沒有點餐
    if (count === 0) {
        alert("請先選擇餐點喔！");
        return; // 如果沒點餐，就不要跳轉
    }

    // 把你點擊計算出來的真實金額存起來
    let cart = {
        totalItems: count,
        totalPrice: price
    };

    // 存入瀏覽器
    localStorage.setItem('myOrder', JSON.stringify(cart));

    // 存好之後，才執行跳轉
    window.location.href = "order.html";
}