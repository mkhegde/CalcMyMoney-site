
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Calculator, PoundSterling, Home, CreditCard, PiggyBank, Building, HandCoins, User, Percent, Briefcase, TrendingUp, Shield, Menu, X, BookOpen, Sparkles, Moon, Sun, MapPin
} from "lucide-react";
import {
  Button
} from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import ScrollToTop from "../components/general/ScrollToTop";
import CookieConsentBanner from "../components/general/CookieConsentBanner";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const calculatorCategories = [
    {
        name: "Salary & Tax",
        slug: slugify("Salary & Tax Calculators"),
        icon: HandCoins,
        description: "Calculate take-home pay, tax, NI, and more.",
        calculators: [
            { name: "Salary Calculator", url: createPageUrl("SalaryCalculator"), icon: PoundSterling, status: 'active' },
            { name: "Income Tax Calculator", url: createPageUrl("IncomeTaxCalculator"), icon: User, status: 'active' },
            { name: "National Insurance Calculator", url: createPageUrl("NationalInsuranceCalculator"), icon: Shield, status: 'active' },
            { name: "Contractor (IR35) Calculator", url: "#", icon: Briefcase, status: 'coming-soon' },
            { name: "Overtime & Bonus Calculator", url: createPageUrl("OvertimeBonusCalculator"), icon: TrendingUp, status: 'active' },
            { name: "Salary Sacrifice Calculator", url: createPageUrl("SalarySacrificeCalculator"), icon: PiggyBank, status: 'active' },
            { name: "Hourly to Annual Salary", url: createPageUrl("HourlyToAnnualSalaryCalculator"), icon: Calculator, status: 'active' },
        ]
    },
    {
        name: "Employment & Benefits",
        slug: slugify("Employment & Benefits"),
        icon: Briefcase,
        description: "Statutory pay, redundancy, student loans.",
        calculators: [
            { name: "Maternity Pay Calculator", url: createPageUrl("MaternityPayCalculator"), icon: User, status: 'active' },
            { name: "Statutory Sick Pay Calculator", url: createPageUrl("StatutorySickPayCalculator"), icon: Shield, status: 'active' },
            { name: "Holiday Pay Calculator", url: createPageUrl("HolidayPayCalculator"), icon: Calculator, status: 'active' },
            { name: "Redundancy Pay Calculator", url: createPageUrl("RedundancyPayCalculator"), icon: Briefcase, status: 'active' },
            { name: "Student Loan Calculator", url: createPageUrl("StudentLoanCalculator"), icon: User, status: 'active' },
            { name: "Minimum Wage Calculator", url: createPageUrl("MinimumWageCalculator"), icon: PoundSterling, status: 'active' },
        ]
    },
    {
        name: "Personal Finance & Budgeting",
        slug: slugify("Personal Finance & Budgeting"),
        icon: PiggyBank,
        description: "Budgeting, loans, savings, and debt management.",
        calculators: [
            { name: "Budget Planner", url: createPageUrl("BudgetCalculator"), icon: PiggyBank, status: 'active' },
            { name: "Debt Repayment Calculator", url: createPageUrl("DebtCalculator"), icon: CreditCard, status: 'active' },
            { name: "Mortgage Calculator", url: createPageUrl("MortgageCalculator"), icon: Building, status: 'active' },
            { name: "Savings Goal Calculator", url: createPageUrl("SavingsGoalCalculator"), icon: TrendingUp, status: 'active' },
            { name: "Emergency Fund Calculator", url: createPageUrl("EmergencyFundCalculator"), icon: Shield, status: 'active' },
        ]
    },
    {
        name: "Wealth & Investment",
        slug: slugify("Wealth & Investment Calculators"),
        icon: TrendingUp,
        description: "Grow your wealth with powerful investment tools.",
        calculators: [
            { name: "Compound Interest Calculator", url: createPageUrl("CompoundInterestCalculator"), icon: Percent, status: 'active' },
            { name: "Pension Calculator", url: createPageUrl("PensionCalculator"), icon: Shield, status: 'active' },
            { name: "FIRE Calculator", url: "#", icon: TrendingUp, status: 'coming-soon' },
            { name: "Net Worth Calculator", url: "#", icon: Calculator, status: 'coming-soon' },
        ]
    },
    {
        name: "Cost of Living",
        slug: slugify("Cost of Living Calculators"),
        icon: Home,
        description: "Inflation, energy bills, and household costs.",
        calculators: [
            { name: "Inflation Calculator", url: createPageUrl("InflationCalculator"), icon: TrendingUp, status: 'active' },
            { name: "Cost of Living Explorer", url: createPageUrl("CostOfLiving"), icon: MapPin, status: 'active' },
            { name: "Energy Bill Calculator", url: "#", icon: Home, status: 'coming-soon' },
        ]
    },
    {
        name: "Fun & Inspiration",
        slug: slugify("Fun & Inspiration"),
        icon: Sparkles,
        description: "Dream big and get inspired to achieve your financial goals.",
        calculators: [
          { name: "Dream Lifestyle Calculator", url: createPageUrl("DreamLifestyleCalculator"), icon: Sparkles, status: 'active' },
        ]
    }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === createPageUrl("Home");
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    // Apply theme immediately on load
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Add Google Analytics script
    const gaMeasurementId = "YOUR_GA_MEASUREMENT_ID"; // <-- IMPORTANT: REPLACE THIS with your actual GA4 Measurement ID (e.g., G-XXXXXXXXXX)

    if (gaMeasurementId.startsWith("G-ESNP2YRGWB")) {
        const script1 = document.createElement('script');
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
        script1.async = true;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `;
        document.head.appendChild(script2);
        
        return () => {
            // Clean up scripts on component unmount (or re-render if dependencies change, though here it's empty array)
            if (document.head.contains(script1)) {
              document.head.removeChild(script1);
            }
            if (document.head.contains(script2)) {
              document.head.removeChild(script2);
            }
        }
    }
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount.

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ScrollToTop />
      <style jsx global>{`
        :root {
          color-scheme: ${theme};
        }
        html {
          scroll-behavior: smooth;
        }
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        @media print {
          html {
            scroll-behavior: auto;
          }
          .non-printable {
            display: none !important;
          }
          .printable-area {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            flex: 1 !important;
          }
           .printable-grid-cols-1 {
            grid-template-columns: 1fr !important;
          }
          .printable-content {
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-title {
            display: block !important;
             text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 2rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 non-printable">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to={createPageUrl("Home")} className="flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-blue-900 dark:text-blue-500" />
                <span className="font-bold text-xl text-gray-800 dark:text-gray-100">CalcMyMoney.co.uk</span>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link to={createPageUrl("Home")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Calculators</Link>
              <Link to={createPageUrl("Resources")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Resources</Link>
              <Link to={createPageUrl("Blog")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Blog</Link>
              <Link to={createPageUrl("Contact")} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Contact</Link>
              <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
            <div className="md:hidden flex items-center">
               <Button onClick={toggleTheme} variant="ghost" size="icon" className="mr-2 text-gray-600 dark:text-gray-300">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                  <SheetHeader>
                    <Link to={createPageUrl("Home")} className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                      <Calculator className="h-8 w-8 text-blue-900 dark:text-blue-500" />
                      <span className="font-bold text-xl text-gray-800 dark:text-gray-100">CalcMyMoney.co.uk</span>
                    </Link>
                  </SheetHeader>
                  <div className="mt-6">
                    <ul className="space-y-4">
                      {calculatorCategories.map(category => (
                        <li key={category.name}>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{category.name}</h3>
                          <ul className="space-y-2 pl-4">
                             {category.calculators.map(calc => (
                                <li key={calc.name}>
                                   <SheetClose asChild>
                                      <Link to={calc.url} className={`text-sm ${calc.status === 'coming-soon' ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                                         {calc.name} {calc.status === 'coming-soon' && <span className="text-xs text-gray-400 dark:text-gray-500">(soon)</span>}
                                      </Link>
                                   </SheetClose>
                                </li>
                             ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 printable-content bg-gray-50 dark:bg-gray-900">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 non-printable">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to={createPageUrl("Home")} className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-blue-900 dark:text-blue-500" />
                <span className="font-bold text-xl text-gray-800 dark:text-gray-100">CalcMyMoney</span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Free UK financial calculators for salary, tax, mortgages, pensions, budgets and investments.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Calculators</h4>
              <ul className="space-y-2">
                {calculatorCategories.map((category) => (
                  <li key={category.name}>
                    {isHomePage ? (
                      <a href={`#${category.slug}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline font-medium">
                        {category.name}
                      </a>
                    ) : (
                      <Link to={`${createPageUrl("Home")}#${category.slug}`} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline font-medium">
                        {category.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Information</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><Link to={createPageUrl("Blog")} className="hover:text-blue-600 dark:hover:text-blue-400">Blog</Link></li>
                <li><Link to={createPageUrl("Resources")} className="hover:text-blue-600 dark:hover:text-blue-400">Resources</Link></li>
                <li><Link to={createPageUrl("UKGovernmentBudget")} className="hover:text-blue-600 dark:hover:text-blue-400">UK Budget Analysis</Link></li>
                <li><Link to={createPageUrl("JobSalaries")} className="hover:text-blue-600 dark:hover:text-blue-400">Job Salaries</Link></li>
                <li><Link to={createPageUrl("CostOfLiving")} className="hover:text-blue-600 dark:hover:text-blue-400">Cost of Living</Link></li>
                <li><Link to={createPageUrl("Contact")} className="hover:text-blue-600 dark:hover:text-blue-400">Contact Us</Link></li>
                <li><Link to={createPageUrl("PrivacyPolicy")} className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
                <li><Link to={createPageUrl("CookiePolicy")} className="hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</Link></li>
                <li><Link to={createPageUrl("TermsOfService")} className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
                <li><Link to={createPageUrl("Disclaimer")} className="hover:text-blue-600 dark:hover:text-blue-400">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>&copy; 2025 CalcMyMoney.co.uk - UK Financial Calculator Tools</p>
          </div>
        </div>
      </footer>

      <CookieConsentBanner />
    </div>
  );
}
