import { useState } from 'react';
import { motion } from 'framer-motion';

type Memory = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  connectedEvents: string[];
};

const memoriesData: Memory[] = [
  {
    id: 1,
    title: 'Family Beach Vacation',
    description: 'Our vacation to the beach with family.',
    date: 'August 12, 2022',
    image: '/images/beach-vacation.jpg',
    connectedEvents: ['Beach Volleyball', 'Bonfire Night'],
  },
  {
    id: 2,
    title: 'Birthday Party',
    description: 'The best birthday party ever!',
    date: 'March 5, 2023',
    image: '/images/birthday-party.jpg',
    connectedEvents: ['Cake Cutting', 'Games with Friends'],
  },
  {
    id: 3,
    title: 'First Day of School',
    description: 'A memorable first day of school.',
    date: 'September 1, 2021',
    image: '/images/first-day-school.jpg',
    connectedEvents: ['Class Photo', 'Meet New Friends'],
  },
];

export default function Gallery() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Close the detail view
  const closeDetails = () => {
    setSelectedMemory(null);
  };

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Floating Memory Gallery</h1>
      
      <div className="relative flex flex-wrap justify-center items-center gap-8">
        {memoriesData.map((memory) => (
          <motion.div
            key={memory.id}
            whileHover={{ scale: 1.1 }} // Scale on hover
            whileTap={{ scale: 0.9 }} // Click feedback animation
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg w-48 h-48"
            onClick={() => setSelectedMemory(memory)}
          >
            <motion.img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-cover"
              animate={{ y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } }} // Floating animation
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              {memory.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-lg p-6 relative max-w-lg mx-auto">
            <button
              onClick={closeDetails}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedMemory.title}</h2>
            <img
              src={selectedMemory.image}
              alt={selectedMemory.title}
              className="rounded-lg w-full mb-4"
            />
            <p className="mb-4"><strong>Date:</strong> {selectedMemory.date}</p>
            <p className="mb-4">{selectedMemory.description}</p>
            <h3 className="text-lg font-semibold mb-2">Connected Events:</h3>
            <ul className="list-disc list-inside">
              {selectedMemory.connectedEvents.map((event, idx) => (
                <li key={idx}>{event}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}