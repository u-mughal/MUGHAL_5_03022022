document.addEventListener("DOMContentLoaded", function (event) {

  //-------------------fonction principale-------------------//
  //--------------------------------------------------------//
  async function main() {
    let localStorageArray = localStorageProductKey(); // On recupere le localstorage
    displayCart(localStorageArray); // On affiche le panier du localstorage
    listenelement(); // ecoute du produit

    function listenelement() {
      deleteProduct();
    }
  }

  main();

});

// recuperation localstorage et du tableau localstorage lorsqu'il y a une valeur
function localStorageProductKey() {
  let getLocalStorage = [];
  for (let i = 0; i < localStorage.length; i++) {
    // une cle par produit
    getLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
  }
  return getLocalStorage;
}


// recuperation produit du localstorage (panier) et affichage
function displayCart(localStorageProductKey) {
  // boucle for of pour afficher chaquer produit
  for (product of localStorageProductKey) {
    const element = document.getElementById("cart__items");
    element.insertAdjacentHTML(
      "beforeend",
      `<article class="cart__item" data-id="${product.id}">
                  <div class="cart__item__img">
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__titlePrice">
                          <h2>${product.name} ${product.color}</h2>
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


// suppression d'un element dans le panier
function deleteProduct() {
  let deleteLink = document.querySelectorAll(".deleteItem");

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