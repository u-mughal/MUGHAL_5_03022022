document.addEventListener("DOMContentLoaded", function (event) {

  //-------------------fonction principale-------------------//
  //--------------------------------------------------------//
  async function main() {

    let ApiArray = [];

    let localStorageArray = getLocalStorageProduct(); // On recupere le localstorage

    for (let i = 0; i < localStorageArray.length; i++) {
      ApiArray.push(await GetApi(localStorageArray[i]));
    }

    let AllProducts = ConcatArray(localStorageArray, ApiArray);

    displayCart(AllProducts);

    displayTotalPrice(AllProducts);

    Listen(AllProducts);
  }

  main();


  // recuperation localstorage et du tableau localstorage lorsqu'il y a une valeur
  function getLocalStorageProduct() {

    let getLocalStorage = [];

    for (let i = 0; i < localStorage.length; i++) {
      // une cle par produit
      getLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }

    return getLocalStorage;

  }

  function GetApi(localStorageArray) {

    return fetch("http://localhost:3000/api/products/" + localStorageArray.id)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function ConcatArray(localStorageArray, ApiArray) {

    let AllProducts = [];

    for (let i = 0; i < localStorageArray.length; i++) {

      let ObjectProduct = {
        altTxt: ApiArray[i].altTxt,
        colors: localStorageArray[i].color,
        description: ApiArray[i].description,
        imageUrl: ApiArray[i].imageUrl,
        name: ApiArray[i].name,
        price: ApiArray[i].price,
        _id: localStorageArray[i].id,
        qty: localStorageArray[i].qty
      }

      AllProducts.push(ObjectProduct);

    }

    return AllProducts;
  }

  // recuperation produit du localstorage (panier) et affichage
  function displayCart(AllProducts) {
    // boucle for of pour afficher chaquer produit
    for (product of AllProducts) {
      const element = document.getElementById("cart__items");
      element.insertAdjacentHTML(
        "beforeend",
        `<article class="cart__item" data-id="${product.id}">
                  <div class="cart__item__img">
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__titlePrice">
                          <h2>${product.name} ${product.colors}</h2>
                          <p>${product.price} €</p>
                      </div>
                      <div class="cart__item__content__settings">
                          <div class="cart__item__content__settings__quantity">
                          <p>Qté : </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                      </div>
                  </div>
              </div>
            </article>`
      );
    }
  }


  function displayTotalPrice(AllProducts) {

    let totalPrice = 0;
    let totalQty = 0;

    for (product of AllProducts) {
      totalPrice += parseInt(product.qty * product.price);
      totalQty += parseInt(product.qty);
    }

    const DtotalQty = document.getElementById("totalQuantity");
    const DtotalPrice = document.getElementById("totalPrice");

    DtotalQty.innerText = totalQty;
    DtotalPrice.innerText = totalPrice;

  }

  //-------------------Fonction principal d'écoute-------------------//
  //----------------------------------------------------------------//
  function Listen(AllProducts) {
    // Fonction si changement dans notre input quantity.
    ecoutequantity(AllProducts);
    // Fonction si on veux supprimer un éléments de la liste.
    //ecoutedeleteProduct(AllProducts);
  }

  function ecoutequantity(AllProducts) {

    let qtyinput = document.querySelectorAll(".itemQuantity");

    qtyinput.forEach(function (input) {
      input.addEventListener("change", function (inputevent) {

        let inputQty = inputevent.target.value;

        if (inputQty >= 1 && inputQty <= 100) {
          const productName = input
            .closest("div.cart__item__content")
            .querySelector("div.cart__item__content__titlePrice > h2").innerText;

          // une fois les valeurs changer dans le localstorage

          // on change les valeurs dans le array allproducts

          // on refait appel à la fonction displaytotalprice
        } else {
          alert("Choisis une bonne quantité trou de fesse");
        }
      })
    });
  }

  //Instauration formulaire avec regex
  function Form() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  }

});