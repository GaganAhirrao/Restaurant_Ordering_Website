import menuArray from '/data.js'

let orderDetails = []

const menuItems = menuArray.map(function (item) {
    return `<div class="items">
        <div class="divEmoji">
            <p>${item.emoji}</p>
        </div>
        <div class="item-details">
            <p class="item-name">${item.name}</p>
            <p class="item-ingredients">${item.ingredients}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        <button class="addToCartButton" data-id='${item.id}'>+</button> 
    </div>`
}).join('')

const mainContainer = document.querySelector('.main-container')
mainContainer.innerHTML = menuItems


//Adding the event listener on the entire document
document.addEventListener('click', function (e) {

    //to attach the click event to Add to Cart button
    if (e.target.dataset.id) {
        for (let item of menuArray) {
            if (e.target.dataset.id == item.id) {
                addItemsToCart(item.id)
            }
        }
    }

    //To attach the click event to the remove button from the cart
    if (e.target.dataset.uid) {
        //call the removeItemFromCart function
        removeItemFromCart(e.target.dataset.uid)
    }

    // listening for onclick on the confirm order button
    if (e.target.dataset.confirmorder) {
        const modal = document.getElementById("modal")
        modal.classList.remove("hide-modal")
    }
    

    // to listen for onclick on the Pay button
    if (e.target.dataset.name) {
        renderConfirmationMessage()
    }

})

function addItemsToCart(uid) {
    for (let item of menuArray) {
        if (item.id == uid) {
            let newObject = {
                name: item.name,
                id: item.id,
                price: item.price
            }
            orderDetails.push(newObject)
            renderCart(orderDetails)
        }
    }
}


function renderCart(cartDetails) {
    if (cartDetails.length != 0) {
        let cartHtmlString = ` <div id="cart" class="cart">
        <p id="your-order">Your order</p>
        <div class="cart-items-div">
        </div>
       
        </div> 
        <div class="confirm-order">
            <p id="total-price">Total Price:</p>
            <p id="calc-price"></p>
        </div>
        <button id="confirm-order" data-confirmorder="confirmOrder">Complete Order</button>
    </div>`
        document.querySelector(".orders-container").innerHTML = cartHtmlString
        renderSeparateItems()
    }
    else {
        document.querySelector(".orders-container").innerHTML = ""
    }
}

function renderSeparateItems() {
    for (let item of orderDetails) {
        let newDiv = ` <div class="cart-items">
            <p>${item.name}</p>
            <button data-uid='${item.id}'>remove</button>
            <p id="cart-item-price">$${item.price}</p>
        </div>`
        document.querySelector(".cart-items-div").innerHTML += newDiv
        calculateAndRenderPrice()
    }
}

function calculateAndRenderPrice() {
    let price = 0
    for (let item of orderDetails) {
        price += item.price
    }
    document.getElementById("calc-price").textContent = "$ " + price
}

function removeItemFromCart(uid) {
    if (orderDetails.length == 1) {
        orderDetails = []
        renderCart(orderDetails)
    }
    let index = 0
    let counter = 0
    for (let item of orderDetails) {
        if (item.id == uid) {
            index = orderDetails.indexOf(item)
            counter += 1
            break
        }
    }
    if (counter != 0) {
        orderDetails.splice(index, 1)
        renderCart(orderDetails)
    }
    else {
        renderCart(orderDetails)
    }

}

function renderConfirmationMessage() {
    // form.submit();
    const customerName = document.getElementById("input-name").value
    orderDetails = []
    const modal = document.getElementById("modal")
    modal.classList.add("hide-modal")
    const messageHtmlString = `<div class="confirmation-message">
            <p class="greeting-message">Thanks, ${customerName}! Your order is on its way!</p>
        </div>`
    document.querySelector(".orders-container").innerHTML = messageHtmlString
}






