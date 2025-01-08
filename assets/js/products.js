// Fetch data from JSON file
fetch('../backOfficeEcommerce/assets/data/data.json')
    .then(response => response.json())
    .then(data => {
        displayProducts(data.articles, data.panier);
    })
    .catch(error => console.error('Error:', error));

// Function to display products
function displayProducts(articles, panier) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear previous content

    articles.forEach(article => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('relative','p-5', 'transition-all', 'transform', 'hover:bg-green-100');

        // Check if the article is already in the cart
        const isInCart = panier.includes(article.id);

        productDiv.innerHTML = `
            <img src="../image/carton.png" alt="${article.name}" width="180" />
            <div class="absolute px-3 py-1 text-xs font-medium text-white uppercase bg-green-500 rounded top-3 left-3">
                Sale
            </div>
            <div class="absolute right-0 text-lg cursor-pointer hover:text-red-600">
                <i class="bx bx-heart"></i>
            </div>
            <div class="flex space-x-1 text-lg text-yellow-500">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star-half"></i>
            </div>
            <div class="mt-2 text-gray-900">
                <h4 class="text-lg font-medium capitalize">${article.name}</h4>
                <p class="text-sm font-semibold">$${article.price}</p>
                <button class="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onclick="addToCart(${article.id})">
                    ${isInCart ? 'Ajouté' : 'Ajouter au panier'} <i class="bx bx-cart"></i>
                </button>
            </div>
        `;

        productContainer.appendChild(productDiv);
    });
}

// Function to add product to cart
function addToCart(articleId) {
    fetch('../backOfficeEcommerce/assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            if (!data.panier.includes(articleId)) {
                data.panier.push(articleId);
                
                // Update the JSON file with the new cart contents
                // Note: You would typically need a backend service to handle file writing.
                // Here, we'll assume you're using a mock server or similar solution.
                
                // Update the display
                displayProducts(data.articles, data.panier);
            }
        })
        .catch(error => console.error('Error:', error));
}
