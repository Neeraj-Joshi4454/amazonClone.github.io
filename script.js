document.querySelector("#search").addEventListener("click", async (e) => {
    e.preventDefault();
    const userSearch = document.querySelector("#userSearch").value;
    if (!userSearch) {
        alert("Please enter something");
    } else {
        const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${userSearch}&page=1&country=IN&sort_by=RELEVANCE&product_condition=ALL`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '127b01cb2bmsh46a6583d7dfba84p10896fjsn2cc35120a365',
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const mainData = result.data.products;
            console.log(mainData);

            mainData.map((val) => {
                document.querySelector("#productList").innerHTML += `
            <div>
                <div class="w-[18rem] shadow-lg bg-white rounded-lg">
                    <img
                    src="${val.product_photo}"
                    class="rounded-t-lg w-[100%] h-[40vh]"
                    alt=""
                    />
                    <div class="p-2">
                    <p class="text-xl">
                    ${val.product_title}
                    </p>
                    <p class="text-lg font-bold">Price : ${val.product_price} <del class="text-gray-400">${val.product_original_price}<del></p>
                    <button
                        class="mt-4 w-[100%] text-white bg-blue-800 shadow p-2 rounded-lg"
                    onclick="viewProduct('${val.asin}')">
                        View Details
                    </button>
                    </div>
                </div>
            </div>
        
        `;
            })

        } catch (error) {
            console.error(error);
        }
    }
});

function viewProduct(val) {

    localStorage.setItem('asin', val)
    window.location.assign('/product.html')
}



async function productDetails() {

    const asin = localStorage.getItem('asin');

    const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=IN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '127b01cb2bmsh46a6583d7dfba84p10896fjsn2cc35120a365',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const productDetail = result.data;
        console.log(productDetail)

        document.querySelector('#productPage').innerHTML = `
        
             <div>
                <div>
                    <img src="${productDetail.product_photo}" class="h-[40vh] w-[20rem] rounded-md shadow" alt="">
                    <div>
                        <p class="text-gray-500 text-sm">${productDetail.customers_say}</p>
                    </div>
                </div>
                <div>
                    <h1>${productDetail.product_title}</h1>
                    <p>Price :${productDetail.product_price} <del class="text-gray-500">${productDetail.product_original_price}</del> </p>
                    <p>Rating : ${productDetail.product_star_rating} : </p>
                    <button class="text-white bg-black p-2 rounded-md shadow" onclick="addToCart('${productDetail}')">Add To cart</button>
                </div>
            </div>
        
        `
    } catch (error) {
        console.error(error);
    }


}

function addToCart(product){
    console.log( " added to cart" , product)
}