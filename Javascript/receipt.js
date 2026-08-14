"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const orderList =
        document.getElementById("orderList");

    const itemCount =
        document.getElementById("itemCount");

    const total =
        document.getElementById("total");


    // =====================================================
    // GET ORDERS FROM SESSION STORAGE
    // =====================================================

    let orders = [];

    try {

        const savedOrders =
            sessionStorage.getItem("perfumeOrders");

        if (savedOrders) {

            orders =
                JSON.parse(savedOrders);

        }

    } catch (error) {

        console.error(
            "Error loading receipt orders:",
            error
        );

        orders = [];

    }


    // =====================================================
    // CHECK ORDERS
    // =====================================================

    if (!Array.isArray(orders)) {

        orders = [];

    }


    // =====================================================
    // CLEAR OLD RECEIPT
    // =====================================================

    if (orderList) {

        orderList.innerHTML = "";

    }


    // =====================================================
    // EMPTY ORDER
    // =====================================================

    if (orders.length === 0) {

        if (orderList) {

            const emptyItem =
                document.createElement("li");

            emptyItem.textContent =
                "No orders found.";

            orderList.appendChild(
                emptyItem
            );

        }


        if (itemCount) {

            itemCount.textContent =
                "0";

        }


        if (total) {

            total.textContent =
                "$0.00";

        }


        return;

    }


    // =====================================================
    // CALCULATE
    // =====================================================

    let totalItems = 0;
    let grandTotal = 0;


    // =====================================================
    // DISPLAY ORDERS
    // =====================================================

    orders.forEach(function (order) {

        // ---------------------------------------------
        // NAME
        // ---------------------------------------------

        const name =
            order.name ||
            "Perfume";


        // ---------------------------------------------
        // SIZE
        // ---------------------------------------------

        const size =
            order.size ||
            "50ml";


        // ---------------------------------------------
        // PRICE
        // ---------------------------------------------

        let price =
            Number(order.price);


        if (!Number.isFinite(price)) {

            price = 0;

        }


        // ---------------------------------------------
        // QUANTITY
        // ---------------------------------------------

        let quantity =
            Number(order.quantity);


        if (
            !Number.isFinite(quantity) ||
            quantity < 1
        ) {

            quantity = 1;

        }


        // ---------------------------------------------
        // SUBTOTAL
        // ---------------------------------------------

        const subtotal =
            price * quantity;


        // ---------------------------------------------
        // TOTAL
        // ---------------------------------------------

        totalItems +=
            quantity;


        grandTotal +=
            subtotal;


        // =================================================
        // CREATE LIST ITEM
        // =================================================

        if (orderList) {

            const li =
                document.createElement("li");


            li.className =
                "receipt-order";


            // ---------------------------------------------
            // PRODUCT NAME
            // ---------------------------------------------

            const nameSpan =
                document.createElement("span");

            nameSpan.textContent =
                name;


            // ---------------------------------------------
            // SIZE
            // ---------------------------------------------

            const sizeSpan =
                document.createElement("span");

            sizeSpan.textContent =
                size;


            // ---------------------------------------------
            // QUANTITY
            // ---------------------------------------------

            const quantitySpan =
                document.createElement("span");

            quantitySpan.textContent =
                " × " + quantity;


            // ---------------------------------------------
            // PRICE
            // ---------------------------------------------

            const priceSpan =
                document.createElement("span");

            priceSpan.textContent =
                " $" + subtotal.toFixed(2);


            // ---------------------------------------------
            // ADD TO LI
            // ---------------------------------------------

            li.appendChild(
                nameSpan
            );

            li.appendChild(
                document.createTextNode(" ")
            );

            li.appendChild(
                sizeSpan
            );

            li.appendChild(
                quantitySpan
            );

            li.appendChild(
                priceSpan
            );


            // ---------------------------------------------
            // ADD TO ORDER LIST
            // ---------------------------------------------

            orderList.appendChild(
                li
            );

        }

    });


    // =====================================================
    // SHOW ITEM COUNT
    // =====================================================

    if (itemCount) {

        itemCount.textContent =
            totalItems;

    }


    // =====================================================
    // SHOW GRAND TOTAL
    // =====================================================

    if (total) {

        total.textContent =
            "$" +
            grandTotal.toFixed(2);

    }


    // =====================================================
    // CONSOLE
    // =====================================================

    console.log(
        "Receipt loaded successfully."
    );

    console.log(
        "Orders:",
        orders
    );

    console.log(
        "Total Items:",
        totalItems
    );

    console.log(
        "Total:",
        grandTotal
    );

});