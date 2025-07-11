import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as testService from '@/api/testService';
import type { Test, CreateTest } from '@/types';

export default function TestRoute() {
  const [tests, setTests] = useState<Test[]>([]);
  const [newTest, setNewTest] = useState<CreateTest>({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tests on component mount
  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await testService.getAllTests();
      setTests(response as unknown as Test[]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tests');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async () => {
    try {
      setLoading(true);
      const response = await testService.createTest(newTest);
      setTests(prev => [...prev, response as unknown as Test]);
      setNewTest({ title: '', description: '' }); // Reset form
      setError(null);
    } catch (err) {
      setError('Failed to create test');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async (id: string) => {
    try {
      setLoading(true);
      await testService.removeTest(id);
      setTests(prev => prev.filter(test => test._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete test');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Test API Examples</h1>

      {/* Create Test Form */}
      <Card className="p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Test</h2>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Test Title"
              value={newTest.title}
              onChange={(e) => setNewTest(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <Textarea
              placeholder="Test Description"
              value={newTest.description}
              onChange={(e) => setNewTest(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <Button 
            onClick={handleCreateTest}
            disabled={loading || !newTest.title}
          >
            {loading ? 'Creating...' : 'Create Test'}
          </Button>
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tests List */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Test List</h2>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {tests.map((test) => (
              <Card key={test._id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{test.title}</h3>
                    <p className="text-sm text-gray-600">{test.description}</p>
                    <p className="text-xs text-gray-400">
                      Created: {new Date(test.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteTest(test._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
            {tests.length === 0 && !loading && (
              <p className="text-center text-gray-500">No tests found</p>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
} 