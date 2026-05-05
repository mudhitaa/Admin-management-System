export default function UserDashboard(){
    return(
        <main className="p-6">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">1,254</h3>
              <p className="text-xs text-green-600">+4.2% increase</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Active Sessions</p>
              <h3 className="text-2xl font-bold">87</h3>
              <p className="text-xs text-red-500">-2.1% decrease</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold">$12,320</h3>
              <p className="text-xs text-green-600">+8.5% increase</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Revenue</p>
              <h3 className="text-2xl font-bold">$12,320</h3>
              <p className="text-xs text-green-600">+8.5% increase</p>
            </div>

          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-lg shadow p-10 flex items-center justify-center text-gray-400">
            Main Dashboard Content Goes Here
          </div>

        </main>
    )
}