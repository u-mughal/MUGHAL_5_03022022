document.addEventListener("DOMContentLoaded", function (event) {

  //-------------------fonction principale-------------------//
  //--------------------------------------------------------//
  async function main() {

    // On Récupére l'Url.
    const url = new URL(window.location.href);
    // productId = à Id récupérer en paramètre de notre Url
    let productId = url.searchParams.get("id");

    // On Appel notre fonction qui va nous retourné notre produit de l'API
    let product = await GetId(productId);

    // Fonction d'affichage du produit.
    DisplayProduct(product);

    BtnClick(product);
  }

  main();

  //-------------------Fonction d'intérrogation de notre api avec productId-------------------//
  //-----------------------------------------------------------------------------------------//
  async function GetId(productId) {

    return fetch("http://localhost:3000/api/products/" + productId)
      .then(function (response) {
        //console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function DisplayProduct(product) {

    // Récuperation des parents
    const parenttitle = document.getElementsByTagName("title")[0];
    const parentImg = document.getElementsByClassName("item__img");
    const parentName = document.getElementById("title");
    const parentPrice = document.getElementById("price");
    const parentDescription = document.getElementById("description");
    const parentQuantity = document.getElementById("quantity");


    var baliseimg = document.createElement("img");
    baliseimg.setAttribute("src", product.imageUrl);
    baliseimg.setAttribute("alt", product.altTxt);

    parentImg[0].appendChild(baliseimg)

    parenttitle.innerHTML = product.name;
    parentName.innerText = product.name;
    parentPrice.innerText = product.price;
    parentDescription.innerText = product.description;
    parentQuantity.innerText = product.quantity;



    //* Création des choix couleur-------------------------------------------------
    let SelecteurCouleur = document.getElementById("colors")
    let options = product.colors

    options.forEach(function (element) {
      SelecteurCouleur.appendChild(new Option(element, element));
    })

  }

  // Declaration de la classe produit
  class productClass {
    constructor(id, color, qty) {
      this.id = id;
      this.color = color;
      this.qty = qty;
    }
  }


  function BtnClick(product) {
    // Initialisation des variables.
    let colorChoosen = "";
    let qtyChoosen = "";
    let qty = "";
    let BtnPanier = document.getElementById("addToCart");

    // Sélection des couleurs avec sont comportement au change.
    let colorSelection = document.getElementById("colors");
    colorSelection.addEventListener("change", function (e) {
      colorChoosen = e.target.value;
      console.log(colorChoosen);
    });

    let qtySelection = document.getElementById("quantity");
    qtySelection.addEventListener("change", function (e) {
      qty = e.target.value;
      console.log(qtyChoosen);
    });

    BtnPanier.addEventListener("click", function () {


      // Initialisation variable
      let ProductLocalStorage = [];
      let oldQty = 0;

      for (let i = 0; i < localStorage.length; i++) {
        ProductLocalStorage[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));

        if (product._id === ProductLocalStorage[i].id && ProductLocalStorage[i].color === colorChoosen) {
          oldQty = ProductLocalStorage[i].qty;
        }
      }

      qtyChoosen = parseInt(oldQty) + parseInt(qty);

      let productChoosen = new productClass(
        product._id,
        colorChoosen,
        qtyChoosen
      )

      if (colorChoosen != "" && qtyChoosen >= 1 && qtyChoosen <= 100) {

        localStorage.setItem(
          product.name + " " + colorChoosen,
          JSON.stringify(productChoosen)
        )
      } else {
        alert("tu t'est tromper ma caille");
      }


    })



  }

});
