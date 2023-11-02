import { createCartLine, showCartContent } from "./lib/ui.js";
import { formatPrice } from "./lib/helpers.js";
export { deleteTotal };

/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */

const products = [
  {
    id: 1,
    title: "HTML húfa",
    description:
      "Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.",
    price: 5_000,
  },
  {
    id: 2,
    title: "CSS sokkar",
    description: "Sokkar sem skalast vel með hvaða fótum sem er.",
    price: 3_000,
  },
  {
    id: 3,
    title: "JavaScript jakki",
    description: "Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.",
    price: 20_000,
  },
];

/** Bæta vöru í körfu
 * @param {Product} product
 * @param {number} quantity
 */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cartTableBodyElement = document.querySelector(".cart table tbody");
  // console.log("cartTableBodyElement :>> ", cartTableBodyElement);
  if (!cartTableBodyElement) {
    console.warn("fann ekki .cart");
    return;
  }

  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til
  const cartLine = createCartLine(product, quantity);
  cartTableBodyElement.appendChild(cartLine);

  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu
}
var quantityhufa = 1;
var quantitysokkar = 1;
var quantityjakki = 1;
var total = 0;
function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();

  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest("tr");
  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
  }
  if (productId == 1) {
    addProductToCart(product, quantityhufa);
    total = total + quantityhufa * product.price;
  } else if (productId == 2) {
    addProductToCart(product, quantitysokkar);
    total = total + quantitysokkar * product.price;
  } else {
    addProductToCart(product, quantityjakki);
    total = total + quantityjakki * product.price;
  }
  let oo = document.getElementById("samtals");
  if (oo) oo.innerHTML = total.toString();
  console.log(total);

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
}

// MITT SHIT: Er að finna öll input type number
const quantityLoc = document.querySelectorAll("input[type=number]");

function changeHandler(event) {
  // MITT SHIT: Parent node inputsins
  const changeParent = event.target.closest("tr");

  const productId = Number.parseInt(changeParent.dataset.productId);

  // MITT SHIT: Hér er ég að finna valueAsNumber sem breytist alltaf þegar ég breyti input
  const childOfParent = changeParent.valueAsNumber;
  // MITT SHIT: Finna valueAsNumber
  const changeValue = event.target.valueAsNumber;

  // MITT SHIT: Staðsetja hvar samtals er
  var totalClass = document.querySelector("tfoot tr .price");
  // MITT SHIT: Finna textContent .price klassans (kannski óþarfi)

  // MITT SHIT: Flokka hver fjöldi á við hverja vöru þegar bætt er við vöru í töflu
  if (productId == 1) {
    quantityhufa = changeValue;
  } else if (productId == 2) {
    quantitysokkar = changeValue;
  } else {
    quantityjakki = changeValue;
  }
}

// MITT SHIT: Staðsetja hvar samtals er
const totalClass = document.querySelector("tfoot tr .price");
// MITT SHIT: Finna textContent .price klassans (kannski óþarfi)
const totalClassText = totalClass?.textContent;
// MITT SHIT: Bara console log
console.log(totalClassText?.toString());
// MITT SHIT: Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(quantityLoc)) {
  // MITT SHIT: Bæta submit event listener við hvert
  form.addEventListener("change", changeHandler);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll(".add");
//MITT SHIT:
console.log(Array.from(addToCartForms));

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener("submit", submitHandler);
}

function deleteTotal(verd) {
  var samtalsLoc = document.getElementById("samtals");
  total = total - verd;
  console.log(total);
  if (samtalsLoc) samtalsLoc.innerHTML = total.toString();

  console.log(samtalsLoc?.innerText);
}

// TODO bæta við event handler á form sem submittar pöntun
