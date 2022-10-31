import { crearProductos } from "../utils/createFakeProducts.js";

let productsToSend;

//generador de productos Mocks
const fakeProductGenerator = () => {
  productsToSend = [];
  for (let i = 0; i < 5; i++) {
    productsToSend.push(crearProductos());
  }
};

//Enviar porductos mocks
export const getData = async (req, res) => {
  fakeProductGenerator();
  res.json(productsToSend);
};
