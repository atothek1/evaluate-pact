const {resolve} = require("path");
const baseConfig = require("../../config/jest.base");

module.exports = async () => {
    const conf = baseConfig(resolve(__dirname, ".."));
    return {
        ...conf,
        testEnvironment: "jest-environment-jsdom",
        setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    };
};