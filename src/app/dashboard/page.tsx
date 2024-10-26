import { useEffect, useState } from 'react';
import LoadingSpinner from '@/ui/LoadingSpinner';


export default function Dashboard() {
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
      // Simulate a fetch or async call with a timeout
      const timer = setTimeout(() => {
        setLoading(false); // After 2 seconds, stop loading
      }, 2000);
  
      // Cleanup timeout
      return () => clearTimeout(timer); // Corrected cleanup function
    }, []); // Added dependency array

    return (
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
    
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="dashboard-content">
              {/* Your actual dashboard content goes here */}
              <p>Welcome to your dashboard! Here is your content.</p>
            </div>
          )}
        </div>
      );
}
