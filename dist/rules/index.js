"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULES = void 0;
const stripeChargesRule_1 = require("./stripeChargesRule");
const openAIModelRule_1 = require("./openAIModelRule");
exports.RULES = [
    stripeChargesRule_1.stripeChargesRule,
    openAIModelRule_1.openAIModelRule
];
