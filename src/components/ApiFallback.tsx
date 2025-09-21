import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface ApiFallbackProps {
  title: string;
  error?: string;
  onRetry?: () => void;
  onTestApi?: () => void;
}

const ApiFallback: React.FC<ApiFallbackProps> = ({ 
  title, 
  error, 
  onRetry, 
  onTestApi 
}) => {
  const isNetworkError = error?.includes('Failed to fetch') || error?.includes('NetworkError');
  const isCorsError = error?.includes('CORS') || error?.includes('cross-origin');

  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            {isNetworkError ? (
              <WifiOff className="w-8 h-8 text-red-600" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <CardTitle className="text-2xl text-red-600 mb-2">
            {title} - Connection Issue
          </CardTitle>
          <p className="text-gray-600">
            Unable to load data from the API server. This could be due to network issues or server problems.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Error Details */}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
              <p className="text-sm text-red-700 font-mono break-words">
                {error}
              </p>
            </div>
          )}

          {/* Common Issues */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Possible Causes:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              {isNetworkError && (
                <li>• <strong>Network Error:</strong> Cannot reach the API server at http://5.196.209.135/api</li>
              )}
              {isCorsError && (
                <li>• <strong>CORS Error:</strong> The API server doesn't allow requests from your domain</li>
              )}
              <li>• <strong>Server Down:</strong> The API server might be temporarily unavailable</li>
              <li>• <strong>Authentication:</strong> The API might require login or authentication</li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Solutions:</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Verify the API server is running</li>
              <li>• Contact your backend developer about CORS settings</li>
              <li>• Try refreshing the page</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onRetry && (
              <Button 
                onClick={onRetry}
                className="flex-1 bg-[#0794FE] hover:bg-[#065fad] text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
            
            {onTestApi && (
              <Button 
                onClick={onTestApi}
                variant="outline"
                className="flex-1 border-[#0794FE] text-[#0794FE]"
              >
                <Wifi className="w-4 h-4 mr-2" />
                Test API Connection
              </Button>
            )}
            
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-600"
            >
              Reload Page
            </Button>
          </div>

          {/* Direct API Test */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              You can also test the API directly:
            </p>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => window.open('http://5.196.209.135/api/merchant/bizz', '_blank')}
              className="text-[#0794FE] hover:text-[#065fad]"
            >
              Open API URL in New Tab
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiFallback;
