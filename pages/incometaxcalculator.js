
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, HelpCircle } from "lucide-react";
import ExportActions from "../components/calculators/ExportActions";

const taxBrackets = [
  { min: 0, max: 12570, rate: 0, name: "Personal Allowance" },
  { min: 12571, max: 50270, rate: 0.20, name: "Basic Rate" },
  { min: 50271, max: 125140, rate: 0.40, name: "Higher Rate" },
  { min: 125141, max: Infinity, rate: 0.45, name: "Additional Rate" }
];

export default function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState('');
  const [results, setResults] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [csvData, setCsvData] = useState(null);

  const handleCalculate = () => {
    const income = Number(grossIncome) || 0;
    if (income <= 0) {
        setResults(null);
        setHasCalculated(true);
        return;
    }
    
    let totalTax = 0;
    let taxBreakdown = [];
    let personalAllowance = 12570;

    // Personal allowance reduction for high earners
    if (income > 100000) {
      personalAllowance = Math.max(0, personalAllowance - (income - 100000) / 2);
    }
    
    let taxableIncome = Math.max(0, income - personalAllowance);

    for (const bracket of taxBrackets) {
      if (bracket.rate === 0) continue; // Skip personal allowance band for breakdown
      
      // Calculate the effective start of the bracket considering personal allowance
      const bracketStart = Math.max(bracket.min, income - taxableIncome); // This ensures we're calculating based on actual taxable income in this bracket

      // If the income extends into this bracket
      if (income > bracketStart) {
          // Calculate the amount of income that falls within this bracket
          const taxableInBracket = Math.min(income, bracket.max) - bracketStart;
          if (taxableInBracket > 0) {
              const taxInBracket = taxableInBracket * bracket.rate;
              totalTax += taxInBracket;
              taxBreakdown.push({
                  name: bracket.name,
                  amount: taxInBracket,
                  rate: bracket.rate * 100,
                  taxableAmount: taxableInBracket
              });
          }
      }
    }
    
    const newResults = {
        totalTax,
        taxBreakdown,
        grossIncome: income,
        personalAllowance
    };
    setResults(newResults);
    setHasCalculated(true);

     const csvExportData = [
      ["Band", "Taxable Amount", "Tax Rate", "Tax Paid"],
      ...newResults.taxBreakdown.map(item => [item.name, item.taxableAmount.toFixed(2), `${item.rate}%`, item.amount.toFixed(2)]),
       ["", "", "", ""],
       ["Gross Income", newResults.grossIncome.toFixed(2), "", ""],
       ["Personal Allowance", newResults.personalAllowance.toFixed(2), "", ""],
       ["Total Tax", newResults.totalTax.toFixed(2), "", ""],
    ];
    setCsvData(csvExportData);
  };

  useEffect(() => {
    setHasCalculated(false);
    setResults(null);
  }, [grossIncome]);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 non-printable">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              UK Income Tax Calculator 2025/26
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Demystify your tax bill. See exactly how your income is taxed across the different UK tax bands for the 2025/26 financial year.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="print-title hidden">Income Tax Breakdown 2025/26</div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="non-printable">
            <Card>
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="grossIncome">Annual Gross Income</Label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="grossIncome"
                      type="number"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(e.target.value)}
                      className="pl-10"
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>
                <Button onClick={handleCalculate} className="w-full text-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6 printable-area">
             {hasCalculated && results ? (
              <>
                <div className="flex justify-between items-center non-printable">
                  <h2 className="text-2xl font-bold text-gray-800">Your Tax Breakdown</h2>
                   <ExportActions csvData={csvData} fileName="income-tax-breakdown" title="Income Tax Breakdown" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                            <span>Gross Income:</span>
                            <span className="font-semibold">£{results.grossIncome.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg">
                            <span>Personal Allowance:</span>
                            <span className="font-semibold">£{results.personalAllowance.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg text-xl">
                            <span className="font-bold">Total Estimated Tax:</span>
                            <span className="font-bold text-red-700">-£{results.totalTax.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Breakdown by Tax Band</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {results.taxBreakdown.map((bracket, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                        <div>
                          <span className="font-medium">{bracket.name} ({bracket.rate}%)</span>
                          <p className="text-sm text-gray-600">
                            Taxable amount: £{bracket.taxableAmount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        <span className="font-semibold text-blue-800">
                          -£{bracket.amount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Ready for your results?</h3>
                  <p>Enter your income and click "Calculate Tax".</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
