import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {

    const requests = useSelector(store => store.requests);
    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try {
            const res = await axios.get(baseUrl + '/user/requests/received', { withCredentials: true });
            console.log(res)
            dispatch(addRequests(res?.data?.data))
        } catch (err) {
            console.log(err)
        }
    }

    const replyAction = async (status,_id) => {
        try {
            const res = await axios.post(baseUrl+ '/request/review/'+_id+'/'+status,{},{withCredentials: true}); 
            dispatch(removeRequest(_id)) 
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    },[])


    if (!requests) return;
    if (requests.length == 0) return <h1>No Requests found</h1>

    return (
        <div className='w-full my-10'>

            <div className='w-1/2 mx-auto text-center'>
                <h1 className='text-3xl font-bold my-5'>Requests</h1>

                <div className=''>
                    {requests.map((request) => {

                        const {firstName, lastName, photoUrl, gender, about, skills} = request.fromUserId;

                     return (
                        <div  className='bg-base-300 w-full my-2 flex justify-around p-3 rounded-xl' >
                            <img className='w-20 h-20 object-cover rounded-full' src={photoUrl} alt="" />
                            <div className='text-start p-2'>
                                <h2 className='font-semibold text-lg text-gray-50/80'>{firstName + " " + lastName}</h2>
                                <p className='text-gray-50/30'>{gender}</p>
                                <p className='text-gray-50/50'>{about}</p>
                            </div>
                            <div className='my-auto space-x-2'>
                                <button className='btn btn-outline' onClick={() => replyAction('rejected',request._id)}>reject</button>
                                <button className='btn bg-blue-400' onClick={() => replyAction('accepted',request._id)}>accept</button>
                            </div>
                        </div>
                    )})}
                </div>

            </div>
        </div>
    )
}

export default Requests