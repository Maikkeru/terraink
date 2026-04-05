import { generateFlagTheme } from "./generateFlagTheme";

console.log(generateFlagTheme({ countryCode: "US" }));
console.log(generateFlagTheme({ countryCode: "US", stateCode: "US-NM" }));
console.log(generateFlagTheme({ countryCode: "DE" }));