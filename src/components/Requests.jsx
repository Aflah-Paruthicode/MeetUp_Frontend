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

    const replyAction = async (status, _id) => {
        try {
            await axios.post(baseUrl + '/request/review/' + _id + '/' + status, {}, { withCredentials: true });
            dispatch(removeRequest(_id))
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])


    if (!requests) return;
    if (requests.length == 0) return <h1 className='text-center text-black mt-36 text-xl font-semibold'>No Requests found</h1>

    return (
        <div className="w-full max-w-2xl mx-auto my-12 mt-36 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Requests <span className="text-blue-600 text-lg ml-2 font-medium">({requests.length})</span>
                </h1>

            </div>

            <div className="space-y-4">
                {requests.map((request) => {
                    const { firstName, lastName, photoUrl, gender, about } = request.fromUserId;

                    return (
                        <div
                            key={request._id}
                            className="group relative flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 transition-all duration-300"
                        >
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <img
                                        className="w-16 h-16 object-cover rounded-2xl shadow-sm ring-2 ring-white"
                                        src={photoUrl}
                                        alt="profile"
                                    />
                                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                                </div>

                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold text-slate-800 tracking-tight">
                                            {firstName} {lastName}
                                        </h2>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                                            {gender[0]}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-1 max-w-[250px]">
                                        {about || "Wants to connect with you"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                                    onClick={() => replyAction('rejected', request._id)}
                                    title="Reject"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <button
                                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-600 shadow-md hover:shadow-blue-200 transition-all active:scale-95"
                                    onClick={() => replyAction('accepted', request._id)}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    );
                })}

                {requests.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
                        <p className="text-slate-400 font-medium">No pending requests at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Requests