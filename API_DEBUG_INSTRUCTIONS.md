# 🔧 API Debug Instructions

## The Problem
When you click on inventory or other API-related sections, the page loads then goes blank. This is likely due to:

1. **CORS (Cross-Origin Resource Sharing) issues**
2. **Network connectivity problems**
3. **API server not responding**
4. **Authentication issues**

## How to Debug

### Step 1: Use the API Test Component
1. Start your development server: `npm run dev` or `yarn dev`
2. Open your browser to `http://localhost:8080` (or your dev server URL)
3. Click on the **"API Test"** button in the dashboard
4. Click **"Test API Connection"** to see detailed error information
5. Check the browser console (F12 → Console tab) for detailed logs

### Step 2: Check Browser Console
1. Open browser developer tools (F12)
2. Go to the **Console** tab
3. Click on any API-related section (inventory, bizz, etc.)
4. Look for error messages like:
   - `CORS policy` errors
   - `Failed to fetch` errors
   - `Network Error` messages

### Step 3: Test API Directly
1. Open a new browser tab
2. Go to: `http://5.196.209.135/api/merchant/bizz`
3. Check if you see JSON data or an error message

## Common Solutions

### If you see CORS errors:
```bash
# The backend needs to allow your frontend domain
# Contact your backend developer to add CORS headers:
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### If you see "Failed to fetch":
- Check if the API server is running
- Verify the API URL is correct
- Check your internet connection

### If you see authentication errors:
- The API might require authentication tokens
- Check if you need to login first

## What I've Added

1. **Enhanced Error Logging**: All API calls now log detailed information
2. **API Test Component**: A dedicated tool to test API connectivity
3. **Fallback Data**: Prevents blank screens when API fails
4. **Better Error Messages**: More descriptive error handling

## Next Steps

1. **Test the API connection** using the API Test component
2. **Check the browser console** for specific error messages
3. **Share the error details** with your backend team
4. **Verify CORS settings** on your API server

The enhanced logging will show you exactly what's happening when the API calls fail!
