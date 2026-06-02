/**
 * UnIcon - React Native/Expo Example
 * 
 * This example demonstrates how to use UnIcon in React Native and Expo
 */

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  UnIcon,
  searchIcons,
  getCategories,
  getIconsByCategory,
} from "@unifesto/unicon/react-native";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = getCategories();

  const getFilteredIcons = () => {
    if (searchQuery) {
      return searchIcons(searchQuery);
    }
    if (selectedCategory !== "all") {
      return getIconsByCategory(selectedCategory);
    }
    // Return all icons
    return [
      "account",
      "appearance",
      "apple",
      "at",
      "google",
      "instagram",
      "mail",
      "notification",
      "permission",
      "phone",
      "rate",
      "signout",
      "support",
    ];
  };

  const filteredIcons = getFilteredIcons();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>UnIcon</Text>
          <Text style={styles.subtitle}>React Native Example</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.section}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search icons..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === "all" && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory("all")}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === "all" && styles.categoryButtonTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Using UnIcon Component */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Using UnIcon Component</Text>
          <View style={styles.iconRow}>
            <View style={styles.iconItem}>
              <UnIcon name="at" size={32} />
              <Text style={styles.iconLabel}>at</Text>
            </View>
            <View style={styles.iconItem}>
              <UnIcon name="account" size={32} />
              <Text style={styles.iconLabel}>account</Text>
            </View>
            <View style={styles.iconItem}>
              <UnIcon name="notification" size={32} />
              <Text style={styles.iconLabel}>notification</Text>
            </View>
            <View style={styles.iconItem}>
              <UnIcon name="mail" size={32} />
              <Text style={styles.iconLabel}>mail</Text>
            </View>
          </View>
        </View>

        {/* Different Sizes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Different Sizes</Text>
          <View style={styles.sizeRow}>
            <View style={styles.sizeItem}>
              <UnIcon name="notification" size={16} />
              <Text style={styles.sizeLabel}>16px</Text>
            </View>
            <View style={styles.sizeItem}>
              <UnIcon name="notification" size={24} />
              <Text style={styles.sizeLabel}>24px</Text>
            </View>
            <View style={styles.sizeItem}>
              <UnIcon name="notification" size={32} />
              <Text style={styles.sizeLabel}>32px</Text>
            </View>
            <View style={styles.sizeItem}>
              <UnIcon name="notification" size={48} />
              <Text style={styles.sizeLabel}>48px</Text>
            </View>
            <View style={styles.sizeItem}>
              <UnIcon name="notification" size={64} />
              <Text style={styles.sizeLabel}>64px</Text>
            </View>
          </View>
        </View>

        {/* Custom Styling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Styling</Text>
          <View style={styles.iconRow}>
            <View style={styles.iconItem}>
              <UnIcon
                name="at"
                size={32}
                style={{ tintColor: "#3491ff" }}
              />
              <Text style={styles.iconLabel}>Blue</Text>
            </View>
            <View style={styles.iconItem}>
              <UnIcon
                name="notification"
                size={32}
                style={{ tintColor: "#10b981" }}
              />
              <Text style={styles.iconLabel}>Green</Text>
            </View>
            <View style={styles.iconItem}>
              <UnIcon
                name="rate"
                size={32}
                style={{ tintColor: "#f59e0b" }}
              />
              <Text style={styles.iconLabel}>Orange</Text>
            </View>
            <View style={styles.iconItem}>
              <UnIcon
                name="signout"
                size={32}
                style={{ tintColor: "#ef4444" }}
              />
              <Text style={styles.iconLabel}>Red</Text>
            </View>
          </View>
        </View>

        {/* Filtered Icons Grid */}
        {filteredIcons.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {searchQuery
                ? `Search Results (${filteredIcons.length})`
                : selectedCategory !== "all"
                ? `Category: ${selectedCategory}`
                : `All Icons (${filteredIcons.length})`}
            </Text>
            <View style={styles.iconGrid}>
              {filteredIcons.map((iconName) => (
                <View key={iconName} style={styles.gridItem}>
                  <UnIcon name={iconName} size={32} />
                  <Text style={styles.gridLabel}>{iconName}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Unifesto Private Limited</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  categoryScroll: {
    paddingVertical: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: "#3491ff",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  categoryButtonTextActive: {
    color: "#ffffff",
  },
  iconRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  iconItem: {
    alignItems: "center",
    width: 80,
  },
  iconLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },
  sizeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sizeItem: {
    alignItems: "center",
  },
  sizeLabel: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 4,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    alignItems: "center",
    width: "22%",
    padding: 8,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  gridLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
    textAlign: "center",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#9ca3af",
  },
});
