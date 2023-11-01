import { createCartLine, showCartContent } from "./lib/ui.js";
import { formatPrice } from "./lib/helpers.js";

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

// const addToCartForms = document.querySelectorAll(".add");

// function addProductToCart(product) {
//   const cartElement = document.querySelector(".cart");

//   if (!cartElement) {
//     console.warn("fann ekki .cart");
//     return;
//   }

//   const emptyMessage = cartElement.querySelector(".empty-message");
//   const cartContent = cartElement.querySelector(".cart-content");

//   if (!emptyMessage || !cartContent) {
//     console.warn("fann ekki element");
//     return;
//   }

//   emptyMessage.classList.add("hidden");
//   cartContent.classList.remove("hidden");

//   const productElement = document.createElement("div");
//   const productTitleElement = document.createElement("strong");
//   const productPriceElement = document.createElement("span");
//   productPriceElement.textContent = formatNumber(product.price);

//   productTitleElement.textContent = product.title;

//   productElement.appendChild(productTitleElement);
//   productElement.appendChild(productPriceElement);
//   cartContent.appendChild(productElement);
// }

// function submitHandler(event) {
//   event.preventDefault();
//   const parent = event.target.closest("tr");

//   const productId = Number.parseInt(parent.dataset.productId);

//   const product = products.find((i) => i.id === productId);

//   addProductToCart(product);
// }
// function createAddToCartForm(form) {
//   form.addEventListener("submit", submitHandler);
// }
// for (const form of Array.from(addToCartForms)) {
//   createAddToCartForm(form);
// }

/** Bæta vöru í körfu
 * @param {Product} product
 * @param {number} quantity
 */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cartTableBodyElement = document.querySelector(".cart table tbody");
  console.log("cartTableBodyElement :>> ", cartTableBodyElement);
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

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  const quantity = 1;

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll(".add");

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener("submit", submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun
