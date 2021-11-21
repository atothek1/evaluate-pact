import express from "express";
import { products } from "./data/products";

export const server = express();

server.use((_req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
})

server.get("/v1/products", (_req, res) => {
    res.status(200).send(products)
});

server.listen(3001, () => {
    console.log("pact evaluation provider running: http://localhost:3001")
})