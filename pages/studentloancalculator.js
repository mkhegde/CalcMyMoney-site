import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PoundSterling, Calculator, User, Calendar, TrendingDown } from "lucide-react";
import ExportActions from "../components/calculators/ExportActions";

const loanPlans = {
  plan1: { threshold: 24990, rate: 0.09 },
  plan2: { threshold: 27295, rate: 0.09 },
  plan4: { threshold: 31395, rate: 0.09 },
  plan5: { threshold: 25000, rate: 0.09 },
  postgraduate: { threshold: 21000, rate: 0.06 }
};

export default function StudentLoanCalculator() {
  const [loanPlan, setLoanPlan] = useState("plan1");
  const [annualSalary, setAnnualSalary] = useState('');
  const [loanBalance, setLoanBalance] = useState('');
  const [results, setResults] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [csvData, setCsvData] = useState(null);

  const handleCalculate = () => {
    const salary = Number(annualSalary) || 0;
    let balance = Number(loanBalance) || 0;
    const plan = loanPlans[loanPlan];

    if (salary <= plan.threshold || balance <= 0) {
      setResults({
        monthlyRepayment: 0,
        payoffTime: "N/A",
        totalInterest: 0,
        totalPaid: balance
      });
      setHasCalculated(true);
      setCsvData(null);
      return;
    }

    const annualRepayment = (salary - plan.threshold) * plan.rate;
    const monthlyRepayment = annualRepayment / 12;

    let totalInterestPaid = 0;
    let months = 0;
    let remainingBalance = balance;

    while (remainingBalance > 0 && months < 360) { // 30-year write-off
      months++;
      // Note: A real SLC includes interest. This is a simplified repayment calculator.
      // For a more accurate model, interest rates (which vary) would be needed.
      // This model shows time-to-payoff based on current salary.
      remainingBalance -= monthlyRepayment;
    }

    const payoffYears = Math.floor(months / 12);
    const payoffMonths = months % 12;

    const newResults = {
      monthlyRepayment,
      payoffTime: `${payoffYears} years, ${payoffMonths} months`,
      totalInterest: 0, // Simplified model
      totalPaid: balance,
    };
    
    setResults(newResults);
    setHasCalculated(true);

    const csvExportData = [
        ["Metric", "Value"],
        ["Loan Plan", loanPlan],
        ["Annual Salary", `£${salary}`],
        ["Loan Balance", `£${balance}`],
        ["", ""],
        ["Monthly Repayment", `£${newResults.monthlyRepayment.toFixed(2)}`],
        ["Estimated Payoff Time", newResults.payoffTime],
    ];
    setCsvData(csvExportData);
  };
  
  useEffect(() => {
    setHasCalculated(false);
    setResults(null);
  }, [loanPlan, annualSalary, loanBalance]);

  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-200 non-printable">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Loan Repayment Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understand the true cost of your education and plan your path to being loan-free.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="non-printable">
            <Card>
              <CardHeader><CardTitle>Your Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Student Loan Plan</Label>
                  <Select value={loanPlan} onValueChange={setLoanPlan}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plan1">Plan 1</SelectItem>
                      <SelectItem value="plan2">Plan 2</SelectItem>
                      <SelectItem value="plan4">Plan 4 (Scotland)</SelectItem>
                      <SelectItem value="plan5">Plan 5</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualSalary">Your Annual Salary</Label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="annualSalary" type="number" value={annualSalary} onChange={(e) => setAnnualSalary(e.target.value)} className="pl-10" placeholder="e.g. 35000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanBalance">Remaining Loan Balance</Label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="loanBalance" type="number" value={loanBalance} onChange={(e) => setLoanBalance(e.target.value)} className="pl-10" placeholder="e.g. 40000" />
                  </div>
                </div>
                <Button onClick={handleCalculate} className="w-full text-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Repayment
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6 printable-area">
            {hasCalculated && results ? (
              <>
                <div className="flex justify-between items-center non-printable">
                  <h2 className="text-2xl font-bold text-gray-800">Repayment Summary</h2>
                  <ExportActions csvData={csvData} fileName="student-loan-repayment" title="Student Loan Repayment" />
                </div>
                <Card>
                  <CardHeader><CardTitle>Your Repayments</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-lg p-4 bg-blue-50 rounded-lg">
                      <span>Monthly Repayment:</span>
                      <span className="font-bold text-blue-800">£{results.monthlyRepayment.toLocaleString('en-GB', { maximumFractionDigits: 2 })}</span>
                    </div>
                     <div className="flex justify-between items-center text-lg">
                      <span>Estimated Payoff Time:</span>
                      <span className="font-semibold">{results.payoffTime}</span>
                    </div>
                    <div className="text-sm text-gray-600 pt-4 border-t">
                      <p><strong>Note:</strong> This is a simplified calculation based on your current salary and does not account for interest accumulation or salary changes. Many student loans are written off after 30 years.</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">See your loan-free date</h3>
                  <p>Enter your details to calculate your repayment schedule.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}