import express from "express";
import { products } from "./data/products";

export const server = express();

server.use((_req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
})

server.get("/v1/products", (req, res) => {
    const {isAvailable} = req.query;
    const result = isAvailable !== undefined ? products.filter(p => p.isAvailable) : products;
    res.status(200).send(result);
});

server.listen(3001, () => {
    console.log("pact evaluation provider running: http://localhost:3001")
})