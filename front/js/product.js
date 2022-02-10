document.addEventListener("DOMContentLoaded", function(event) {

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
      console.log(product);
  
  }
  
  main();

      //-------------------Fonction d'intérrogation de notre api avec productId-------------------//
    //-----------------------------------------------------------------------------------------//
    async function GetId(productId) {
      return fetch("http://localhost:3000/api/products/"+productId)
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
      const parentPrice = document.getElementById ("price");
      const parentDescription = document.getElementById ("description");
      const parentQuantity = document.getElementById ("quantity");

      var baliseimg = document.createElement("img");
      baliseimg.setAttribute("src",product.imageUrl);
      baliseimg.setAttribute("alt",product.altTxt);

      parentImg[0].appendChild(baliseimg)

      parenttitle.innerHTML = product.name;
      parentName.innerText = product.name;


    }


});
