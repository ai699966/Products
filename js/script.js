var cartProducts = [];
var currentUrl;
var companies = document.querySelectorAll('#page2 ul li');
var productItems;
var prod;
var neededProduct;

$('.productBtn').click(function () {
    window.location.assign("products.html")
})
$('#homeBtn').click(function () {
    window.location.assign("index.html")
})


if (window.location.pathname === '/index.html') {
    displayProduct()
} else if (window.location.pathname === '/products.html') {
    getAllProducts();
    document.querySelector('.all').addEventListener('click', function () {
        getAllProducts();
    })
}

(async function () {
    var productsUrl = await fetch('https://course-api.com/javascript-store-products', { method: 'GET' })
    var allProduct = await productsUrl.json();
    prod = allProduct;
    productItems = document.querySelectorAll('.add');
    addProduct();
    return prod;
})();

async function displayProduct() {
    var productsUrl = await fetch('https://course-api.com/javascript-store-products', { method: 'GET' })
    var allProduct = await productsUrl.json();
    console.log(allProduct);
    prod = allProduct;
    var cartona = ``;
    for (let i = 0; i < 3; i++) {
        let price = prod[i].fields.price / 100;
        cartona += `<div class = 'col-md-4 p-3 add'>
                        <div>
                            <img class = 'img-fluid imgContain rounded ' src= '${prod[i].fields.image[0].url}'>
                        </div>
                        <h3 class = 'text-center text-muted mt-2'>${prod[i].fields.name}</h3>
                        <h5 class = 'text-center'>${price}$</h5>

                    </div>`;

    }

    document.getElementById('homeProduct').innerHTML = cartona;
    return prod
}

async function getAllProducts() {
    var productsUrl = await fetch('https://course-api.com/javascript-store-products', { method: 'GET' })
    var allProduct = await productsUrl.json();
    prod = allProduct
    var cartona = ``;
    for (let i = 0; i < allProduct.length; i++) {
        let price = prod[i].fields.price / 100;
        cartona += `<div class = 'col-md-4 p-3 add'>
                        <div>
                            <img class = 'img-fluid imgContain rounded ' src= '${prod[i].fields.image[0].url}'>
                        </div>
                        <h3 class = 'text-center text-muted'>${prod[i].fields.name}</h3>
                        <h5 class = 'text-center'>${price}$</h5>

                    </div>`;

    }
    document.getElementById('products').innerHTML = cartona;

}

for (let i = 0; i < companies.length; i++) {
    companies[i].addEventListener('click', function (e) {
        console.log(e.target.innerHTML);
        console.log(prod);
        let companyProductus = prod.filter((x) => x.fields.company == e.target.innerHTML.toLowerCase())
        console.log(companyProductus);
        var cartona = ``;
        for (let i = 0; i < companyProductus.length; i++) {
            let price = companyProductus[i].fields.price / 100;
            cartona += `<div class = 'col-md-4 p-3 add'>
                            <div>
                                <img class = 'img-fluid imgContain rounded ' src= '${companyProductus[i].fields.image[0].url}'>
                            </div>
                            <h3 class = 'text-center text-muted'>${companyProductus[i].fields.name}</h3>
                            <h5 class = 'text-center'>${price}$</h5>
    
                        </div>`;

        }
        document.getElementById('products').innerHTML = cartona;

    })
}

function search(term) {

    var cartona = ``;
    for (let i = 0; i < prod.length; i++) {
        if (prod[i].fields.name.toLowerCase().includes(term) == true || prod[i].fields.name.toLowerCase().includes(term) == true || prod[i].fields.company.toLowerCase().includes(term) == true) {
            let price = prod[i].fields.price / 100;
            cartona += `<div class = 'col-md-4 p-3'>
                        <div class = 'add'>
                            <img class = 'img-fluid imgContain rounded' src= '${prod[i].fields.image[0].url}'>
                        </div>
                        <h3 class = 'text-center text-muted'>${prod[i].fields.name}</h3>
                        <h5 class = 'text-center'>${price}$</h5>

                    </div>`;
        }

    }
    document.getElementById('products').innerHTML = cartona;
}

function addProduct() {
    for (let i = 0; i < productItems.length; i++) {
        productItems[i].addEventListener('click', function (e) {
            var currentIndex = i;
            neededProduct.push(e.target.src)
            document.querySelector('#cartSize').innerHTML = neededProduct.length
            localStorage.setItem('neededProduct', JSON.stringify(neededProduct));
            displayInBag(neededProduct)
        })
    }
}

if (localStorage.getItem('neededProduct') != null) {
    neededProduct = JSON.parse(localStorage.getItem('neededProduct'))
    displayInBag(neededProduct)
} else {
    neededProduct = [];

}

function displayInBag(neededProduct) {
    var cartona = ``;
    var currentIndex;
    for (let i = 0; i < neededProduct.length; i++) {
        currentIndex = i;
        cartona += ` <div class = 'm-3 row'>
                        <div class ='col-8'>
                        <img class = 'img-fluid bagImg rounded' src= '${neededProduct[i]}'>
                        </div>
                        <div class = 'col-4'></div>
                        <div class= 'w-50 m-auto py-2'><Button onclick = 'deletItem(${currentIndex})' class = 'btn btn-outline-danger btn-sm'>Remove</Button></div>
                        
                    </div>`
    }
    document.querySelector('.neededProduct').innerHTML = cartona;
    document.querySelector('#cartSize').innerHTML = neededProduct.length;
}

document.querySelector('.cart').addEventListener('click', function () {
    document.getElementById("myBag").style.display = 'block';
    document.getElementById("bagContent").style.right = '0';
})

document.querySelector('#close').addEventListener('click', function () {
    document.getElementById("myBag").style.display = 'none';
    document.getElementById("bagContent").style.right = '-30%';
})

function deletItem(param) {
    neededProduct.splice(param, 1)
    localStorage.setItem('neededProduct', JSON.stringify(neededProduct));
    document.querySelector('#cartSize').innerHTML = neededProduct.length;
    displayInBag(neededProduct)
}



