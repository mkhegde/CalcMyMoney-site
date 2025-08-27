
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { jobTitles, ukCities, createSlug } from '../components/data/seo-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, MapPin, Users, FileText } from 'lucide-react';

export default function Sitemap() {
  // Core calculator pages
  const calculatorPages = [
    "SalaryCalculator", "IncomeTaxCalculator", "NationalInsuranceCalculator", 
    "BudgetCalculator", "DebtCalculator", "MortgageCalculator",
    "CompoundInterestCalculator", "PensionCalculator", "StudentLoanCalculator"
  ];

  // Static pages
  const staticPages = [
    { name: "Home", url: "Home" },
    { name: "Job Salaries", url: "JobSalaries" },
    { name: "Cost of Living", url: "CostOfLiving" },
    { name: "Blog", url: "Blog" },
    { name: "Resources", url: "Resources" },
    { name: "Contact", url: "Contact" },
    { name: "Privacy Policy", url: "PrivacyPolicy" },
    { name: "Cookie Policy", url: "CookiePolicy" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Sitemap
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            All pages on CalcMyMoney.co.uk - Your complete UK financial calculator resource
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          
          {/* Core Calculators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Financial Calculators ({calculatorPages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {calculatorPages.map((page) => (
                  <Link 
                    key={page}
                    to={createPageUrl(page)} 
                    className="text-blue-600 dark:text-blue-400 hover:underline block py-1"
                  >
                    {page.replace(/([A-Z])/g, ' $1').trim()}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Static Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Main Pages ({staticPages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {staticPages.map((page) => (
                  <Link 
                    key={page.url}
                    to={createPageUrl(page.url)} 
                    className="text-blue-600 dark:text-blue-400 hover:underline block py-1"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Salary Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Job Salary Insights ({jobTitles.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="grid gap-1">
                {jobTitles.map((job) => (
                  <Link 
                    key={job.title}
                    to={createPageUrl(`JobSalaries?job=${createSlug(job.title)}`)} 
                    className="text-blue-600 dark:text-blue-400 hover:underline block py-1 text-sm"
                  >
                    {job.title} Salary UK
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* City Cost of Living Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Cost of Living ({ukCities.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="grid gap-1">
                {ukCities.map((city) => (
                  <Link 
                    key={city.name}
                    to={createPageUrl(`CostOfLiving?city=${createSlug(city.name)}`)} 
                    className="text-blue-600 dark:text-blue-400 hover:underline block py-1 text-sm"
                  >
                    Cost of Living in {city.name}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Summary */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
              Total Content Pages: {calculatorPages.length + staticPages.length + jobTitles.length + ukCities.length}
            </h2>
            <p className="text-blue-800 dark:text-blue-200">
              Comprehensive UK financial guidance across calculators, salary insights, and career information
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
