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
  if (connections.length == 0) return <h1>No connections found</h1>

  return (
    <div className='w-full my-10'>

      <div className='w-1/2 mx-auto text-center'>
        <h1 className='text-3xl font-bold my-5'>Connections</h1>

        <div className=''>
          {connections.map((connection) => (
            <div key={connection._id} className='bg-base-300 w-full my-2 flex p-3 rounded-xl' >
              <img className='w-20 h-20 object-cover rounded-full' src={connection.photoUrl} alt="" />
              <div className='text-start p-2'>
                <h2 className='font-semibold text-lg text-gray-50/80'>{connection.firstName + " " + connection.lastName}</h2>
                <p className='text-gray-50/30'>{connection.gender}, {connection.age}</p>
                <p className='text-gray-50/50'>{connection.about}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Connections