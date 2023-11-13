import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import OtpAPI from '../apis/OTPAPI';
import OTPInput, { ResendOTP } from "otp-input-react";

const OTPModal = ({ show, onHide, phoneNo, isCanel, isDone }) => {
    const [OTP, setOTP] = useState("");
    const [error, setError] = useState("");
    const handleCanel = () => {
        onHide();
        isCanel();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Xác thực OTP
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                />
                {error && <div style={{ color: 'red' }}>
                    OTP không đúng
                </div>}
                <ResendOTP handelResendClick={() => console.log("Resend clicked")} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCanel}>Close</Button>
                <Button onClick={() => {
                    async function verify(phone, pin) {
                        const response = await OtpAPI.verify(phone, pin);
                        if (response.data.success) {
                            setError(false);
                            isDone();
                            onHide();
                        } else {
                            setError(true)
                        }
                        setOTP("");
                    }

                    verify(phoneNo, OTP);
                }
                }>Xác nhận</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OTPModal