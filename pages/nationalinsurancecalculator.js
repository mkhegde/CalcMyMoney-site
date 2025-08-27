
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, HelpCircle } from "lucide-react";
import ExportActions from "../components/calculators/ExportActions";

const niThresholds = [
  { min: 0, max: 12570, rate: 0, name: "0% Band" },
  { min: 12571, max: 50270, rate: 0.08, name: "Main Rate" },
  { min: 50271, max: Infinity, rate: 0.02, name: "Upper Rate" }
];

export default function NationalInsuranceCalculator() {
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
    
    let totalNI = 0;
    let niBreakdown = [];

    for (const threshold of niThresholds) {
      if (income > threshold.min) {
        const niableInThreshold = Math.min(income, threshold.max) - threshold.min;
        if(niableInThreshold > 0) {
            const niInThreshold = niableInThreshold * threshold.rate;
            totalNI += niInThreshold;
             if (niInThreshold > 0) {
                niBreakdown.push({
                    name: threshold.name,
                    amount: niInThreshold,
                    rate: threshold.rate * 100,
                    niableAmount: niableInThreshold
                });
            }
        }
      }
    }
    
    const newResults = {
        totalNI,
        niBreakdown,
        grossIncome: income,
    };
    setResults(newResults);
    setHasCalculated(true);
    
     const csvExportData = [
      ["Band", "NI'able Amount", "Rate", "NI Paid"],
      ...newResults.niBreakdown.map(item => [item.name, item.niableAmount.toFixed(2), `${item.rate}%`, item.amount.toFixed(2)]),
       ["", "", "", ""],
       ["Gross Income", newResults.grossIncome.toFixed(2), "", ""],
       ["Total National Insurance", newResults.totalNI.toFixed(2), "", ""],
    ];
    setCsvData(csvExportData);
  };

  useEffect(() => {
    setHasCalculated(false);
    setResults(null);
  }, [grossIncome]);

  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-200 non-printable">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              National Insurance Calculator 2025/26
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              It's not just tax. Understand your compulsory contributions towards state pensions, benefits, and the NHS.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="print-title hidden">National Insurance Breakdown 2025/26</div>
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
                  Calculate NI
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6 printable-area">
             {hasCalculated && results ? (
              <>
                <div className="flex justify-between items-center non-printable">
                  <h2 className="text-2xl font-bold text-gray-800">Your NI Breakdown</h2>
                   <ExportActions csvData={csvData} fileName="ni-breakdown" title="National Insurance Breakdown" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>NI Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-lg">
                            <span>Gross Income:</span>
                            <span className="font-semibold">£{results.grossIncome.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-purple-100 rounded-lg text-xl">
                            <span className="font-bold">Total NI Contribution:</span>
                            <span className="font-bold text-purple-700">-£{results.totalNI.toLocaleString('en-GB', { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader>
                    <CardTitle>Breakdown by NI Band</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {results.niBreakdown.map((bracket, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border-l-4 border-purple-400 bg-purple-50 rounded-r-lg">
                        <div>
                          <span className="font-medium">{bracket.name} ({bracket.rate}%)</span>
                          <p className="text-sm text-gray-600">
                            NI'able amount: £{bracket.niableAmount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        <span className="font-semibold text-purple-800">
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
                  <p>Enter your income and click "Calculate NI".</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
