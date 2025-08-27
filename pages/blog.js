import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: "Understanding the 2025/26 UK Tax Changes",
    excerpt: "A comprehensive guide to what's changed in the latest tax year and how it affects your take-home pay.",
    date: "March 15, 2024",
    author: "Tax Team",
    category: "Tax Updates",
    readTime: "5 min read"
  },
  {
    title: "The 50/30/20 Rule: Is It Right for UK Households?",
    excerpt: "We break down this popular budgeting method and adapt it for UK living costs and financial priorities.",
    date: "March 10, 2024",
    author: "Budget Expert",
    category: "Budgeting",
    readTime: "7 min read"
  },
  {
    title: "Emergency Fund vs. Investing: Getting the Balance Right",
    excerpt: "How much should you keep in cash versus investing? We explore the optimal strategy for UK savers.",
    date: "March 5, 2024",
    author: "Investment Team",
    category: "Savings",
    readTime: "6 min read"
  },
  {
    title: "Student Loan Repayments: When Will You Be Free?",
    excerpt: "Understanding the different repayment plans and strategies to minimize what you pay over time.",
    date: "February 28, 2024",
    author: "Education Finance",
    category: "Student Loans",
    readTime: "8 min read"
  },
  {
    title: "Mortgage Rates in 2024: Fixed vs Variable",
    excerpt: "With interest rates fluctuating, we analyze the pros and cons of each mortgage type.",
    date: "February 20, 2024",
    author: "Mortgage Expert",
    category: "Property",
    readTime: "10 min read"
  },
  {
    title: "The Hidden Costs of Car Ownership in the UK",
    excerpt: "Beyond the purchase price - insurance, fuel, maintenance, and depreciation costs analyzed.",
    date: "February 15, 2024",
    author: "Cost Analysis Team",
    category: "Cost of Living",
    readTime: "6 min read"
  }
];

export default function Blog() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Financial Insights & Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest UK financial news, tax updates, and money management strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            More articles coming soon. Subscribe to our newsletter to stay updated.
          </p>
        </div>
      </div>
    </div>
  );
}