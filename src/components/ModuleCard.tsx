import React from "react";

interface ModuleCardProps {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
  accentColor: string;
  icon: string;
  delayIndex: number;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  name,
  description,
  isSelected,
  onToggle,
  accentColor,
  icon,
  delayIndex,
}) => {
  const onKeyToggle: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(id);
    }
  };

  const staggerClass = `stagger-item-${Math.min(delayIndex, 12)}`;

  return (
    <div
      className={`choose-tile animate-scale-in ${isSelected ? "tile-selected" : ""} ${staggerClass}`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected ? "true" : "false"}
      onClick={() => onToggle(id)}
      onKeyDown={onKeyToggle}
      style={{
        "--accent-color": accentColor,
        "--delay": `${0.1 + delayIndex * 0.05}s`
      } as React.CSSProperties}
    >
      <div className="choose-tile-shimmer"></div>

      <div className="choose-icon-wrapper">
        <div className="choose-icon-glow"></div>
        <div className="choose-icon">
          <i
            className={icon}
            style={{ color: "var(--accent-color)" }}
            aria-hidden="true"
          ></i>
        </div>
      </div>

      <div className="choose-tile-text">
        <div className="choose-label-row">
          <div className="choose-label">{name}</div>
        </div>
        {description && <div className="choose-desc">{description}</div>}
      </div>

      <div
        className={`choose-check ${isSelected ? "check-active" : ""}`}
      >
        {isSelected && <i className="fa-solid fa-check"></i>}
      </div>
    </div>
  );
};

export default ModuleCard;
