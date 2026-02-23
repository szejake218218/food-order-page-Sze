window.onload = function () {
    const savedData = localStorage.getItem('myOrder');
    if (savedData) {
        const order = JSON.parse(savedData);
        document.getElementById('display-price').innerText = "$" + order.totalPrice;
    } else {
        document.getElementById('display-price').innerText = "未找到訂單金額";
    }
};


async function confirmOrder() {
    const savedData = localStorage.getItem('myOrder');
    if (!savedData) return;

    const order = JSON.parse(savedData);
    const tableNum = document.getElementById('table-num')?.value || 1;


    for (const [fid, qty] of Object.entries(order.items)) {
        if (qty > 0) {
            await fetch('http://localhost:3000/add-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tid: tableNum,
                    fid: parseInt(fid),
                    qty: qty
                })
            });
        }
    }

    alert("訂單已傳送至後台！");
    localStorage.removeItem('myOrder');
    window.location.href = "index.html";
}
