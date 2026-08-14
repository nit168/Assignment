document.addEventListener("DOMContentLoaded", function () {

    const orderList =
        document.getElementById("orderList");

    const itemCount =
        document.getElementById("itemCount");

    const total =
        document.getElementById("total");

    const contactForm =
        document.getElementById("contactForm");


    // =========================
    // GET CART
    // =========================

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    let totalItems = 0;
    let totalPrice = 0;


    // =========================
    // SHOW CART
    // =========================

    if (orderList) {
        orderList.innerHTML = "";
    }


    cart.forEach(function (item) {

        const qty =
            Number(item.qty) || 1;

        const price =
            Number(item.price) || 0;

        const itemTotal =
            qty * price;


        totalItems += qty;
        totalPrice += itemTotal;


        const li =
            document.createElement("li");


        li.innerHTML = `
            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:8px;
            ">
                <span>
                    ${item.name} x${qty}
                </span>

                <span>
                    $${itemTotal.toFixed(2)}
                </span>
            </div>
        `;


        if (orderList) {
            orderList.appendChild(li);
        }

    });


    // =========================
    // SHOW TOTAL
    // =========================

    if (itemCount) {
        itemCount.textContent = totalItems;
    }

    if (total) {
        total.textContent =
            "$" + totalPrice.toFixed(2);
    }


    // =========================
    // SUBMIT
    // =========================

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // ត្រូវមានទំនិញ
                if (cart.length === 0) {

                    alert(
                        "Your order is empty!"
                    );

                    return;
                }


                // =========================
                // SAVE FOR RECEIPT
                // =========================

                const receiptOrder = {

                    items: cart,

                    totalItems: totalItems,

                    totalPrice: totalPrice

                };


                localStorage.setItem(
                    "receiptOrder",
                    JSON.stringify(receiptOrder)
                );


                // =========================
                // GO RECEIPT
                // =========================

                window.location.href =
                    "receipt.html";

            }
        );

    }

});