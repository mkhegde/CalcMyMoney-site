import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPageUrl } from '@/utils';
import { ukCities, createSlug } from '../components/data/seo-data';
import { PoundSterling, Calculator, Building, Users, MapPin, Search } from 'lucide-react';

export default function CostOfLiving() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Check URL for a specific city
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    if (cityParam) {
      const city = ukCities.find(c => createSlug(c.name) === cityParam);
      if (city) {
        setSelectedCity(city);
      }
    }
  }, []);

  const filteredCities = ukCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCity) {
    // A simple metric for comparison
    const affordabilityScore = 100 - selectedCity.rentIndex;

    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Cost of Living in {selectedCity.name}, UK
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Explore the typical costs for housing, transport, and lifestyle in {selectedCity.name}. Is it the right place for your budget?
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSelectedCity(null)}
              >
                ← Back to All Cities
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader><CardTitle>About {selectedCity.name}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{selectedCity.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Key City Stats</CardTitle></CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Users className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Population</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{selectedCity.population}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <MapPin className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400 mb-2" />
                    <p className="text-sm text-purple-800 dark:text-purple-300 font-medium">Region</p>
                    <p className="text-xl font-bold text-purple-900 dark:text-purple-100">{selectedCity.region}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Building className="w-8 h-8 mx-auto text-green-600 dark:text-green-400 mb-2" />
                    <p className="text-sm text-green-800 dark:text-green-300 font-medium">Affordability Score</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">{affordabilityScore}/100</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-2">Can you afford to live in {selectedCity.name}?</h3>
                  <p className="text-orange-800 dark:text-orange-200 mb-4">
                    Use our tools to see if your salary matches the cost of living in {selectedCity.name}.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link to={createPageUrl("SalaryCalculator")}>
                      <Button className="bg-orange-600 hover:bg-orange-700">Check Your Salary</Button>
                    </Link>
                    <Link to={createPageUrl("BudgetCalculator")}>
                      <Button variant="outline">Plan Your Budget</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
               <Card>
                  <CardHeader><CardTitle>Explore More Cities</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {ukCities.filter(c => c.name !== selectedCity.name).slice(0, 5).map(city => (
                       <button 
                        key={city.name}
                        onClick={() => {
                          setSelectedCity(city);
                          window.history.pushState({}, '', `?city=${createSlug(city.name)}`);
                        }}
                        className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <span className="font-medium">{city.name}</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Cost of Living in the UK
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover and compare the cost of living across major cities in the United Kingdom.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search city name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map(city => (
            <button
              key={city.name}
              onClick={() => {
                setSelectedCity(city);
                window.history.pushState({}, '', `?city=${createSlug(city.name)}`);
              }}
              className="text-left p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">{city.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{city.description}</p>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">View Details &rarr;</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}