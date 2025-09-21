import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/lib/api';

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    addResult('🚀 Starting API connection test...');
    setIsLoading(true);

    try {
      // Test 1: Basic connectivity
      addResult('📡 Testing basic connectivity...');
      const response = await fetch('http://5.196.209.135/api/merchant/bizz', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });
      
      addResult(`📊 Response status: ${response.status} ${response.statusText}`);
      addResult(`📋 Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`);
      
      if (response.ok) {
        const data = await response.json();
        addResult(`✅ Success! Received ${Array.isArray(data) ? data.length : 'unknown'} items`);
        addResult(`📄 Sample data: ${JSON.stringify(data.slice(0, 2), null, 2)}`);
      } else {
        const errorText = await response.text();
        addResult(`❌ Error response: ${errorText}`);
      }
      
    } catch (error) {
      addResult(`💥 Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        addResult('🔍 This looks like a CORS or network connectivity issue');
        addResult('💡 Possible solutions:');
        addResult('   - Check if the API server is running');
        addResult('   - Verify CORS settings on the backend');
        addResult('   - Try accessing the API directly in browser');
      }
    } finally {
      setIsLoading(false);
      addResult('🏁 Test completed');
    }
  };

  const testDirectUrl = () => {
    window.open('http://5.196.209.135/api/merchant/bizz', '_blank');
    addResult('🌐 Opened API URL in new tab - check browser console for CORS errors');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#0794FE]">
          🔧 API Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button 
            onClick={testApiConnection}
            disabled={isLoading}
            className="bg-[#0794FE] hover:bg-[#065fad] text-white"
          >
            {isLoading ? 'Testing...' : 'Test API Connection'}
          </Button>
          
          <Button 
            onClick={testDirectUrl}
            variant="outline"
            className="border-[#0794FE] text-[#0794FE]"
          >
            Open API URL
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Common Issues & Solutions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>CORS Error:</strong> Backend needs to allow requests from your frontend domain</li>
            <li>• <strong>Network Error:</strong> API server might be down or unreachable</li>
            <li>• <strong>Authentication:</strong> Some endpoints might require authentication</li>
            <li>• <strong>HTTPS/HTTP:</strong> Mixed content issues if frontend is HTTPS</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiTestComponent;
