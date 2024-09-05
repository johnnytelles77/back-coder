/* 
import { expect } from "chai";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import envConfig from "../src/config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Test carts", () => {
    let cookie;
    let cartId;
    let productId = `66d7563ddf6f1c49a3db9dee` // Reemplazado con un ID de producto real

    before(async () => {
        const loginUser = {
            email: "usuario2@test.com",
            password: "12345"
        };

        // Solicitud de login
        const { headers, body } = await requester
            .post("/api/session/login")
            .send(loginUser);

        console.log("Respuesta de login:", body);

        if (body.status === 'success' && body.payload) {
            const cookieResult = headers["set-cookie"][0];
            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1],
            };

            console.log("Cookie extraída:", cookie);

            const token = cookie.value.split(';')[0];
            const decodedToken = jwt.decode(token);
            console.log("Token decodificado:", decodedToken);

            // Inicializa cartId y productId para las pruebas
            cartId = decodedToken.cart;  // Asegúrate de que este campo esté presente en el token

            console.log("Cart ID:", cartId);
            console.log("Product ID:", productId);
        } else {
            throw new Error("No se pudo obtener un token válido o la respuesta del login no es la esperada.");
        }
    });

    it("[POST] /api/carts/:cid/product/:pid este endpoint debe agregar un producto al carrito", async () => {
        const { status, _body, ok } = await requester
            .post(`/api/carts/${cartId}/product/${productId}`)
            .set("Cookie", `${cookie.name}=${cookie.value}`);
        
        console.log("Respuesta del endpoint:", _body);
        
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body).to.have.property('payload');
        expect(_body.payload).to.be.an("object");
        expect(_body.payload.products).to.be.an("array");
        expect(_body.payload.products).to.deep.include({ product: productId, quantity: 1 });
    });

    // Agrega más pruebas aquí si es necesario
});
 */

import { expect } from "chai";
import supertest from "supertest";
import jwt from "jsonwebtoken";
import envConfig from "../src/config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe("Test carts", () => {
    let cookie;
    let cartId;
    let productId = '66433e9079ad1021ab6c7f6e';  

    before(async () => {
        const loginUser = {
            email: "usuario2@test.com",
            password: "12345"
        };

        // Solicitud de login
        const { headers, body } = await requester
            .post("/api/session/login")
            .send(loginUser);

        console.log("Respuesta de login:", body);

        if (body.status === 'success' && body.payload) {
            const cookieResult = headers["set-cookie"][0];
            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1],
            };

            console.log("Cookie extraída:", cookie);

            const token = cookie.value.split(';')[0];
            const decodedToken = jwt.decode(token);
            console.log("Token decodificado:", decodedToken);

            
            const createCartResponse = await requester
                .post(`/api/carts`)
                .set("Cookie", `${cookie.name}=${cookie.value}`);

            console.log("Respuesta completa de crear carrito:", createCartResponse.body);

            if (createCartResponse.body && createCartResponse.body.status === 'success' && createCartResponse.body.payload) {
                cartId = createCartResponse.body.payload._id;
                console.log("Cart ID:", cartId);
            } else {
                throw new Error("No se pudo crear el carrito o la respuesta del servidor no es la esperada.");
            }
        } else {
            throw new Error("No se pudo obtener un token válido o la respuesta del login no es la esperada.");
        }
    });

    it("[POST] /api/carts/:cid/product/:pid debe agregar un producto al carrito", async () => {
        console.log("Cart ID en la prueba:", cartId);

        const { status, _body, ok } = await requester
            .post(`/api/carts/${cartId}/product/${productId}`)
            .set("Cookie", `${cookie.name}=${cookie.value}`);
        
        console.log("Respuesta del endpoint:", _body);
        
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body).to.have.property('payload');
        expect(_body.payload).to.be.an("object");
        expect(_body.payload.products).to.be.an("array");
        expect(_body.payload.products).to.deep.include({ product: productId, quantity: 1 });
    });

});
