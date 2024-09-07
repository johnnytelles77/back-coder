import supertest from "supertest";
import envConfig from "../src/config/env.config.js";
import { expect } from "chai";
import mongoose from "mongoose";

mongoose.connect(envConfig.MONGO_URL); // Conectar a la base de datos

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Cart Test", () => {
  let cookie;
  let cartId;
  let productId;

  before(async () => {
    // Realizamos el login
    const loginUser = {
      email: "usuario12@test.com",
      password: "12345",
    };

    // Hacemos la solicitud de login
    const { headers } = await requester.post("/api/session/login").send(loginUser);
    console.log(headers)

    const cookieResult = headers["set-cookie"][0];
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1].split(";")[0],
    };

    // Creamos un carrito
    const cartResponse = await requester
      .post("/api/carts")
      .set("Cookie", `${cookie.name}=${cookie.value}`);
    cartId = cartResponse.body._id;

    // Creamos un producto para agregar al carrito
    const newProduct = {
      title: "Prueba",
      description: "Esta es una prueba",
      price: 35000,
      thumbnail: ["http://www.ropacanchera.com/prueba"],
      code: "CGTP1250",
      category: "Pruebas",
      stock: 5,
    };

    const productResponse = await requester
      .post("/api/products")
      .send(newProduct)
      .set("Cookie", `${cookie.name}=${cookie.value}`);

    productId = productResponse.body._id;
  });

  it("[POST] /api/carts/:cid/product/:pid => Debe agregar un producto al carrito", async () => {
    const { status, body, ok } = await requester
      .post(`/api/carts/${cartId}/product/${productId}`)
      .set("Cookie", `${cookie.name}=${cookie.value}`);

    expect(status).to.equal(200);
    expect(ok).to.be.true;
    expect(body).to.have.property("status", "Success");
    expect(body.payload).to.have.property("_id", cartId);
    expect(body.payload.products).to.be.an("array");

    // Verificamos que el producto fue agregado correctamente al carrito
    const productInCart = body.payload.products.find((p) => p.product._id === productId);
    expect(productInCart).to.exist;
  });

  after(async () => {
    await mongoose.disconnect(); // Desconectamos la base de datos después de las pruebas
  });
});
