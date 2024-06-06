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
            // amount: 0
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
        console.log('data', data)
        setLoader(true)
        const formData = {
            amount: data.amount,
            paymentManagerName: paymentObj?.paymentName,
            customerName: profileData?.username,
            ifscCode: data?.ifscCode,
            accountNumber: data?.accountNumber,
            bankName: data?.bankName
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
                                    placeholder="Enter Amount"
                                    style={{ marginBottom: '0px' }}
                                    className={errors.amount ? " is-invalid " : ""}
                                    {...register("amount", {
                                        required: "Please enter amount.",
                                        validate: (value) => { return value > profileData?.totalCoins ? 'Amount should be less than your balance' : value == 0 ? 'Amount should be not zero' : true },
                                    })}
                                /><br />

                                <div style={{ marginBottom: '10px' }}>
                                    {errors.amount &&
                                        errors?.amount?.message && (
                                            <span className="invalid-feedback text-left" style={{ color: 'red' }}>
                                                {errors.amount.message}
                                            </span>
                                        )}
                                </div>
                            </Form.Group>
                        </dd>

                        <dd>
                            <Form.Group>
                                {/* <Form.Label>Amount:</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Bank Name"
                                    style={{ marginBottom: '0px' }}
                                    className={errors.amount ? " is-invalid " : ""}
                                    {...register("bankName", {
                                        required: "Please enter bank name.",
                                        validate: {
                                            whiteSpace: value => (value.trim() ? true : 'White space not allowed.')
                                        }
                                    })}
                                /><br />

                                <div style={{ marginBottom: '10px' }}>
                                    {errors?.bankName && (
                                        <span className="invalid-feedback text-left" style={{ color: 'red' }}>
                                            {errors.bankName.message}
                                        </span>
                                    )}
                                </div>
                            </Form.Group>
                        </dd>

                        <dd>
                            <Form.Group>
                                {/* <Form.Label>Amount:</Form.Label> */}
                                <Form.Control
                                    type="number"

                                    placeholder="Enter Account Number"
                                    style={{ marginBottom: '0px' }}
                                    className={errors.amount ? " is-invalid " : ""}
                                    {...register("accountNumber", {
                                        required: "Please enter account number.",
                                        minLength: {
                                            value: 12,
                                            message: 'Account number must be at least 12.'
                                        },
                                        maxLength: {
                                            value: 16,
                                            message: 'Account number must be at most 16'
                                        },
                                        validate: {
                                            whiteSpace: value => (value.trim() ? true : 'White space not allowed.')
                                        }
                                    })}
                                /><br />

                                <div style={{ marginBottom: '10px' }}>
                                    {errors?.accountNumber && (
                                        <span className="invalid-feedback text-left" style={{ color: 'red' }}>
                                            {errors.accountNumber.message}
                                        </span>
                                    )}
                                </div>
                            </Form.Group>
                        </dd>
                        <dd>
                            <Form.Group>
                                {/* <Form.Label>Amount:</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    placeholder="Enter IFSC Code"
                                    style={{ marginBottom: '0px' }}
                                    className={errors.amount ? " is-invalid " : ""}
                                    {...register("ifscCode", {
                                        required: "Please enter IFSC code.",
                                        pattern: {
                                            value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                                            message: 'Please enter valid IFSC code.'
                                          },
                                        validate: {
                                            whiteSpace: value => (value.trim() ? true : 'White space not allowed.')
                                        }
                                    })}
                                /><br />

                                <div style={{ marginBottom: '10px' }}>
                                    {errors?.ifscCode && (
                                        <span className="invalid-feedback text-left" style={{ color: 'red' }}>
                                            {errors.ifscCode.message}
                                        </span>
                                    )}
                                </div>
                            </Form.Group>
                        </dd>


                        {/* 
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
                                        <span className="invalid-feedback text-left" style={{color:'red'}}>
                                            {errors.paymentManagerDetails.message}
                                        </span>
                                    )}
                            </Form.Group>
                        </dd> */}
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
