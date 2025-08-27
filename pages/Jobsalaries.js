
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import { jobTitles, createSlug } from '../components/data/seo-data';
import { PoundSterling, Calculator, TrendingUp, Users, MapPin, BookOpen, Search } from 'lucide-react';

export default function JobSalaries() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Check URL parameters for specific job
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobParam = urlParams.get('job');
    if (jobParam) {
      const job = jobTitles.find(j => createSlug(j.title) === jobParam);
      if (job) {
        setSelectedJob(job);
      }
    }
  }, []);

  // Filter jobs based on search
  const filteredJobs = jobTitles.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group jobs by category
  const jobsByCategory = filteredJobs.reduce((acc, job) => {
    if (!acc[job.category]) {
      acc[job.category] = [];
    }
    acc[job.category].push(job);
    return acc;
  }, {});

  // Calculate salary breakdown
  const calculateSalaryBreakdown = (grossAnnual) => {
    const personalAllowance = 12570;
    const taxableIncome = Math.max(0, grossAnnual - personalAllowance);
    
    // Basic tax calculation
    let incomeTax = 0;
    if (taxableIncome > 37700) {
      incomeTax = (37700 * 0.20) + ((taxableIncome - 37700) * 0.40);
    } else {
      incomeTax = taxableIncome * 0.20;
    }
    
    // National Insurance calculation
    let nationalInsurance = 0;
    if (grossAnnual > 50270) {
      nationalInsurance = ((50270 - 12570) * 0.08) + ((grossAnnual - 50270) * 0.02);
    } else if (grossAnnual > 12570) {
      nationalInsurance = (grossAnnual - 12570) * 0.08;
    }
    
    const takeHome = grossAnnual - incomeTax - nationalInsurance;
    return { incomeTax, nationalInsurance, takeHome };
  };

  // If specific job selected, show job details
  if (selectedJob) {
    const breakdown = calculateSalaryBreakdown(selectedJob.averageSalary);
    const monthlyTakeHome = breakdown.takeHome / 12;

    // Related jobs from same category
    const relatedJobs = jobTitles
      .filter(j => j.category === selectedJob.category && j.title !== selectedJob.title)
      .slice(0, 3);

    return (
      <div className="bg-white dark:bg-gray-900">
        {/* SEO-optimized header */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {selectedJob.title} Salary in the UK (2025/26)
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {selectedJob.description} Discover average {selectedJob.title.toLowerCase()} salaries, take-home pay, and career insights for the UK market.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSelectedJob(null)}
              >
                ← Back to All Jobs
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Salary Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PoundSterling className="w-5 h-5" />
                    {selectedJob.title} Salary Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <PoundSterling className="w-8 h-8 mx-auto text-green-600 dark:text-green-400 mb-2" />
                      <p className="text-sm text-green-800 dark:text-green-300 font-medium">Average Annual Salary</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                        £{selectedJob.averageSalary.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Calculator className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Monthly Take-Home</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        £{Math.round(monthlyTakeHome).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <TrendingUp className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
                      <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">Career Category</p>
                      <p className="text-xl font-bold text-purple-900 dark:text-purple-100">
                        {selectedJob.category}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Take-Home Pay Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                      <span>Gross Annual Salary</span>
                      <span className="font-semibold">£{selectedJob.averageSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-l-4 border-red-400 bg-red-50 dark:bg-red-900/20 rounded-r">
                      <span>Income Tax</span>
                      <span className="font-semibold text-red-700 dark:text-red-300">-£{Math.round(breakdown.incomeTax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-r">
                      <span>National Insurance</span>
                      <span className="font-semibold text-purple-700 dark:text-purple-300">-£{Math.round(breakdown.nationalInsurance).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-800/50 rounded border-2 border-green-300 dark:border-green-700">
                      <span className="font-bold">Annual Take-Home</span>
                      <span className="font-bold text-green-700 dark:text-green-300 text-lg">£{Math.round(breakdown.takeHome).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calculate Your Exact Salary */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <Calculator className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                    Calculate Your Exact Take-Home Pay
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-4">
                    Get personalized results based on your specific circumstances, tax code, and deductions.
                  </p>
                  <Link to={createPageUrl("SalaryCalculator")}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Use Salary Calculator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to={createPageUrl("SalaryCalculator")} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Calculator className="w-4 h-4 mr-2" />
                      Salary Calculator
                    </Button>
                  </Link>
                  <Link to={createPageUrl("BudgetCalculator")} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <PoundSterling className="w-4 h-4 mr-2" />
                      Budget Planner
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Related {selectedJob.category} Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedJobs.map((relatedJob) => (
                      <button 
                        key={relatedJob.title}
                        onClick={() => {
                          setSelectedJob(relatedJob);
                          window.history.pushState({}, '', `?job=${createSlug(relatedJob.title)}`);
                        }}
                        className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900 dark:text-gray-100">{relatedJob.title}</span>
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            £{relatedJob.averageSalary.toLocaleString()}
                          </span>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view - job directory
  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            UK Job Salaries 2025/26
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore average salaries, take-home pay, and career insights for hundreds of jobs across the UK. 
            All data updated for the 2025/26 tax year.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search job titles or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Job Categories */}
        <div className="space-y-8">
          {Object.entries(jobsByCategory).map(([category, jobs]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {category} ({jobs.length} roles)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.map((job) => (
                    <button
                      key={job.title}
                      onClick={() => {
                        setSelectedJob(job);
                        window.history.pushState({}, '', `?job=${createSlug(job.title)}`);
                      }}
                      className="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{job.title}</h3>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          £{job.averageSalary.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {job.description}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
