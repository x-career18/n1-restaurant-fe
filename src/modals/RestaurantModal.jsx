import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Restaurant from '../modelUI/Restaurant';
import { Switch } from 'antd';
import restaurantAPI from '../apis/restaurantAPI';
import Carousel from 'react-bootstrap/Carousel';

const RestaurantModal = ({ show, onHide, model = {}, action }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true);
    const [isImage, setIsImage] = useState("/defaultImage.jpg");
    const [selectedFile, setSelectedFile] = useState(null);
    const [indexCarousel, setIndexCarousel] = useState(0);

    const validationSchema = Yup.object().shape({
        image: Yup.string(),
        name: Yup.string().required("Name is required"),
        category: Yup.string().required("Category is required"),
        description: Yup.string(),
        unit: Yup.string().required("Unit is required"),
        costPerUnit: Yup.number().required("Cost is required"),
        discount: Yup.number().required("Discount is required"),
        status: Yup.boolean(),
    });

    const initialValues = {
        image: model.images ?? "/defaultImage.jpg",
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

            const success = actionList[action].action(model._id, values, isActive, isImage);

            if (success) {
                resetForm();
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

    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        const file = e.target.files[0];
        setSelectedFile(file);
    };

    useEffect(() => {
        if (!selectedFile) {
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setIsImage(objectUrl)

        // free memory when ever this component is unmounted
        return () => {
            URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    const handleChangeSlider = (selectedIndex) => {
        setIndexCarousel(selectedIndex);
    };

    const handleSelectSlider = (e, item) => {
        e.preventDefault();
        // setSelect(item);
        // setModalShow(true);
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                onHide();
                setError(null);
                setSelectedFile(null);
                // setIsImage("/defaultImage.jpg");
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
                                        return <div key={item.fieldName} className="form-group col">
                                            <div className='row justify-content-center'>
                                                <div className='col-9'>
                                                    {
                                                        model.images ? <Carousel activeIndex={indexCarousel} onSelect={handleChangeSlider} interval={3000}>
                                                            {
                                                                model.images.map((item, index) => {
                                                                    return (
                                                                        <Carousel.Item
                                                                            key={index}
                                                                            interval={3000}
                                                                            onClick={(e) => handleSelectSlider(e, item)}
                                                                        >
                                                                            <img
                                                                                src={item}
                                                                                alt={item}
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: 500
                                                                                }}
                                                                            />
                                                                        </Carousel.Item>
                                                                    )
                                                                })
                                                            }
                                                        </Carousel > : <img
                                                            src={action == "c" ? "/defaultImage.jpg" : model.images ?? "/defaultImage.jpg"}
                                                            alt={action == "c" ? "/defaultImage.jpg" : model.images ?? "/defaultImage.jpg"}
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        />
                                                    }

                                                    <input
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                        className="form-control"
                                                        type="file"
                                                        id="formFile"
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                    />
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
    const response = await restaurantAPI.create({
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
    const response = await restaurantAPI.update({
        id: index,
        image: values.images ? values.images : "/defaultImage.jpg",
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
    const response = await restaurantAPI.update({
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

export default RestaurantModal;