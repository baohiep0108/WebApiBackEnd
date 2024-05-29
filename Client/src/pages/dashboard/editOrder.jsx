import React, {  useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateOrder} from "@/redux/Thunk/order.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";

function EditOrder() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState('');
    const dispatch= useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(UpdateOrder({ orderId: id, status: orderStatus }));
            toast.success("Order updated successfully!");
            navigate("/dashboard/order");
        } catch (err) {
            toast.error("Order update failed!");
        }
    }


    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-2">
                                <label htmlFor="street-address"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Status
                                </label>
                                <div className="mt-4">
                                    <select
                                        onChange={handleStatusChange}
                                        value={orderStatus}
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option value="">--Select status--</option>
                                        <option value="Pending">Pending</option>
                                        <option value="In transit">In transit</option>
                                        <option value="Confirmed">Confirmed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={"/dashboard/order"}>
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                    </Link>
                    <div>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditOrder;
