import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MenuItem from '../modelUI/MenuItem';
import { Switch, Upload } from 'antd';
import menuItemAPI from '../apis/menuAPI';
import imageAPI from '../apis/imageAPI';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/LoadImage';
import { PlusOutlined } from '@ant-design/icons';

const category = ["All", "đồ nướng", "đồ uống", "đồ thui", "đồ chay"];

const MenuItemModal = ({ show, onHide, model, action }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [fileList, setFileList] = useState();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        category: Yup.string().required("Category is required"),
        description: Yup.string(),
        unit: Yup.string().required("Unit is required"),
        costPerUnit: Yup.number().required("Cost is required"),
        discount: Yup.number().required("Discount is required"),
    });

    const initialValues = {
        image: model.image ?? "/defaultImage.jpg",
        name: model.name ?? "",
        category: model.category ?? "",
        description: model.description ?? "",
        unit: model.unit ?? "",
        costPerUnit: model.costPerUnit ?? "",
        discount: model.discount ?? "",
        status: model.status ?? false,
    };

    async function onSubmit(values, { setStatus, setSubmitting, resetForm }) {
        try {
            setLoading(true);
            setError(null);
            console.log(fileList)

            let urlUpload = "";

            if (fileList.status != "done") {
                const formData = new FormData();                formData.append("image", fileList.fileSelect.file.originFileObj);
                formData.append("restaurantId", model._id);
                formData.append("name", fileList.fileSelect.file.name);
                formData.append("folder", "menu");

                const resImage = await imageAPI.upload(formData);
                if (!resImage.data.success) {
                    setError(`${actionList[action].title} không thành công.!`);
                }

                if (resImage.data.data.src != null) {
                    urlUpload = resImage.data.data.src;
                }
            } else {
                urlUpload = fileList.url;
            }

            if (urlUpload == "" && action != "c") {
                setError(`${actionList[action].title} không thành công.!`);
                return;
            }

            const success = await actionList[action].action(model._id, values, isActive, urlUpload);

            if (success) {
                resetForm();
                setFileList(null);
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

    const handleChange = (value) => {
        setFileList({
            status: 'error',
            url: URL.createObjectURL(value.file.originFileObj),
            fileSelect: value
        })
    };

    useEffect(() => {
        if (model.image != "") {
            if (model.image.startsWith("/")) {
                setFileList({
                    status: 'done',
                    url: model.image,
                });
            } else {
                setFileList({
                    status: 'done',
                    url: BASE_URL + model.image,
                });
            }
        }
    }, [model]);

    return (
        <Modal
            show={show}
            onHide={
                () => {
                    setError(null);
                    onHide();
                }
            }
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
                                {MenuItem.map((item) => {
                                    if (item.fieldName == "image") {
                                        return <div key={item.fieldName} className="form-group col">
                                            <div className='row justify-content-end'>
                                                <div className='col-4 d-flex align-items-center'>
                                                    <label className="fs-4 ">{item.label}</label>
                                                </div>
                                                <div className='col-8'>
                                                    <Upload
                                                        listType="picture-card"
                                                        showUploadList={false}
                                                        onChange={handleChange}
                                                    >
                                                        {fileList ? <img
                                                            src={fileList.url}
                                                            alt="image"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                        /> : <div>
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
                                                </div>
                                            </div>
                                        </div>
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

const actionCreate = async (values, isActive, isImage) => {
    const response = await menuItemAPI.create({
        image: values.image ? values.image : "/defaultImage.jpg",
        name: values.name,
        category: values.category.toLowerCase(),
        description: values.description,
        unit: values.unit,
        costPerUnit: values.costPerUnit,
        discount: values.discount,
        status: isActive ? 1 : 2,
    });
    return response.data.success;
}

const actionUpdate = async (index, values, isActive, isImage) => {
    const response = await menuItemAPI.update({
        id: index,
        image: values.image ? values.image : "/defaultImage.jpg",
        name: values.name,
        category: values.category.toLowerCase(),
        description: values.description,
        unit: values.unit,
        costPerUnit: values.costPerUnit,
        discount: values.discount,
        status: isActive ? 1 : 2,
    });
    return response.data.success;
}

const actionDelete = async (index, values, isActive, isImage) => {
    const response = await menuItemAPI.update({
        id: index,
        image: values.image ? values.image : "/defaultImage.jpg",
        name: values.name,
        category: values.category.toLowerCase(),
        description: values.description,
        unit: values.unit,
        costPerUnit: values.costPerUnit,
        discount: values.discount,
        status: 3,
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

export default MenuItemModal;