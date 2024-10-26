export default function Sharing() {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Family Sharing</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Invite Family Members</h2>
          <form>
            <input
              type="email"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter email address"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">Send Invite</button>
          </form>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Shared Memories</h2>
          <ul>
            {/* List of shared memories */}
            <li className="border-b py-4">Family Vacation 2023 - Shared with John, Sarah</li>
          </ul>
        </div>
      </div>
    );
  }