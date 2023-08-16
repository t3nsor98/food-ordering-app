import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'uuid';




function getMenuFeed() {
    let menuFeed = "";
    menuArray.forEach(function (item) {
        menuFeed += `<div class="item">
                    <div class="food">${item.emoji}</div>
                    <div class="food-info">
                        <h3 class="name">${item.name}</h3>
                        <p class="ingredients">${item.ingredients}</p>
                        <p class="price">$ ${item.price}</p>
                    </div>
                    <div class="plus" data-order="${item.id}">+</div>
                </div>`
    })


    return menuFeed;
}

// eventlistener on entire document
document.addEventListener("click", function (e) {
    if (e.target.dataset.order) {
        getYourOrder(e.target.dataset.order);
    } else if (e.target.dataset.orderNumber) {
        removeClickedOrder(e.target.dataset.orderNumber);
    }
})



let orderList = [];
let orderListString = "";
let totalPrice = 0;

function getYourOrder(id) {
    const targetOrderObj = menuArray.filter(function (order) {
        return order.id == id;
    })[0]
    totalPrice = 0;
    orderList.push({ name: targetOrderObj.name, price: targetOrderObj.price, orderid: uuidv4() });
    document.querySelector(".checkout").classList.remove("hidden");
    orderList.forEach(function (order) {
        orderListString += `<div class="order">
                        <div class="order-name">
                            <span class="order-name-name">${order.name}</span> 
                            <span class="order-name-remove" data-order-number="${order.orderid}">Remove</span>
                        </div>
                        <div class="order-price">
                            ${order.price}
                        </div>
                    </div>`

    })


    render()
}


function removeClickedOrder(removeId) {
    orderList = orderList.filter(function (item) {
        return item.orderid !== removeId;
    });
    totalPrice = 0;
    orderList.forEach(function (order) {
        orderListString += `<div class="order">
                        <div class="order-name">
                            <span class="order-name-name">${order.name}</span> 
                            <span class="order-name-remove" data-order-number="${order.orderid}">Remove</span>
                        </div>
                        <div class="order-price">
                            ${order.price}
                        </div>
                    </div>`

    })


    render();

}

function getTotalPrice() {
    for (const item of orderList) {
        totalPrice += item.price;
    }
    return totalPrice;
}

function render() {
    document.querySelector("#total-price").innerHTML = getTotalPrice();
    document.querySelector(".orders").innerHTML = orderListString;
    orderListString = "";
}


document.querySelector(".menu-feed").innerHTML = getMenuFeed();

document.getElementById("complete-order").addEventListener("click", function () {
    document.querySelector(".card-details-container").classList.remove("hidden");
})

// form validation

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("card-pay-button");

    submitButton.addEventListener("click", function () {
        const field1 = document.getElementById("field1");
        const field2 = document.getElementById("field2");
        const field3 = document.getElementById("field3");
        event.preventDefault()

        if (field1.checkValidity() && field2.checkValidity() && field3.checkValidity()) {
            myFunction();
        } else {
            alert("Please fill in all required fields.");
        }
    });

    function myFunction() {
        document.querySelector(".checkout").classList.add("hidden");
        document.querySelector(".thanks").innerHTML = `<h2>Thanks, ${field1.value}! Your order is on its way!</h2>`;
        document.querySelector(".thanks").classList.remove("hidden");
        document.querySelector(".card-details-container").classList.add("hidden");
    }

});

