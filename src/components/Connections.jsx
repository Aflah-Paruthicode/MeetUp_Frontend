import axios from 'axios'
import React, { useEffect } from 'react'
import { baseUrl } from '../utils/constants'

const Connections = () => { 

    const fetchConnections = async () => {
        const res = await axios.get(baseUrl + '/user/connections',{ withCredentials: true});
        console.log(res);
    }

    useEffect(() => {
        fetchConnections();
    }, []);
  return (
    <div>Connections</div>
  )
}

export default Connections