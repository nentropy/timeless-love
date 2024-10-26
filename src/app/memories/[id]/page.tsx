export default function MemoryDetails({ params }) {
    const { id } = params; // Memory ID from the route
  
    return (
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src="/path-to-memory.jpg" alt="Memory" className="w-full rounded-lg shadow-md" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Family Vacation 2023</h1>
            <p className="text-gray-600 mb-4">Captured on: August 10, 2023</p>
            <p className="text-lg mb-6">"We had the best time at the beach. The kids were so happy..."</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Edit</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
          </div>
        </div>
      </div>
    );
  }