import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, TrendingUp, History } from "lucide-react";
import ExportActions from "../components/calculators/ExportActions";

// Average UK CPIH inflation data. A real app would use a more extensive dataset.
const inflationData = {
  2023: 6.8, 2022: 9.2, 2021: 2.6, 2020: 0.9, 2019: 1.7, 2018: 2.3, 2017: 2.6, 2016: 1.0, 2015: 0.2, 2014: 1.5, 2013: 2.6, 2012: 2.8, 2011: 4.5, 2010: 3.3
};

export default function InflationCalculator() {
  const [amount, setAmount] = useState('');
  const [startYear, setStartYear] = useState('2010');
  const [endYear, setEndYear] = useState('2023');
  const [results, setResults] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [csvData, setCsvData] = useState(null);

  const handleCalculate = () => {
    const initialAmount = Number(amount) || 0;
    const sYear = Number(startYear);
    const eYear = Number(endYear);

    if (initialAmount <= 0 || sYear >= eYear) {
      setResults(null);
      setHasCalculated(true);
      return;
    }

    let futureValue = initialAmount;
    let totalInflation = 1;

    for (let year = sYear; year < eYear; year++) {
      if (inflationData[year]) {
        const rate = inflationData[year] / 100;
        futureValue *= (1 + rate);
        totalInflation *= (1 + rate);
      }
    }
    
    const overallInflationPercent = (totalInflation - 1) * 100;

    const newResults = {
      initialAmount,
      futureValue,
      overallInflationPercent,
      startYear: sYear,
      endYear: eYear
    };

    setResults(newResults);
    setHasCalculated(true);
    
    const csvExportData = [
        ["Metric", "Value"],
        ["Initial Amount", `£${initialAmount.toFixed(2)}`],
        ["Start Year", sYear],
        ["End Year", eYear],
        ["", ""],
        ["Value in End Year", `£${futureValue.toFixed(2)}`],
        ["Total Inflation", `${overallInflationPercent.toFixed(1)}%`],
    ];
    setCsvData(csvExportData);
  };

  useEffect(() => {
    setHasCalculated(false);
    setResults(null);
  }, [amount, startYear, endYear]);

  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-200 non-printable">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              UK Inflation Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A pound today isn't what it used to be. See how inflation has impacted the value of your money over time.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="non-printable">
            <Card>
              <CardHeader><CardTitle>Calculation Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (£)</Label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="pl-10" placeholder="e.g. 1000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="startYear">Start Year</Label>
                     <Input id="startYear" type="number" value={startYear} onChange={e => setStartYear(e.target.value)} />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="endYear">End Year</Label>
                     <Input id="endYear" type="number" value={endYear} onChange={e => setEndYear(e.target.value)} />
                   </div>
                </div>
                <Button onClick={handleCalculate} className="w-full text-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Inflation Impact
                </Button>
                 <p className="text-xs text-gray-500">Note: Uses average historical CPIH data from 2010-2023 for calculations.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            {hasCalculated && results ? (
              <>
                <div className="flex justify-between items-center non-printable">
                  <h2 className="text-2xl font-bold text-gray-800">Inflation Impact</h2>
                  <ExportActions csvData={csvData} fileName="inflation-impact" title="Inflation Impact" />
                </div>
                <Card>
                  <CardHeader><CardTitle>Change in Value</CardTitle></CardHeader>
                  <CardContent className="text-center space-y-4">
                     <p className="text-lg">
                        £{results.initialAmount.toLocaleString()} in {results.startYear} has the same buying power as
                     </p>
                     <p className="text-4xl font-bold text-blue-700">
                        £{results.futureValue.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                     </p>
                     <p className="text-lg">
                        in {results.endYear}.
                     </p>
                     <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm font-medium text-orange-800">Total Inflation</p>
                        <p className="text-2xl font-bold text-orange-900">{results.overallInflationPercent.toFixed(1)}%</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <History className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Discover the value of money over time</h3>
                  <p>Enter your details to see the impact of inflation.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}