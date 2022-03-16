document.addEventListener("DOMContentLoaded", function (event) {

    //-------------------fonction principale-------------------//
    //--------------------------------------------------------//
    async function main() {
        // On Appel notre fonction qui va nous retourné nos produits de l'API
        // products = réponse API
        let products = await GetProducts();

        for (let product of products) {
            // Affichage des articles dans products
            DisplayProducts(product);
        }

    }

    main();

    //-------------------Fonction d'intérrogation de notre api avec product-------------------//
    //-----------------------------------------------------------------------------------------//
    async function GetProducts() {
        return fetch("http://localhost:3000/api/products")
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // affichage des produits
    function DisplayProducts(product) {

        // Récupération du parent.
        const ElementItems = document.getElementById("items");
        // Insertion HTML
        ElementItems.insertAdjacentHTML(
            "beforeend",
            `<a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                    </article>
                </a>`
        );

    }

});