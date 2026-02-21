// 當頁面完全載入後執行
window.onload = function () {
    // 1. 從 LocalStorage 拿回資料 (標籤要跟 index.js 存的時候一樣)
    const savedData = localStorage.getItem('myOrder');

    if (savedData) {
        // 2. 把字串轉回物件
        const order = JSON.parse(savedData);

        // 3. 找到 id 為 display-price 的標籤，把數字填進去
        // 我們用 order.totalPrice 因為這是你在 index.js 裡面定義的名稱
        document.getElementById('display-price').innerText = "$" + order.totalPrice;
    } else {
        // 如果沒資料，可以顯示預設文字
        document.getElementById('display-price').innerText = "未找到訂單金額";
    }
};