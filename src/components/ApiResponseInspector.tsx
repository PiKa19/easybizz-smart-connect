import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Copy, Check } from 'lucide-react';
import { apiService } from '@/lib/api';

const ApiResponseInspector = () => {
  const [responses, setResponses] = useState<Array<{
    endpoint: string;
    data: any;
    timestamp: string;
    error?: string;
  }>>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const testEndpoint = async (endpoint: string, name: string) => {
    setLoading(endpoint);
    try {
      console.log(`🔍 Testing ${name} endpoint:`, endpoint);
      const data = await (apiService as any).request(endpoint);
      console.log(`✅ ${name} response:`, data);
      
      setResponses(prev => [...prev, {
        endpoint: name,
        data,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } catch (error) {
      console.error(`❌ ${name} error:`, error);
      setResponses(prev => [...prev, {
        endpoint: name,
        data: null,
        timestamp: new Date().toLocaleTimeString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }]);
    } finally {
      setLoading(null);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = [
    { path: '/merchant/bizz', name: 'Merchant Bizz' },
    { path: '/merchant/inventory', name: 'Merchant Inventory' },
    { path: '/merchant/orders', name: 'Merchant Orders' },
    { path: '/supplier/inventory', name: 'Supplier Inventory' },
    { path: '/supplier/orders', name: 'Supplier Orders' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            API Response Inspector
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Test API endpoints and inspect their response format to understand the data structure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {endpoints.map((endpoint) => (
              <Button
                key={endpoint.path}
                onClick={() => testEndpoint(endpoint.path, endpoint.name)}
                disabled={loading === endpoint.path}
                className="justify-start"
                variant="outline"
              >
                {loading === endpoint.path ? 'Testing...' : `Test ${endpoint.name}`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {responses.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Response History</h3>
          {responses.map((response, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{response.endpoint}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{response.timestamp}</Badge>
                    {response.error ? (
                      <Badge variant="destructive">Error</Badge>
                    ) : (
                      <Badge variant="default">Success</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {response.error ? (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Error:</h4>
                    <p className="text-red-700 font-mono text-sm">{response.error}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Response Data:</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2), `data-${index}`)}
                      >
                        {copied === `data-${index}` ? (
                          <Check className="w-4 h-4 mr-1" />
                        ) : (
                          <Copy className="w-4 h-4 mr-1" />
                        )}
                        {copied === `data-${index}` ? 'Copied!' : 'Copy JSON'}
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Data Structure Analysis:</h5>
                      <ul className="text-sm space-y-1">
                        <li><strong>Type:</strong> {typeof response.data}</li>
                        <li><strong>Is Array:</strong> {Array.isArray(response.data) ? 'Yes' : 'No'}</li>
                        {Array.isArray(response.data) && (
                          <li><strong>Array Length:</strong> {response.data.length}</li>
                        )}
                        {!Array.isArray(response.data) && response.data && (
                          <li><strong>Object Keys:</strong> {Object.keys(response.data).join(', ')}</li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Raw JSON Response:</h5>
                      <pre className="text-xs overflow-auto max-h-96 bg-white p-2 rounded border">
                        {JSON.stringify(response.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiResponseInspector;
