import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Restaurant from '../modelUI/Restaurant';
import { Switch, Upload } from 'antd';
import restaurantAPI from '../apis/restaurantAPI';
import { PlusOutlined } from '@ant-design/icons';
import imageAPI from '../apis/imageAPI';
import { BASE_URL } from '../utils/LoadImage';

const RestaurantModal = ({ show, onHide, model, action }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [fileList, setFileList] = useState([

    ]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        address: Yup.string().required("Address is required"),
        openingTime: Yup.string().required("OpeningTime is required"),
        closingTime: Yup.string().required("ClosingTime is required"),
        description: Yup.string(),
    });

    const initialValues = {
        image: model.images ?? "",
        name: model.name ?? "",
        address: model.address ?? "",
        openingTime: model.openingTime ?? "",
        closingTime: model.closingTime ?? "",
        description: model.description ?? "",
        status: model.status ?? false,
    };

    async function onSubmit(values, { setStatus, setSubmitting, resetForm }) {
        try {
            setLoading(true);
            setError(null);

            let listImage = [];
            for (let index = 0; index < fileList.length; index++) {
                const element = fileList[index];
                if (element.status != "done") {
                    const formData = new FormData();
                    formData.append("image", element.originFileObj);
                    formData.append("restaurantId", model._id);
                    formData.append("name", element.name);
                    formData.append("folder", "restaurant");

                    const resImage = await imageAPI.upload(formData);
                    if (!resImage.data.success) {
                        setError(`${actionList[action].title} không thành công.!`);
                    }

                    if (resImage.data.data.src != null) {
                        listImage.push(resImage.data.data.src);
                    }
                }

                if (element.url != null) {
                    listImage.push(element.url);
                }
            }

            if (listImage.length == 0 && action != "c") {
                setError(`${actionList[action].title} không thành công.!`);
                return;
            }

            const success = await actionList[action].action(model._id, values, isActive, listImage);

            if (success) {
                resetForm();
                setFileList([]);
                setIsActive(true);
                setError(`${actionList[action].title} thành công.!`);
            } else {
                setError(`${actionList[action].title} không thành công.!`);
            }

        } catch (error) {
            console.log(error);
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    const handleIsActive = (checked, _) => {
        setIsActive(checked);
    }

    const handleChange = ({ fileList: newFileList }) => { setFileList(newFileList) };

    useEffect(() => {
        let fileList = [];
        for (let index = 0; index < model.images.length; index++) {
            const element = model.images[index];
            if (element.startsWith("http")) {
                fileList.push({
                    status: 'done',
                    url: element,
                });
            } else {
                fileList.push({
                    status: 'done',
                    url: BASE_URL + element,
                });
            }

        }
        setFileList(fileList);
    }, [model]);

    return (
        <Modal
            show={show}
            onHide={() => {
                onHide();
                setError(null);
            }}
            contentClassName="modal-90"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {actionList[action].title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched, isSubmitting, setFieldValue }) => {
                        return (
                            <Form className="form-horizontal h-100  position-relative">
                                {Restaurant.map((item) => {
                                    if (item.fieldName == "images") {
                                        return <>
                                            <Upload
                                                listType="picture-card"
                                                fileList={fileList}
                                                onChange={handleChange}
                                            >
                                                {fileList.length >= 3 ? null : <div>
                                                    <PlusOutlined />
                                                    <div
                                                        style={{
                                                            marginTop: 8,
                                                        }}
                                                    >
                                                        Upload
                                                    </div>
                                                </div>}
                                            </Upload>
                                        </>
                                    }

                                    if (item.fieldName == "status") {
                                        return <div key={item.fieldName} className="form-group col">
                                            <div className='row'>
                                                <div className='col-4 d-flex align-items-center'>
                                                    <label className="fs-4 ">{item.label}</label>
                                                </div>
                                                <div className='col-8'>
                                                    <Switch onChange={handleIsActive} checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" defaultChecked={model.status == 1} />
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    return (
                                        <div key={item.fieldName} className="form-group col">
                                            <div className='row'>
                                                <div className='col-4 d-flex align-items-center'>
                                                    <label className="fs-4 ">{item.label}</label>
                                                </div>
                                                <div className='col-8'>
                                                    <Field
                                                        name={item.fieldName}
                                                        type={item.type ? item.type : "text"}
                                                        placeholder={`Enter ${item.label} `}
                                                        className={
                                                            "form-control my-3" +
                                                            (errors[item.fieldName] &&
                                                                touched[item.fieldName]
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <ErrorMessage
                                                name={item.fieldName}
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    );
                                })}

                                {error && <p className="text-danger">{error}</p>}

                                <div className='row justify-content-end'>
                                    <div className='col-3'>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary"
                                        >
                                            {isSubmitting && (
                                                <span className="spinner-border spinner-border-sm mr-1"></span>
                                            )}
                                            {actionList[action].title}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

const actionCreate = async (index, values, isActive, isImage) => {
    const response = await restaurantAPI.create({
        images: isImage,
        name: values.name,
        address: values.address,
        openingTime: values.openingTime,
        closingTime: values.closingTime,
        description: values.description,
        status: isActive ? 1 : 2,
    });
    return response.data.success;
}

const actionUpdate = async (index, values, isActive, isImage) => {
    const response = await restaurantAPI.update({
        id: index,
        images: isImage,
        name: values.name,
        address: values.address,
        openingTime: values.openingTime,
        closingTime: values.closingTime,
        description: values.description,
        status: isActive ? 1 : 2,
    });
    return response.data.success;
}

const actionDelete = async (index, values, isActive, isImage) => {
    const response = await restaurantAPI.update({
        id: index,
        images: isImage,
        name: values.name,
        address: values.address,
        openingTime: values.openingTime,
        closingTime: values.closingTime,
        description: values.description,
        status: isActive ? 1 : 2,
        deleted: true
    });
    return response.data.success;
}
const actionList = {
    "c": {
        title: "Tạo mới",
        action: function (values, isActive, isImage) {
            return actionCreate(values, isActive, isImage);
        }
    },
    "u": {
        title: "Cập nhật",
        action: function (index, values, isActive, isImage) {
            return actionUpdate(index, values, isActive, isImage);
        }
    },
    "d": {
        title: "Xóa",
        action: function (index, values, isActive, isImage) {
            return actionDelete(index, values, isActive, isImage);
        }
    },
}

export default RestaurantModal;