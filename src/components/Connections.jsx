import axios from 'axios'
import { useEffect } from 'react'
import { baseUrl } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

  const connections = useSelector(store => store.connections)
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(baseUrl + '/user/connections', { withCredentials: true });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0) return <h1 className='text-black mt-10 text-xl font-semibold'>No connections found</h1>

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-6 mt-36">  
      <div className="flex items-end gap-3 mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Connections</h1>
        <span className="mb-1.5 px-3 py-0.5 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
          {connections.length} Total
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="group relative bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-blue-100 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  className="w-16 h-16 object-cover rounded-2xl grayscale-25 group-hover:grayscale-0 transition-all duration-500"
                  src={connection.photoUrl}
                  alt={connection.firstName}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {connection.gender} • {connection.age} Years
                </p>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed italic">
                  "{connection.about || 'No bio available'}"
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-50 flex justify-between items-center">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Message
              </button>
              <button className="text-xs font-bold text-slate-300 hover:text-red-400 transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {connections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">No connections yet</h3>
          <p className="text-slate-500">Start exploring to find people you might know!</p>
        </div>
      )}
    </div>
  )
}

export default Connections