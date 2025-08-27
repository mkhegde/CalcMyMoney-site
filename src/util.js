// src/utils.js
export const createPageUrl = (pageName) => {
  // Converts a PascalCase pageName like "SalaryCalculator" to a kebab-case URL "/salary-calculator"
  // and then prepends a slash. Handles Home separately to be just "/"
  if (pageName === "Home") {
    return "/";
  }
  return `/${pageName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1)}`;
};