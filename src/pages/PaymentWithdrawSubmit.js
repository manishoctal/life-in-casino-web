import { isEmpty } from "lodash";
import React, { useState, useContext, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "wc-toast";

function PaymentWithdrawSubmit(props,) {
    let { loginUser, setPaymentModel, oneClickData, setPaymentObj, user, paymentObj, profileData } = useContext(AuthProvider);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            amount: profileData?.totalCoins
        }
    }
    );

    const [file, setFile] = useState();
    const [selectedFile, setSelectedFile] = useState('');
    function handleChange(e) {

        setFile(URL.createObjectURL(e.target.files[0]));
        if (e.target.files[0]) {

            setSelectedFile(e.target.files[0]);
        }
    }
    const onSubmit = async (data) => {
        setLoader(true)
        const formData = {
            amount: data.amount,
            paymentManagerDetails: data.paymentManagerDetails,
            paymentManagerName: paymentObj?.paymentName,
            customerName: profileData?.username
        };

        // if (selectedFile) {
        //     if (selectedFile.name) {
        //         formData.append('image', selectedFile, selectedFile.name);
        //     }
        // }


        // formData.append('amount', data.amount);
        // formData.append('paymentManagerDetails', data.paymentManagerDetails);
        // formData.append('paymentManagerName', paymentObj?.paymentName);
        // formData.append('customerName', profileData?.username);


        try {
            const { status, data: response_users } = await apiPost(
                apiPath.submitPaymentWithrowRequest,
                formData,
            );

            if (status === 200) {
                if (response_users.success) {
                    setLoader(false);
                    setPaymentObj({})
                    toast.success(response_users.message);
                    reset();
                    navigate('/profile')
                } else {
                    setLoader(false);
                    toast.error(response_users.results.message);
                }
            } else {
                setLoader(false);
                toast.error(response_users.message);
            }
        } catch (err) {
            setLoader(false);
            toast.error(err.response.data.message);
        }
    };
    return (
        <div>
            <div className="instration_wrap">
                <div className="instration__colapse">
                    <strong>Instruction</strong>
                    <ol>
                        <li>Please enter complete details of payment receiver bank for easy transaction.</li>
                    </ol>

                </div>

                <div className="transfer_section">
                    {/* <div className="instration_title">
                        1. Make a Transfer
                    </div> */}

                    <div className="card-layout__content card-layout__content_small">
                        {paymentObj?.key1 &&
                            <div className="card-layout__item card-layout__item_info">
                                <span className="title">Payment Reciever</span>
                                <span className="copy_value">
                                    <span className="card-layout__item_text">
                                        {paymentObj?.paymentName}
                                    </span>
                                    {/* <span className="copy">
                                        <img src="assets/images/copy.png" alt="" />
                                    </span> */}
                                </span>
                            </div>}
                        {paymentObj?.key2 &&
                            <div className="card-layout__item card-layout__item_info">
                                <span className="title">Username</span>
                                <span className="copy_value">
                                    <span className="card-layout__item_text">
                                        {profileData?.username}
                                    </span>
                                    {/* <span className="copy">
                                        <img src="assets/images/copy.png" alt="" />
                                    </span> */}
                                </span>
                            </div>}
                        {paymentObj?.key3 &&
                            <div className="card-layout__item card-layout__item_info">
                                <span className="title">Balance</span>
                                <span className="copy_value">
                                    <span className="card-layout__item_text">
                                        {process.env.REACT_APP_SHOW_CURRENCY == 'true' ? process.env.REACT_APP_CURRENCY : ''} {profileData?.totalCoins.toFixed(2)}
                                    </span>
                                    {/* <span className="copy">
                                        <img src="assets/images/copy.png" alt="" />
                                    </span> */}
                                </span>
                            </div>}
                        {/* {paymentObj?.key4 &&
                            <div className="card-layout__item card-layout__item_info">
                                <span className="title">{paymentObj?.key4}</span>
                                <span className="copy_value">
                                    <span className="card-layout__item_text">
                                        {paymentObj?.value4}
                                    </span>
                                    <span className="copy">
                                        <img src="assets/images/copy.png" alt="" />
                                    </span>
                                </span>
                            </div>} */}

                    </div>

                </div>


                <div className="Request_section">
                    <div className="instration_title">
                        Withdraw Request Details
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <dd>
                            <Form.Group>
                                {/* <Form.Label>Amount:</Form.Label> */}
                                <Form.Control
                                    type="number"

                                    // disabled={true}

                                    className={errors.amount ? " is-invalid " : ""}
                                    {...register("amount", {
                                        required: "Please enter amount",
                                        validate: (value) => { return value > profileData?.totalCoins ? 'Amount should be less than your balance' : value == 0 ? 'Amount should be not zero' : true },
                                    })}
                                /><br />
                                {errors.amount &&
                                    errors.amount.message && (
                                        <label className="invalid-feedback text-left">
                                            {errors.amount.message}
                                        </label>
                                    )}
                            </Form.Group>
                        </dd>

                        <dd>
                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Payment Receiver Details"
                                    className={errors.paymentManagerDetails ? " is-invalid w-100" : "w-100 pb-5"}
                                    {...register("paymentManagerDetails", {
                                        required: "Please enter payment receiver details.",
                                    })}
                                />
                                {errors.paymentManagerDetails &&
                                    errors.paymentManagerDetails.message && (
                                        <label className="invalid-feedback text-left">
                                            {errors.paymentManagerDetails.message}
                                        </label>
                                    )}
                            </Form.Group>
                        </dd>
                        {/* <dd>
                            <Form.Group>
                                <Form.Control
                                    placeholder="Enter 12 UTR number"
                                    className={errors.amount ? " is-invalid " : ""}
                                    {...register("utrNumber", {
                                        required: "Please enter 12 digit utr number ",
                                    })}
                                />
                                {errors.utrNumber &&
                                    errors.utrNumber.message && (
                                        <label className="invalid-feedback text-left">
                                            {errors.utrNumber.message}
                                        </label>
                                    )}
                            </Form.Group>
                        </dd> */}


                        {/* <dd>
                            <Form.Group>
                                <input
                                    type='file'
                                    accept='.png, .jpeg, .jpg'
                                    onChange={handleChange}
                                    className="width_form"
                                />
                                <img src={file} className="mt-4" />
                            </Form.Group>
                        </dd> */}

                        <dd>
                            <Button type="submit" className="btn-send w-100" id="loginBtn" disabled={loader}>
                                {loader ? "Loading..." : "Make Request"}
                            </Button>
                        </dd>


                        <dd>
                            <Button className="btn-send w-100" id="loginBtn" onClick={(e) => navigate("/recharge", { state: { from: 'withdraw' } })}>
                                Return
                            </Button>
                        </dd>


                    </Form>




                </div>
            </div>

        </div>

    );
}

export default PaymentWithdrawSubmit;
