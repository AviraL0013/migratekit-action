import { stripeChargesRule } from "./stripeChargesRule";
import { openAIModelRule } from "./openAIModelRule";
import { MigrationRule } from "./types";

export const RULES: MigrationRule[] = [
  stripeChargesRule,
  openAIModelRule
];
