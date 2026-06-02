/**
 * UnIcon - React Example
 * 
 * This example demonstrates how to use UnIcon in a React application
 */

import React, { useState } from "react";
import { UnIcon, searchIcons, getCategories, getIconsByCategory } from "@unifesto/unicon/react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get all categories
  const categories = getCategories();

  // Get icons based on search and category
  const getFilteredIcons = () => {
    let icons = [];

    if (searchQuery) {
      // Search mode
      icons = searchIcons(searchQuery);
    } else if (selectedCategory !== "all") {
      // Category filter
      icons = getIconsByCategory(selectedCategory);
    } else {
      // All icons
      import("@unifesto/unicon").then(manifest => {
        icons = Object.keys(manifest.default);
      });
    }

    return icons;
  };

  const filteredIcons = getFilteredIcons();

  return (
    <div className="app">
      <header className="header">
        <h1>UnIcon - React Example</h1>
        <p>Cross-platform icon library for React, Next.js, Expo and React Native</p>
      </header>

      <main className="main">
        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search icons... (e.g., 'account', 'social')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Filter */}
        <div className="category-section">
          <button
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "active" : ""}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Icon Grid - Using Component */}
        <section>
          <h2>Using UnIcon Component</h2>
          <div className="icon-grid">
            <IconCard name="at" size={32} />
            <IconCard name="account" size={32} />
            <IconCard name="notification" size={32} />
            <IconCard name="mail" size={32} />
          </div>
        </section>

        {/* Icon Grid - Different Sizes */}
        <section>
          <h2>Different Sizes</h2>
          <div className="size-demo">
            <div className="size-item">
              <UnIcon name="notification" size={16} />
              <span>16px</span>
            </div>
            <div className="size-item">
              <UnIcon name="notification" size={24} />
              <span>24px</span>
            </div>
            <div className="size-item">
              <UnIcon name="notification" size={32} />
              <span>32px</span>
            </div>
            <div className="size-item">
              <UnIcon name="notification" size={48} />
              <span>48px</span>
            </div>
            <div className="size-item">
              <UnIcon name="notification" size={64} />
              <span>64px</span>
            </div>
          </div>
        </section>

        {/* Filtered Icons */}
        {filteredIcons.length > 0 && (
          <section>
            <h2>
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory !== "all"
                ? `Category: ${selectedCategory}`
                : "All Icons"}
            </h2>
            <div className="icon-grid">
              {filteredIcons.map((iconName) => (
                <IconCard key={iconName} name={iconName} size={32} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>© Unifesto Private Limited</p>
      </footer>
    </div>
  );
}

// Icon Card Component
function IconCard({ name, size = 32 }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<UnIcon name="${name}" size={${size}} />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="icon-card" onClick={handleCopy}>
      <UnIcon name={name} size={size} />
      <span className="icon-name">{name}</span>
      {copied && <span className="copied-badge">Copied!</span>}
    </div>
  );
}

export default App;
