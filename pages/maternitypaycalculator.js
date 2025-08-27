import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, User, Calendar } from "lucide-react";

// Statutory Maternity Pay rates for 2025/26
const SMP_RATE_FIRST_6_WEEKS = 0.90; // 90% of average weekly earnings
const SMP_WEEKLY_RATE = 184.03; // or 90% of AWE, whichever is lower

export default function MaternityPayCalculator() {
  const [averageWeeklyEarnings, setAverageWeeklyEarnings] = useState('');
  const [results, setResults] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = () => {
    const awe = Number(averageWeeklyEarnings) || 0;
    if (awe <= 0) {
      setResults(null);
      setHasCalculated(true);
      return;
    }

    const first6WeeksPay = awe * SMP_RATE_FIRST_6_WEEKS;
    const remaining33WeeksPay = Math.min(awe * SMP_RATE_FIRST_6_WEEKS, SMP_WEEKLY_RATE);

    const totalFirst6Weeks = first6WeeksPay * 6;
    const totalRemaining33Weeks = remaining33WeeksPay * 33;
    const totalSMP = totalFirst6Weeks + totalRemaining33Weeks;
    
    setResults({
      first6WeeksPay,
      remaining33WeeksPay,
      totalSMP
    });
    setHasCalculated(true);
  };

  useEffect(() => {
    setHasCalculated(false);
    setResults(null);
  }, [averageWeeklyEarnings]);

  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-200 non-printable">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Statutory Maternity Pay (SMP) Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Planning for a new arrival? Understand your statutory maternity pay entitlement.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="non-printable">
            <Card>
              <CardHeader><CardTitle>Your Earnings</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="awe">Average Weekly Earnings (AWE)</Label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="awe" type="number" value={averageWeeklyEarnings} onChange={e => setAverageWeeklyEarnings(e.target.value)} className="pl-10" placeholder="e.g. 600" />
                  </div>
                  <p className="text-xs text-gray-500">Usually calculated over an 8-week period before the qualifying week.</p>
                </div>
                <Button onClick={handleCalculate} className="w-full text-lg">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate SMP
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            {hasCalculated && results ? (
              <Card>
                <CardHeader><CardTitle>Your SMP Entitlement</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">First 6 Weeks (per week)</p>
                    <p className="text-2xl font-bold text-blue-900">£{results.first6WeeksPay.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">Next 33 Weeks (per week)</p>
                    <p className="text-2xl font-bold text-purple-900">£{results.remaining33WeeksPay.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg border-2 border-green-200">
                    <p className="text-sm font-bold text-green-800">Total Estimated SMP (39 Weeks)</p>
                    <p className="text-3xl font-bold text-green-900">£{results.totalSMP.toLocaleString('en-GB', { maximumFractionDigits: 2 })}</p>
                  </div>
                   <p className="text-xs text-gray-600 pt-4 border-t">This is an estimate of your statutory entitlement. Your employer may offer enhanced (contractual) maternity pay. Always check your contract.</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">See your entitlement</h3>
                  <p>Enter your earnings to estimate your SMP.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}