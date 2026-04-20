import React, { useState, useRef, useEffect } from "react";
import { Product } from "../data/products";
import { productsApi } from "../services/productsApi";

interface ProductDropdownProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
}

export const ProductDropdown: React.FC<ProductDropdownProps> = ({
  products,
  selectedProduct,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="product-dropdown-container" ref={dropdownRef}>
      <label className="product-dropdown-label">Select Workspace Product</label>
      <div 
        className={`product-dropdown-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="product-dropdown-selected">
          <div 
            className="product-dropdown-icon" 
            style={{ 
              backgroundColor: selectedProduct ? `${selectedProduct.color}22` : "#f1f5f9", 
              color: selectedProduct ? selectedProduct.color : "#64748b" 
            }}
          >
            <i className={selectedProduct ? selectedProduct.icon : "fa-solid fa-cube"}></i>
          </div>
          <span className="product-dropdown-name">
            {selectedProduct ? selectedProduct.name : "Select Product..."}
          </span>
        </div>
        <i className={`fa-solid fa-chevron-down dropdown-chevron ${isOpen ? 'open' : ''}`}></i>
      </div>

      {isOpen && (
        <div className="product-dropdown-menu animate-slide-up-dropdown">
          {products.map((product) => (
            <div
              key={product.name}
              className={`product-dropdown-item ${selectedProduct?.name === product.name ? "selected" : ""}`}
              onClick={() => {
                onSelect(product);
                setIsOpen(false);
              }}
            >
              <div 
                className="dropdown-item-icon"
                style={{ backgroundColor: `${product.color}22`, color: product.color }}
              >
                <i className={product.icon}></i>
              </div>
              <div className="dropdown-item-details">
                <div className="dropdown-item-name">{product.name}</div>
                <div className="dropdown-item-modules">{product.modules.length} modules</div>
              </div>
              {selectedProduct?.name === product.name && (
                <i className="fa-solid fa-check dropdown-item-check" style={{ color: product.color }}></i>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDropdown;
