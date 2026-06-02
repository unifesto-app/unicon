/**
 * UnIcon - Next.js Example
 * 
 * This example demonstrates how to use UnIcon in a Next.js application
 */

"use client";

import React, { useState } from "react";
import { UnIcon, searchIcons, getCategories, getIconsByCategory } from "@unifesto/unicon/react";
import Image from "next/image";

// Direct import example (better for bundle size)
import atIcon from "@unifesto/unicon/icons/at.png";
import mailIcon from "@unifesto/unicon/icons/mail.png";

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getCategories();

  const filteredIcons = searchQuery ? searchIcons(searchQuery) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">UnIcon - Next.js Example</h1>
        <p className="text-gray-600">
          Cross-platform icon library for React, Next.js, Expo and React Native
        </p>
      </header>

      <main className="space-y-12">
        {/* Method 1: Using UnIcon Component */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Method 1: Using UnIcon Component</h2>
          <div className="flex gap-4 flex-wrap">
            <UnIcon name="at" size={32} />
            <UnIcon name="account" size={32} className="text-blue-500" />
            <UnIcon name="notification" size={32} />
            <UnIcon name="mail" size={32} />
          </div>
          <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto">
            {`<UnIcon name="at" size={32} />
<UnIcon name="account" size={32} className="text-blue-500" />`}
          </pre>
        </section>

        {/* Method 2: Direct Import with Next.js Image */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Method 2: Direct Import (Better for Bundle Size)
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Image src={atIcon} alt="At" width={32} height={32} />
            <Image src={mailIcon} alt="Mail" width={32} height={32} />
          </div>
          <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto">
            {`import atIcon from "@unifesto/unicon/icons/at.png";
import Image from "next/image";

<Image src={atIcon} alt="At" width={32} height={32} />`}
          </pre>
        </section>

        {/* Different Sizes */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Responsive Sizes</h2>
          <div className="flex gap-6 items-end">
            <div className="text-center">
              <UnIcon name="notification" size={16} />
              <p className="text-xs mt-2">16px</p>
            </div>
            <div className="text-center">
              <UnIcon name="notification" size={24} />
              <p className="text-xs mt-2">24px</p>
            </div>
            <div className="text-center">
              <UnIcon name="notification" size={32} />
              <p className="text-xs mt-2">32px</p>
            </div>
            <div className="text-center">
              <UnIcon name="notification" size={48} />
              <p className="text-xs mt-2">48px</p>
            </div>
            <div className="text-center">
              <UnIcon name="notification" size={64} />
              <p className="text-xs mt-2">64px</p>
            </div>
          </div>
        </section>

        {/* Search Demo */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Search Icons</h2>
          <input
            type="text"
            placeholder="Search icons... (e.g., 'account', 'social')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {filteredIcons.length > 0 && (
            <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {filteredIcons.map((iconName) => (
                <div key={iconName} className="text-center p-2 hover:bg-gray-50 rounded">
                  <UnIcon name={iconName} size={32} />
                  <p className="text-xs mt-1 truncate">{iconName}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Categories */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="space-y-4">
            {categories.map((category) => {
              const icons = getIconsByCategory(category);
              return (
                <div key={category}>
                  <h3 className="text-lg font-medium mb-2 capitalize">{category}</h3>
                  <div className="flex gap-3 flex-wrap">
                    {icons.map((iconName) => (
                      <div
                        key={iconName}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded"
                      >
                        <UnIcon name={iconName} size={20} />
                        <span className="text-sm">{iconName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="text-center mt-12 text-gray-500">
        <p>© Unifesto Private Limited</p>
      </footer>
    </div>
  );
}
