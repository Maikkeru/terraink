import { resolveFlagPaletteKey } from "./flagResolver";
import flagPalettes from "../data/flagPalettes.json";


type LocationInput = {
  countryCode: string;
  stateCode?: string;
};

type FlagPaletteEntry = {
  colors: string[];
  source?: string;
};

const FLAG_MAP = flagPalettes as Record<string, FlagPaletteEntry>;

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((x) =>
        Math.max(0, Math.min(255, Math.round(x)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function mix(color1: string, color2: string, weight = 0.5) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  return rgbToHex(
    c1.r * (1 - weight) + c2.r * weight,
    c1.g * (1 - weight) + c2.g * weight,
    c1.b * (1 - weight) + c2.b * weight,
  );
}

function lighten(hex: string, amount = 0.2) {
  return mix(hex, "#FFFFFF", amount);
}

function darken(hex: string, amount = 0.2) {
  return mix(hex, "#000000", amount);
}

function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function sortByLuminance(colors: string[]): string[] {
  return [...colors].sort((a, b) => luminance(a) - luminance(b));
}

function isMostlyWhite(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return r > 220 && g > 220 && b > 220;
}

function isMostlyBlack(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return r < 40 && g < 40 && b < 40;
}

function isMostlyRed(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return r > 130 && r > g * 1.2 && r > b * 1.2;
}

function isMostlyBlue(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return b > 110 && b > r * 1.1 && b > g * 1.05;
}

function isMostlyGreen(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return g > 95 && g > r * 1.05 && g > b * 1.05;
}

function isMostlyYellowOrGold(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return r > 140 && g > 110 && b < 140;
}

function isNeutralLike(hex: string): boolean {
  return isMostlyWhite(hex) || isMostlyBlack(hex);
}

function getFlagPalette(location: LocationInput): string[] {
  if (location.stateCode && FLAG_MAP[location.stateCode]?.colors?.length) {
    return FLAG_MAP[location.stateCode].colors;
  }

  if (FLAG_MAP[location.countryCode]?.colors?.length) {
    return FLAG_MAP[location.countryCode].colors;
  }

  return ["#888888", "#CCCCCC", "#444444"];
}

function expandPalette(colors: string[]): string[] {
  if (colors.length >= 5) return colors.slice(0, 5);

  const result = [...colors];

  while (result.length < 5) {
    const base = result[result.length % colors.length];
    result.push(
      result.length % 2 === 0 ? lighten(base, 0.25) : darken(base, 0.25),
    );
  }

  return result.slice(0, 5);
}

function findDarkAnchor(colors: string[]): string {
  const explicitBlack = colors.find(isMostlyBlack);
  if (explicitBlack) return explicitBlack;

  return sortByLuminance(colors)[0];
}

function findNeutralBase(colors: string[]): string {
  const whiteLike = colors.find(isMostlyWhite);
  if (whiteLike) {
    // Turn pure white into a soft paper tone so maps don't go sterile gray
    return mix(whiteLike, "#E9E1D5", 0.35);
  }

  const lightest = sortByLuminance(colors)[colors.length - 1];
  return mix(lightest, "#F2ECE3", 0.45);
}

function findPrimaryAccent(colors: string[], darkAnchor: string): string {
  // Prefer non-neutral, non-red colors first to improve distinctiveness globally
  const preferred =
    colors.find(isMostlyBlue) ||
    colors.find(isMostlyGreen) ||
    colors.find(isMostlyYellowOrGold);

  if (preferred) return preferred;

  const nonNeutralNonRed = colors.find(
    (c) => !isNeutralLike(c) && !isMostlyRed(c),
  );
  if (nonNeutralNonRed) return nonNeutralNonRed;

  const nonNeutral = colors.find((c) => !isNeutralLike(c));
  if (nonNeutral) return nonNeutral;

  return darkAnchor;
}

function findRedAccent(colors: string[]): string | undefined {
  return colors.find(isMostlyRed);
}

function findSecondaryAccent(
  colors: string[],
  primaryAccent: string,
  darkAnchor: string,
): string {
  const distinct = colors.find(
    (c) =>
      c.toLowerCase() !== primaryAccent.toLowerCase() &&
      !isNeutralLike(c) &&
      !isMostlyRed(c),
  );

  if (distinct) return distinct;

  const fallbackDistinct = colors.find(
    (c) => c.toLowerCase() !== primaryAccent.toLowerCase() && !isNeutralLike(c),
  );

  if (fallbackDistinct) return fallbackDistinct;

  return darkAnchor;
}

export function generateFlagTheme(location: LocationInput) {
  const baseColors = expandPalette(getFlagPalette(location));

  const darkAnchor = findDarkAnchor(baseColors);
  const neutralBase = findNeutralBase(baseColors);
  const primaryAccent = findPrimaryAccent(baseColors, darkAnchor);
  const redAccent = findRedAccent(baseColors);
  const secondaryAccent = findSecondaryAccent(
    baseColors,
    primaryAccent,
    darkAnchor,
  );

  // Global weighting philosophy:
  // - white = neutral base only
  // - red = major accent only
  // - dark color = anchor/depth
  // - rarer flag color = identity / secondary emphasis

  const uiBg = darken(mix(darkAnchor, "#08111E", 0.3), 0.12);
  const uiText = isMostlyWhite(neutralBase)
    ? darken(neutralBase, 0.22)
    : lighten(neutralBase, 0.35);

  const land = mix(neutralBase, "#F5EFE7", 0.25);
  const buildings = mix(land, darkAnchor, 0.16);
  const water = mix(darkAnchor, primaryAccent, 0.18);
  const waterway = water;
  const parks = mix(land, secondaryAccent, 0.18);
  const aeroway = mix(land, darkAnchor, 0.1);
  const rail = mix(primaryAccent, land, 0.35);

  const roadsMajor = redAccent ?? primaryAccent;
  const roadsMinorHigh = primaryAccent;
  const roadsMinorMid = mix(primaryAccent, land, 0.45);
  const roadsMinorLow = mix(land, darkAnchor, 0.14);
  const roadsPath = mix(land, secondaryAccent, 0.22);
  const roadsOutline = mix(darkAnchor, land, 0.22);

  return {
    name: "Flag Themed",
    description: "Dynamically generated from regional flag colors.",
    ui: {
      bg: uiBg,
      text: uiText,
    },
    map: {
      land,
      water,
      waterway,
      parks,
      buildings,
      aeroway,
      rail,
      roads: {
        major: roadsMajor,
        path: roadsPath,
        outline: roadsOutline,
        minor_high: roadsMinorHigh,
        minor_mid: roadsMinorMid,
        minor_low: roadsMinorLow,
      },
    },
  };
}