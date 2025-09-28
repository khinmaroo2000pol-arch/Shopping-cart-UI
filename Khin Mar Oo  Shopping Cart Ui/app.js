let tempProduct = {}; // for temp storage data

function addToCart(productName,productPrice,productImage){
    // alert('it work');
    tempProduct = {
        name : productName,
        price : productPrice,
        image : productImage
    } 


    document.querySelector('#box').classList.remove('d-none');
    document.querySelector('#box').classList.add('d-block');
}

function cancel(){
    document.querySelector('#box').classList.remove('d-block');
    document.querySelector('#box').classList.add('d-none');
}
function add(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let checkProduct = cart.find(item => item.name === tempProduct.name);
    if(checkProduct){
        checkProduct.qty +=1;
    } else {
        let product = {
            id : cart.length +1,
            name : tempProduct.name,
            price : tempProduct.price,
            image : tempProduct.image,
            qty : 1
        }
        cart.push(product);
        
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    tempProduct = {}
    cancel();
    upgrade();
}
function loadData(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItem =document.querySelector('.carts');
    let price = document.querySelector('#total');
    let total = 0;
    cartItem.innerHTML = '';
    if(cart.length === 0){
        cartItem.innerHTML = `<h4 class="text-center text-danger">Your cart is empty</h4>`;
    } else {
        cart.forEach((item,index)=>{
            cartItem.innerHTML += `
              <div class="cart d-flex justify-content-between">
                    <img src="imgs/${item.image}" alt="" style="width: 100px; ">
                    <div class="info text-end">
                        <h4 class="m-0">${item.name}</h4>
                        <p class="m-0 fs-4">Price: $ ${item.price}</p>
                        <div class="btns">
                            <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
                        </div>
                    </div>
                </div> <hr>
            `;
            total += item.price * item.qty;
            price.textContent = total;
        })
    }
}
function changeQuantity(index,action){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(action == 'increase'){
        cart[index].qty +=1;
    } else if(action == 'decrease') {
        cart[index].qty -=1;
        
    }
    if (cart[index].qty==0){
        cart.splice (index,1);
        
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    loadData();
    upgrade();
}
function clearAll(){
    let price = document.querySelector('#total');
    localStorage.removeItem('cart');
    loadData();
    total = 0;
    price.textContent = total;
    upgrade();
    
    
}
function upgrade(){
    let cartqty = document.querySelector('.cartqty');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalqty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartqty.textContent = totalqty;
    loadData();
}
upgrade();





