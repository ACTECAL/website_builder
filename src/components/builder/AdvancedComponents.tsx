import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Layers,
  Palette,
  Box,
  Grid3x3,
  Image,
  Type,
  Video,
  Music,
  FileText,
  Mail,
  Globe,
  MessageCircle,
  Monitor,
  Tablet,
  Smartphone,
  Heart,
  Star,
  TrendingUp,
  BarChart3,
  Activity,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  RotateCcw,
  Download,
  Share2,
  Copy,
  Eye,
  Settings,
} from 'lucide-react';

// Advanced Component Library
const ComponentLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['layout']));

  const categories = [
    { id: 'layout', name: 'Layout', icon: Grid3x3, color: '#6366f1' },
    { id: 'content', name: 'Content', icon: FileText, color: '#8b5cf6' },
    { id: 'media', name: 'Media', icon: Image, color: '#ec4899' },
    { id: 'forms', name: 'Forms', icon: Type, color: '#f59e0b' },
    { id: 'interactive', name: 'Interactive', icon: Zap, color: '#10b981' },
    { id: 'navigation', name: 'Navigation', icon: Globe, color: '#3b82f6' }
  ];

  const components = {
    layout: [
      { id: 'hero-section', name: 'Hero Section', icon: Star, description: 'Eye-catching hero with gradient background' },
      { id: 'feature-grid', name: 'Feature Grid', icon: Grid3x3, description: 'Responsive grid for features' },
      { id: 'testimonials', name: 'Testimonials', icon: Heart, description: 'Customer testimonials carousel' },
      { id: 'pricing-cards', name: 'Pricing Cards', icon: BarChart3, description: 'Beautiful pricing tables' }
    ],
    content: [
      { id: 'text-block', name: 'Text Block', icon: Type, description: 'Rich text content block' },
      { id: 'heading', name: 'Heading', icon: Type, description: 'Stylized heading component' },
      { id: 'paragraph', name: 'Paragraph', icon: FileText, description: 'Formatted paragraph text' },
      { id: 'quote', name: 'Quote', icon: FileText, description: 'Elegant quote block' }
    ],
    media: [
      { id: 'image-gallery', name: 'Image Gallery', icon: Image, description: 'Responsive image gallery' },
      { id: 'video-player', name: 'Video Player', icon: Video, description: 'Custom video player' },
      { id: 'audio-player', name: 'Audio Player', icon: Music, description: 'Styled audio player' },
      { id: 'lightbox', name: 'Lightbox', icon: Image, description: 'Image lightbox viewer' }
    ],
    forms: [
      { id: 'contact-form', name: 'Contact Form', icon: Mail, description: 'Multi-field contact form' },
      { id: 'newsletter', name: 'Newsletter', icon: Mail, description: 'Email subscription form' },
      { id: 'survey', name: 'Survey', icon: BarChart3, description: 'Interactive survey form' },
      { id: 'feedback', name: 'Feedback', icon: MessageCircle, description: 'User feedback form' }
    ],
    interactive: [
      { id: 'counter', name: 'Counter', icon: TrendingUp, description: 'Animated number counter' },
      { id: 'progress-bar', name: 'Progress Bar', icon: Activity, description: 'Animated progress indicator' },
      { id: 'accordion', name: 'Accordion', icon: ChevronDown, description: 'Collapsible content sections' },
      { id: 'tabs', name: 'Tabs', icon: Layers, description: 'Tabbed content interface' }
    ],
    navigation: [
      { id: 'navbar', name: 'Navbar', icon: Globe, description: 'Sticky navigation bar' },
      { id: 'sidebar', name: 'Sidebar', icon: Layers, description: 'Collapsible sidebar menu' },
      { id: 'breadcrumbs', name: 'Breadcrumbs', icon: ChevronRight, description: 'Navigation breadcrumbs' },
      { id: 'pagination', name: 'Pagination', icon: ChevronRight, description: 'Content pagination' }
    ]
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredComponents = Object.keys(components).reduce((acc, category) => {
    if (selectedCategory !== 'all' && selectedCategory !== category) return acc;

    const categoryItems = components[category as keyof typeof components];
    if (!categoryItems) return acc;

    const filtered = categoryItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, typeof components[keyof typeof components]>);

  return (
    <div className="component-library">
      <div className="library-header">
        <h3 className="library-title">
          <Sparkles size={20} />
          Component Library
        </h3>
        <div className="library-search">
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="category-filter">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
        >
          All Components
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          >
            <category.icon size={16} style={{ color: category.color }} />
            {category.name}
          </button>
        ))}
      </div>

      <div className="components-list">
        {Object.entries(filteredComponents).map(([category, items]) => {
          const categoryInfo = categories.find(c => c.id === category);
          const isExpanded = expandedCategories.has(category);

          if (!categoryInfo) return null;

          return (
            <div key={category} className="component-category">
              <button
                onClick={() => toggleCategory(category)}
                className="category-header"
              >
                <div className="category-info">
                  <categoryInfo.icon size={18} style={{ color: categoryInfo.color }} />
                  <span className="category-name">{categoryInfo.name}</span>
                  <span className="component-count">{items.length}</span>
                </div>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="category-components"
                  >
                    {items.map((component, index) => (
                      <motion.div
                        key={component.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="component-item interactive-card"
                        draggable
                        onDragStart={(e) => {
                          const dragEvent = e as unknown as React.DragEvent<HTMLDivElement>;
                          dragEvent.dataTransfer.setData('component', JSON.stringify(component));
                        }}
                      >
                        <div className="component-icon">
                          <component.icon size={20} />
                        </div>
                        <div className="component-info">
                          <h4 className="component-name">{component.name}</h4>
                          <p className="component-description">{component.description}</p>
                        </div>
                        <div className="component-actions">
                          <button className="action-btn" title="Preview">
                            <Eye size={14} />
                          </button>
                          <button className="action-btn" title="Add to canvas">
                            <Plus size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Advanced Property Inspector
const AdvancedPropertyInspector: React.FC = () => {
  const [selectedElement] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('style');
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const tabs = [
    { id: 'style', name: 'Style', icon: Palette },
    { id: 'layout', name: 'Layout', icon: Grid3x3 },
    { id: 'content', name: 'Content', icon: FileText },
    { id: 'interactions', name: 'Interactions', icon: Zap },
    { id: 'advanced', name: 'Advanced', icon: Settings }
  ];

  const propertyGroups = {
    style: [
      { name: 'Typography', properties: ['font-family', 'font-size', 'font-weight', 'line-height'] },
      { name: 'Colors', properties: ['color', 'background', 'border-color'] },
      { name: 'Spacing', properties: ['padding', 'margin', 'gap'] },
      { name: 'Borders', properties: ['border-width', 'border-style', 'border-radius'] }
    ],
    layout: [
      { name: 'Position', properties: ['position', 'top', 'left', 'right', 'bottom'] },
      { name: 'Size', properties: ['width', 'height', 'min-width', 'min-height'] },
      { name: 'Display', properties: ['display', 'flex-direction', 'justify-content', 'align-items'] },
      { name: 'Grid', properties: ['grid-template-columns', 'grid-gap', 'grid-area'] }
    ],
    content: [
      { name: 'Text', properties: ['text-align', 'text-decoration', 'text-transform'] },
      { name: 'Images', properties: ['src', 'alt', 'object-fit', 'object-position'] },
      { name: 'Links', properties: ['href', 'target', 'rel'] }
    ],
    interactions: [
      { name: 'Hover', properties: ['hover-color', 'hover-background', 'hover-transform'] },
      { name: 'Transitions', properties: ['transition-duration', 'transition-timing-function'] },
      { name: 'Animations', properties: ['animation-name', 'animation-duration', 'animation-delay'] }
    ],
    advanced: [
      { name: 'Custom CSS', properties: ['custom-classes', 'custom-styles'] },
      { name: 'Accessibility', properties: ['aria-label', 'role', 'tabindex'] },
      { name: 'SEO', properties: ['meta-title', 'meta-description'] }
    ]
  };

  const addToHistory = (change: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(change);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      // Apply undo logic
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      // Apply redo logic
    }
  };

  return (
    <div className="advanced-property-inspector">
      <div className="inspector-header">
        <h3 className="inspector-title">
          <Settings size={20} />
          Properties
        </h3>
        <div className="inspector-actions">
          <button onClick={undo} disabled={historyIndex <= 0} className="history-btn">
            <RotateCcw size={16} />
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1} className="history-btn">
            <RotateCcw size={16} style={{ transform: 'rotateY(180deg)' }} />
          </button>
        </div>
      </div>

      {selectedElement ? (
        <>
          <div className="element-info">
            <div className="element-type">{selectedElement.type}</div>
            <div className="element-name">{selectedElement.name}</div>
          </div>

          <div className="property-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon size={16} />
                {tab.name}
              </button>
            ))}
          </div>

          <div className="property-content">
            {propertyGroups[activeTab as keyof typeof propertyGroups]?.map((group, groupIndex) => (
              <div key={groupIndex} className="property-group">
                <h4 className="group-title">{group.name}</h4>
                <div className="properties-grid">
                  {group.properties.map((property, propIndex) => (
                    <div key={propIndex} className="property-item">
                      <label className="property-label">{property}</label>
                      <input
                        type="text"
                        className="property-input"
                        placeholder="Auto"
                        onChange={(e) => addToHistory({ property, value: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-selection">
          <div className="no-selection-icon">
            <Box size={48} />
          </div>
          <h4>No Element Selected</h4>
          <p>Select an element on the canvas to edit its properties</p>
        </div>
      )}
    </div>
  );
};

// Advanced Canvas Controls
const AdvancedCanvasControls: React.FC = () => {
  const [zoom, setZoom] = useState(100);
  const [device, setDevice] = useState('desktop');
  const [previewMode, setPreviewMode] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const devices = [
    { id: 'desktop', name: 'Desktop', icon: Monitor, width: '100%', height: '100%' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, width: '768px', height: '1024px' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, width: '375px', height: '667px' }
  ];

  const zoomLevels = [25, 50, 75, 100, 125, 150, 200];

  return (
    <div className="advanced-canvas-controls">
      <div className="controls-section">
        <h4 className="section-title">Device Preview</h4>
        <div className="device-buttons">
          {devices.map(d => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id)}
              className={`device-btn ${device === d.id ? 'active' : ''}`}
            >
              <d.icon size={16} />
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="controls-section">
        <h4 className="section-title">Zoom</h4>
        <div className="zoom-controls">
          <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="zoom-btn">
            <Minus size={16} />
          </button>
          <select value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="zoom-select">
            {zoomLevels.map(level => (
              <option key={level} value={level}>{level}%</option>
            ))}
          </select>
          <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="zoom-btn">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="controls-section">
        <h4 className="section-title">Options</h4>
        <div className="option-toggles">
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={previewMode}
              onChange={(e) => setPreviewMode(e.target.checked)}
            />
            <span className="toggle-label">Preview Mode</span>
          </label>
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            <span className="toggle-label">Show Grid</span>
          </label>
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={snapToGrid}
              onChange={(e) => setSnapToGrid(e.target.checked)}
            />
            <span className="toggle-label">Snap to Grid</span>
          </label>
        </div>
      </div>

      <div className="controls-section">
        <h4 className="section-title">Quick Actions</h4>
        <div className="action-buttons">
          <button className="action-btn">
            <Download size={16} />
            Export
          </button>
          <button className="action-btn">
            <Share2 size={16} />
            Share
          </button>
          <button className="action-btn">
            <Copy size={16} />
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
};

// Export all components
export { ComponentLibrary, AdvancedPropertyInspector, AdvancedCanvasControls };
export default ComponentLibrary;
