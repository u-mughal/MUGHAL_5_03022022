/**
 *
 */
function main() {
    // recuperation element url
    const url = new URL(window.location.href);
    // implémentation id commande dans ID : orderid
    document.getElementById("orderId").innerText = url.searchParams.get("id");
    // suppression clé localstorage
    localStorage.clear();
}

main();