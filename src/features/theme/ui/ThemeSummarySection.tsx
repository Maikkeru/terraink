import type { RefObject } from "react";
import ThemeCard from "./ThemeCard";
import { EditIcon } from "@/shared/ui/Icons";
import type { ThemeOption } from "../domain/types";
import { usePosterContext } from "@/features/poster/ui/PosterContext";
import { getThemePalette } from "../infrastructure/themeRepository";

interface ThemeSummarySectionProps {
  listRef?: RefObject<HTMLDivElement>;
  themeOptions: ThemeOption[];
  selectedThemeId: string;
  selectedThemeOption: ThemeOption;
  onThemeSelect: (themeId: string) => void;
  onCustomize: () => void;
}

export default function ThemeSummarySection({
  listRef,
  themeOptions,
  selectedThemeId,
  selectedThemeOption,
  onThemeSelect,
  onCustomize,
}: ThemeSummarySectionProps) {
    const { state, effectiveTheme } = usePosterContext();

  const liveFlagPalette =
    state.form.theme === "flag_themed"
      ? getThemePalette(effectiveTheme)
      : undefined;
  const description =
    selectedThemeOption.description?.trim() || "No description available.";

  return (
    <div className="theme-summary-view">
      <div className="theme-summary-head">
        <div className="theme-summary-copy">
          <p className="theme-summary-label">
            Theme: <span className="theme-summary-label-name">{selectedThemeOption.name}</span>
          </p>
          <p className="theme-card-description">{description}</p>
        </div>
        <button
          type="button"
          className="theme-customize-btn"
          onClick={onCustomize}
          aria-label={`Customize ${selectedThemeOption.name} colors`}
        >
          <span className="theme-customize-icon" aria-hidden="true">
            <EditIcon />
          </span>
        </button>
      </div>

      <div
        className="theme-card-list card-scroll-list"
        role="list"
        aria-label="Theme options"
        ref={listRef}
      >
{themeOptions.map((themeOption) => (
  <ThemeCard
    key={themeOption.id}
    themeOption={themeOption}
    isSelected={themeOption.id === selectedThemeId}
    onClick={() => onThemeSelect(themeOption.id)}
    paletteOverride={
      themeOption.id === "flag_themed" ? liveFlagPalette : undefined
    }
  />
))}
      </div>
    </div>
  );
}
