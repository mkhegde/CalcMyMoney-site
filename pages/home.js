
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { HandCoins, Briefcase, PiggyBank, TrendingUp, Home as HomeIcon, Sparkles, MapPin } from 'lucide-react';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const calculatorCategories = [
    {
        name: "Salary & Tax",
        slug: slugify("Salary & Tax Calculators"),
        icon: HandCoins,
        description: "Calculate take-home pay, tax, NI, and more.",
        calculators: [
            { name: "Salary Calculator", url: createPageUrl("SalaryCalculator"), status: 'active' },
            { name: "Income Tax Calculator", url: createPageUrl("IncomeTaxCalculator"), status: 'active' },
        ]
    },
    {
        name: "Employment & Benefits",
        slug: slugify("Employment & Benefits"),
        icon: Briefcase,
        description: "Statutory pay, redundancy, student loans.",
        calculators: [
            { name: "Maternity Pay Calculator", url: createPageUrl("MaternityPayCalculator"), status: 'active' },
            { name: "Holiday Pay Calculator", url: createPageUrl("HolidayPayCalculator"), status: 'active' },
        ]
    },
    {
        name: "Personal Finance & Budgeting",
        slug: slugify("Personal Finance & Budgeting"),
        icon: PiggyBank,
        description: "Budgeting, loans, savings, and debt management.",
        calculators: [
            { name: "Budget Planner", url: createPageUrl("BudgetCalculator"), status: 'active' }, // Updated name from "Budget Calculator" to "Budget Planner"
            { name: "Debt Repayment Calculator", url: createPageUrl("DebtCalculator"), status: 'active' },
            { name: "Mortgage Calculator", url: createPageUrl("MortgageCalculator"), status: 'active' },
        ]
    },
    {
        name: "Wealth & Investment",
        slug: slugify("Wealth & Investment Calculators"),
        icon: TrendingUp,
        description: "Grow your wealth with powerful investment tools.",
        calculators: [
            { name: "Compound Interest Calculator", url: createPageUrl("CompoundInterestCalculator"), status: 'active' },
            { name: "Pension Calculator", url: createPageUrl("PensionCalculator"), status: 'active' },
        ]
    },
    {
        name: "Cost of Living",
        slug: slugify("Cost of Living Calculators"),
        icon: HomeIcon, // Changed from Home to HomeIcon
        description: "Inflation, energy bills, and household costs.",
        calculators: [
            { name: "Inflation Calculator", url: createPageUrl("InflationCalculator"), status: 'active' },
            { name: "Cost of Living Explorer", url: createPageUrl("CostOfLiving"), status: 'active' },
        ]
    },
    {
        name: "Fun & Inspiration",
        slug: slugify("Fun & Inspiration"),
        icon: Sparkles,
        description: "Dream big and get inspired to achieve your financial goals.",
        calculators: [
          { name: "Dream Lifestyle Calculator", url: createPageUrl("DreamLifestyleCalculator"), status: 'active' },
        ]
    }
];

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section - SEO Optimized */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-relaxed mb-6">
              Free UK Financial Calculators 2025/26
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-green-600 block text-3xl md:text-4xl lg:text-5xl leading-relaxed pb-2">
                Salary | Tax | Mortgage | Pension
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Professional financial calculators for UK residents. Calculate salary, income tax, National Insurance, mortgages, pensions, budgets and investment returns. Updated for the 2025/26 tax year with accurate UK rates.
            </p>
            <div className="flex justify-center">
              <a href="#calculator-grid" className="px-8 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors">
                View All Calculators
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calculator Grid */}
      <div id="calculator-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorCategories.map((category) => (
            <div key={category.name} id={category.slug} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <category.icon className="w-8 h-8 text-blue-900 dark:text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{category.name}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 h-12">{category.description}</p>
              <ul className="space-y-2">
                {category.calculators.map((calc) => (
                  <li key={calc.name}>
                    <Link 
                      to={calc.url} 
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/80 hover:scale-105 transition-all duration-200"
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200">{calc.name}</span>
                      {calc.status === 'coming-soon' ? (
                         <span className="text-xs text-gray-400 dark:text-gray-500">(coming soon)</span>
                      ) : (
                         <span className="text-blue-600 dark:text-blue-400">&rarr;</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
