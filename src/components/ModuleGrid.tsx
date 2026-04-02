import React from "react";
import ModuleCard from "./ModuleCard";

interface Module {
  id: string;
  name: string;
  description: string;
}

interface ModuleGridProps {
  modules: Module[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onToggleAll: (selectAll: boolean) => void;
  accentColor: string;
  icon: string;
  isSwitching: boolean;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({
  modules,
  selectedIds,
  onToggle,
  onToggleAll,
  accentColor,
  icon,
  isSwitching,
}) => {
  if (isSwitching) {
    return (
      <div className="module-grid-loading">
        <i className="fa-solid fa-circle-notch fa-spin module-spinner" style={{ color: accentColor }}></i>
        <p>Loading modules...</p>
      </div>
    );
  }

  if (!modules || modules.length === 0) {
    return (
      <div className="no-results">
        <p>No modules available for this product.</p>
      </div>
    );
  }

  const allSelected = modules.length > 0 && modules.every((m) => selectedIds.includes(m.id));

  const toggleAll = () => {
    onToggleAll(!allSelected);
  };

  return (
    <div className="module-grid-container">
      <div className="search-result-category-header">
        <h3 className="search-result-category">
          <i className={icon} style={{ color: accentColor }}></i> Available Modules
        </h3>
        <button className="cat-select-all-btn" onClick={toggleAll}>
          {allSelected ? "Deselect all" : "Select all"}
        </button>
      </div>
      <div className="choose-grid">
        {modules.map((m, index) => (
          <ModuleCard
            key={m.id}
            id={m.id}
            name={m.name}
            description={m.description}
            isSelected={selectedIds.includes(m.id)}
            onToggle={onToggle}
            accentColor={accentColor}
            icon={icon} 
            delayIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleGrid;
