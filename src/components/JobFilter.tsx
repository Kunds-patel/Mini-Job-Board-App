import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters, clearFilters, selectFilters } from '@/features/jobsDataSlice';

const JobFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    dispatch(setFilters({ [field]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filter Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <Input
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              placeholder="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Job Type</label>
            <select
              className="w-full p-2 border border-input rounded-md bg-background"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <Input
              placeholder="Company name"
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="mr-2"
          >
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilter;
