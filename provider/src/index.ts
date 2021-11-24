import express from "express";
import { createProduct, productRepository } from "./data/products";
import { Product } from "./types";

export const app = express();

app.use((_req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
})
app.use(express.json())

const tryCreateProduct = async (body: any): Promise<Product> => {
    // okay, not a real promise yet. but possibly will be
    return new Promise((resolve, reject) => {
        if (!body) { return reject("Missing body") }
        try {
            const productTemplate = createProduct()
            // we don't have a database yet, so we generate an id manually
            body.id = productTemplate.id;
            const productDefinition = Object.keys(productTemplate)
            resolve(productDefinition
                .reduce((result, field) => {
                    if (!body[field]) throw `Missing field '${field}' in payload`
                    result[field] = body[field]
                    return result
                }, {} as any) as Product)
        } catch (e) {
            console.error(e)
            reject(e)
        }
    })
}

app.route("/v1/products")
    .get((req, res) => {
        const { isAvailable } = req.query;
        const result = isAvailable !== undefined
            ? productRepository.get().filter(p => p.isAvailable)
            : productRepository.get();
        res.status(200).send(result);
    })
    .post((req, res) => {
        const body = req.body as Product;
        tryCreateProduct(body)
            .then(product => (productRepository.add(product), res.status(201).send({ ...product })))
            .catch(e => res.status(400).send({ success: false, error: e }))
    });

app.get("/v1/products/:id", (req, res) => {
    const { id } = req.params;
    const result = productRepository.get().find(p => p.id === id);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send("not found")
    }
});

export const server = app.listen(3001, () => {
    console.log("pact evaluation provider running: http://localhost:3001")
})