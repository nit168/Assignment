"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const searchInput = document.getElementById("search");
    const clearSearch = document.getElementById("clearSearch");
    const totalOrder = document.getElementById("totalOrder");
    const message = document.getElementById("message");
    const contactButton = document.getElementById("contactButton");

    const cards = document.querySelectorAll(".card");
    const sizeButtons = document.querySelectorAll(".size-btn");
    const orderButtons = document.querySelectorAll(".order-btn");


    // =====================================================
    // START NEW SHOPPING SESSION
    // =====================================================

    sessionStorage.removeItem("perfumeOrders");

    let orders = [];

    updateOrderCount();


    // =====================================================
    // UPDATE ORDER COUNT
    // =====================================================

    function updateOrderCount() {

        if (!totalOrder) {
            return;
        }

        const totalQuantity = orders.reduce(
            function (total, order) {

                const quantity =
                    Number(order.quantity) || 1;

                return total + quantity;

            },
            0
        );

        totalOrder.textContent = totalQuantity;

    }


    // =====================================================
    // SHOW MESSAGE
    // =====================================================

    function showMessage(text) {

        if (message) {
            message.textContent = text;
        }

    }


    // =====================================================
    // SAVE ORDERS
    // =====================================================

    function saveOrders() {

        try {

            sessionStorage.setItem(
                "perfumeOrders",
                JSON.stringify(orders)
            );

            return true;

        } catch (error) {

            console.error(
                "Save order error:",
                error
            );

            showMessage(
                "Unable to save your order."
            );

            return false;
        }

    }


    // =====================================================
    // SEARCH
    // =====================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const keyword =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                cards.forEach(function (card) {

                    const name =
                        (
                            card.dataset.name || ""
                        ).toLowerCase();


                    const title =
                        card.querySelector("h2")
                            ?.textContent
                            .toLowerCase() || "";


                    const description =
                        card.querySelector(".description")
                            ?.textContent
                            .toLowerCase() || "";


                    const found =
                        name.includes(keyword) ||
                        title.includes(keyword) ||
                        description.includes(keyword);


                    card.style.display =
                        found ? "" : "none";

                });

            }
        );

    }


    // =====================================================
    // CLEAR SEARCH
    // =====================================================

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                if (searchInput) {
                    searchInput.value = "";
                }


                cards.forEach(function (card) {
                    card.style.display = "";
                });


                showMessage(
                    "Welcome! Choose your favorite perfume."
                );

            }
        );

    }


    // =====================================================
    // SIZE BUTTON
    // =====================================================

    sizeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const card =
                    button.closest(".card");


                if (!card) {
                    return;
                }


                // Remove active
                card.querySelectorAll(".size-btn")
                    .forEach(function (btn) {

                        btn.classList.remove("active");

                    });


                // Add active
                button.classList.add("active");


                // Get price
                const price =
                    Number(button.dataset.price);


                const priceElement =
                    card.querySelector(
                        ".product-price"
                    );


                if (
                    priceElement &&
                    Number.isFinite(price)
                ) {

                    priceElement.textContent =
                        "$" + price.toFixed(2);

                }

            }
        );

    });


    // =====================================================
    // ORDER NOW
    // =====================================================

    orderButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const card =
                    button.closest(".card");


                if (!card) {
                    return;
                }


                // -------------------------------------------------
                // PERFUME NAME
                // -------------------------------------------------

                const name =
                    card.dataset.name ||
                    card.querySelector("h2")
                        ?.textContent
                        .trim() ||
                    "Perfume";


                // -------------------------------------------------
                // SELECTED SIZE
                // -------------------------------------------------

                const activeSize =
                    card.querySelector(
                        ".size-btn.active"
                    );


                let size = "50";
                let price = 0;


                if (activeSize) {

                    size =
                        activeSize.dataset.size ||
                        "50";


                    price =
                        Number(
                            activeSize.dataset.price
                        );

                }


                if (!Number.isFinite(price)) {
                    price = 0;
                }


                const selectedSize =
                    size + "ml";


                // -------------------------------------------------
                // FIND EXISTING ORDER
                // -------------------------------------------------

                const existingOrder =
                    orders.find(function (order) {

                        return (
                            order.name === name &&
                            order.size === selectedSize
                        );

                    });


                // -------------------------------------------------
                // INCREASE QUANTITY
                // -------------------------------------------------

                if (existingOrder) {

                    existingOrder.quantity =
                        (Number(
                            existingOrder.quantity
                        ) || 1) + 1;

                    existingOrder.price =
                        price;

                }


                // -------------------------------------------------
                // NEW ORDER
                // -------------------------------------------------

                else {

                    orders.push({

                        name: name,

                        size: selectedSize,

                        price: price,

                        quantity: 1

                    });

                }


                // -------------------------------------------------
                // SAVE
                // -------------------------------------------------

                if (!saveOrders()) {
                    return;
                }


                // -------------------------------------------------
                // UPDATE COUNT
                // -------------------------------------------------

                updateOrderCount();


                // -------------------------------------------------
                // MESSAGE
                // -------------------------------------------------

                const quantity =
                    existingOrder
                        ? existingOrder.quantity
                        : 1;


                showMessage(
                    `${name} - ${selectedSize} × ${quantity} added to your order.`
                );


                // =================================================
                // BUTTON CHANGE
                // =================================================

                const originalText =
                    button.dataset.originalText ||
                    button.textContent.trim();


                button.dataset.originalText =
                    originalText;


                // Change button text
                button.textContent =
                    "Added ✓";


                // Add class
                button.classList.add("added");


                // Disable for short time
                button.disabled = true;


                // Return button after 1.5 seconds
                setTimeout(function () {

                    button.textContent =
                        originalText;

                    button.classList.remove(
                        "added"
                    );

                    button.disabled = false;

                }, 1500);


                // IMPORTANT:
                // Stay on Collection page.
                // Do NOT go to Contact Us.

            }
        );

    });


    // =====================================================
    // CONTACT US
    // =====================================================

    if (contactButton) {

        contactButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                // Check orders
                if (orders.length === 0) {

                    showMessage(
                        "Please choose at least one product before Contact Us."
                    );

                    return;
                }


                // Go to Contact Us
                window.location.href =
                    "contect.html";

            }
        );

    }


    // =====================================================
    // INITIAL MESSAGE
    // =====================================================

    showMessage(
        "Welcome! Choose your favorite perfume."
    );


    // =====================================================
    // READY
    // =====================================================

    console.log(
        "Collection JavaScript loaded successfully."
    );

});