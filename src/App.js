import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your Layout and all your pages here
import Layout from './layout'; // Path is now relative to src, looking directly inside src
import Home from '../pages/Home';
import SalaryCalculator from '../pages/SalaryCalculator';
import BudgetCalculator from '../pages/BudgetCalculator';
import DebtCalculator from '../pages/DebtCalculator';
import MortgageCalculator from '../pages/MortgageCalculator';
import IncomeTaxCalculator from '../pages/IncomeTaxCalculator';
import NationalInsuranceCalculator from '../pages/NationalInsuranceCalculator';
import CompoundInterestCalculator from '../pages/CompoundInterestCalculator';
import StudentLoanCalculator from '../pages/StudentLoanCalculator';
import SavingsGoalCalculator from '../pages/SavingsGoalCalculator';
import PensionCalculator from '../pages/PensionCalculator';
import MaternityPayCalculator from '../pages/MaternityPayCalculator';
import StatutorySickPayCalculator from '../pages/StatutorySickPayCalculator';
import EmergencyFundCalculator from '../pages/EmergencyFundCalculator';
import SalarySacrificeCalculator from '../pages/SalarySacrificeCalculator';
import HolidayPayCalculator from '../pages/HolidayPayCalculator';
import InflationCalculator from '../pages/InflationCalculator';
import DreamLifestyleCalculator from '../pages/DreamLifestyleCalculator';
import RedundancyPayCalculator from '../pages/RedundancyPayCalculator';
import MinimumWageCalculator from '../pages/MinimumWageCalculator';
import OvertimeBonusCalculator from '../pages/OvertimeBonusCalculator';
import HourlyToAnnualSalaryCalculator from '../pages/HourlyToAnnualSalaryCalculator';
import UKGovernmentBudget from '../pages/UKGovernmentBudget';
import JobSalaries from '../pages/JobSalaries';
import CostOfLiving from '../pages/CostOfLiving';
import Blog from '../pages/Blog';
import Resources from '../pages/Resources';
import Contact from '../pages/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CookiePolicy from '../pages/CookiePolicy';
import TermsOfService from '../pages/TermsOfService';
import Disclaimer from '../pages/Disclaimer';
import Sitemap from '../pages/Sitemap'; // Assuming you have a Sitemap page


// Utility to create page URLs - ensure this path is correct
import { createPageUrl } from './utils'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path={createPageUrl("Home")} element={<Layout><Home /></Layout>} />
        <Route path={createPageUrl("SalaryCalculator")} element={<Layout><SalaryCalculator /></Layout>} />
        <Route path={createPageUrl("BudgetCalculator")} element={<Layout><BudgetCalculator /></Layout>} />
        <Route path={createPageUrl("DebtCalculator")} element={<Layout><DebtCalculator /></Layout>} />
        <Route path={createPageUrl("MortgageCalculator")} element={<Layout><MortgageCalculator /></Layout>} />
        <Route path={createPageUrl("IncomeTaxCalculator")} element={<Layout><IncomeTaxCalculator /></Layout>} />
        <Route path={createPageUrl("NationalInsuranceCalculator")} element={<Layout><NationalInsuranceCalculator /></Layout>} />
        <Route path={createPageUrl("CompoundInterestCalculator")} element={<Layout><CompoundInterestCalculator /></Layout>} />
        <Route path={createPageUrl("StudentLoanCalculator")} element={<Layout><StudentLoanCalculator /></Layout>} />
        <Route path={createPageUrl("SavingsGoalCalculator")} element={<Layout><SavingsGoalCalculator /></Layout>} />
        <Route path={createPageUrl("PensionCalculator")} element={<Layout><PensionCalculator /></Layout>} />
        <Route path={createPageUrl("MaternityPayCalculator")} element={<Layout><MaternityPayCalculator /></Layout>} />
        <Route path={createPageUrl("StatutorySickPayCalculator")} element={<Layout><StatutorySickPayCalculator /></Layout>} />
        <Route path={createPageUrl("EmergencyFundCalculator")} element={<Layout><EmergencyFundCalculator /></Layout>} />
        <Route path={createPageUrl("SalarySacrificeCalculator")} element={<Layout><SalarySacrificeCalculator /></Layout>} />
        <Route path={createPageUrl("HolidayPayCalculator")} element={<Layout><HolidayPayCalculator /></Layout>} />
        <Route path={createPageUrl("InflationCalculator")} element={<Layout><InflationCalculator /></Layout>} />
        <Route path={createPageUrl("DreamLifestyleCalculator")} element={<Layout><DreamLifestyleCalculator /></Layout>} />
        <Route path={createPageUrl("RedundancyPayCalculator")} element={<Layout><RedundancyPayCalculator /></Layout>} />
        <Route path={createPageUrl("MinimumWageCalculator")} element={<Layout><MinimumWageCalculator /></Layout>} />
        <Route path={createPageUrl("OvertimeBonusCalculator")} element={<Layout><OvertimeBonusCalculator /></Layout>} />
        <Route path={createPageUrl("HourlyToAnnualSalaryCalculator")} element={<Layout><HourlyToAnnualSalaryCalculator /></Layout>} />
        <Route path={createPageUrl("UKGovernmentBudget")} element={<Layout><UKGovernmentBudget /></Layout>} />
        <Route path={createPageUrl("JobSalaries")} element={<Layout><JobSalaries /></Layout>} />
        <Route path={createPageUrl("CostOfLiving")} element={<Layout><CostOfLiving /></Layout>} />
        <Route path={createPageUrl("Blog")} element={<Layout><Blog /></Layout>} />
        <Route path={createPageUrl("Resources")} element={<Layout><Resources /></Layout>} />
        <Route path={createPageUrl("Contact")} element={<Layout><Contact /></Layout>} />
        <Route path={createPageUrl("PrivacyPolicy")} element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path={createPageUrl("CookiePolicy")} element={<Layout><CookiePolicy /></Layout>} />
        <Route path={createPageUrl("TermsOfService")} element={<Layout><TermsOfService /></Layout>} />
        <Route path={createPageUrl("Disclaimer")} element={<Layout><Disclaimer /></Layout>} />
        <Route path={createPageUrl("Sitemap")} element={<Layout><Sitemap /></Layout>} />
        {/* Add more routes for any other pages you have */}
      </Routes>
    </Router>
  );
}