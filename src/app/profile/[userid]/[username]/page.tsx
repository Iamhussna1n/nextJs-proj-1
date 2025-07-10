import { FiUser } from "react-icons/fi";

export default async function UserProfile({ params }: { params: Promise<{ userid: string , username: string }> }) {
    const { userid, username } = await params;
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="card w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-4">
          <FiUser className="text-4xl text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">User Profile</h2>
        <p className="text-gray-600">This is the user profile page.</p>
        <p className="text-gray-600">UserID: {userid}</p>
        <p className="text-gray-600">Username: {username}</p>
        <p className="text-gray-400 mt-4">This is a dynamic route example.</p>
      </div>
    </div>
  );
}