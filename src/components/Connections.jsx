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
    <div>

      <h1 className='text-5xl'>Connections</h1>

      <div className='text-white'>
        {connections.map((connection) => (
          <div key={connection._id}>
            <img className='w-72 h-screen' src={connection.photoUrl} alt="" />
            <p>{connection.firstName + " " + connection.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Connections