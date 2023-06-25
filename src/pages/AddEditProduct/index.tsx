import { AddProduct } from "api/AddProduct";
import { ColorCode } from "api/ColorCode";
import NoImage from "assets/images/no_image.png";
import Add from "assets/svg/Add";
import Minus from "assets/svg/Minus";
import Button from "common/Button";
import { IProductItem, IProductList } from "models/api/ProductsListResponse";
import {
    IAddProduct,
    IAddProductColor,
    IAddProductError,
} from "models/data/AddEditProductModel";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreModel } from "store/store";
import styles from "styles/AddEditProduct.module.css";
import { CONSTANTS } from "utils/Constants";
import { Keys } from "utils/Keys";
import { Paths } from "utils/Paths";

const AddEditProduct = () => {
    const { isLoading, mutateAsync } = useMutation(
        Keys.ADD_PRODUCT,
        AddProduct
    );

    const { isLoading: colorLoading, mutateAsync: addColor } = useMutation(
        Keys.ADD_COLOR,
        ColorCode
    );

    const token = useSelector(
        (state: StoreModel) => state.credentialsReducer.token
    );

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { state }: { state: IProductItem | undefined } = useLocation();

    const [data, setData] = useState<IAddProduct>({
        _for: state ? state.for : "BOTH",
        description: state ? state.description : "",
        image: null,
        isAvaliable: state ? state.isAvaliable : true,
        name: state ? state.name : "",
        price: state ? state.price.toString() : "",
    });

    const [colors, setColors] = useState<IAddProductColor[]>(
        state
            ? state.colors.map((item) => ({
                  _id: item._id,
                  colorcode: item.color_code,
                  colorname: item.name,
                  image1: item?.image1 ? item.image1 : undefined,
                  image2: item?.image2 ? item.image2 : undefined,
                  image3: item?.image3 ? item.image3 : undefined,
                  isAvailable: item.isAvaliable,
              }))
            : [
                  {
                      _id: null,
                      colorcode: "#000000",
                      colorname: "",
                      image1: undefined,
                      image2: undefined,
                      image3: undefined,
                      isAvailable: true,
                  },
              ]
    );

    const [size, setSize] = useState<string[]>(state ? state.sizes : []);

    const [error, setError] = useState<IAddProductError>({
        description: false,
        name: false,
        price: false,
    });

    const textHandler = (
        uid: keyof IAddProduct,
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setData((oldState) => ({
            ...oldState,
            [uid]: event.target.value,
        }));
    };

    const addInputHandler = () => {
        setColors((oldState) => [
            ...oldState,
            {
                _id: null,
                colorcode: "#000000",
                colorname: "",
                image1: undefined,
                image2: undefined,
                image3: undefined,
                isAvailable: true,
            },
        ]);
    };

    const removeInputHandler = (index: number) => {
        const filteredInputs = colors.filter((_, idx) => idx !== index);
        setColors(filteredInputs);
    };

    const dynamicTextHandler = <K extends keyof IAddProductColor>(
        uid: K,
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const clone = [...colors];
        clone[index][uid] = event.target.value as IAddProductColor[K];
        setColors(clone);
    };

    const dynamicToggleHandler = (index: number) => {
        const clone = [...colors];
        clone[index].isAvailable = !clone[index].isAvailable;
        setColors(clone);
    };

    const dynamicFileHandler = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!!event.target.files && event.target.files?.length > 3) {
            toast.error("Upload maximum 3 pictures");
            return;
        }

        if (event.target.files) {
            const clone = [...colors];
            clone[index].image1 = event.target.files?.[0];
            clone[index].image2 = event.target.files?.[1];
            clone[index].image3 = event.target.files?.[2];
            setColors(clone);
        }
    };

    const errorRemoveHandler = (uid: keyof IAddProductError) => {
        if (error[uid]) {
            setError((oldState) => ({
                ...oldState,
                [uid]: false,
            }));
        }
    };

    const toggleCheckboxHandler = () => {
        setData((oldState) => ({
            ...oldState,
            isAvaliable: !oldState.isAvaliable,
        }));
    };

    const selectHandler = (
        value: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSize((oldState) => [...oldState, value]);
            return;
        }

        const filteredData = size.filter((item) => item !== value);
        setSize(filteredData);
    };

    const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((oldState) => ({
            ...oldState,
            image: event.target.files?.[0] ? event.target.files?.[0] : null,
        }));
    };

    const checkQueryDataType = (data: unknown): data is IProductList => {
        if (
            !!data &&
            typeof data === "object" &&
            data.constructor === Object &&
            "items" in data
        ) {
            return true;
        }
        return false;
    };

    const loading = isLoading || colorLoading;

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (loading) return;

        let flag = false;

        const clonedError = { ...error };

        if (data.name.trim().length < 1) {
            clonedError.name = true;
            flag = true;
        }

        if (data.description.trim().length < 1) {
            clonedError.description = true;
            flag = true;
        }

        if (data.price.trim().length < 1 || !!Number(data.price) === false) {
            clonedError.price = true;
            flag = true;
        }

        if (flag) {
            setError(clonedError);
            return;
        }

        if (size.length < 1) {
            toast.error("Please select atleast one available size");
            return;
        }

        const formData = new FormData();
        formData.append("_for", data._for);
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("sizes", JSON.stringify(size));
        formData.append("description", data.description);
        formData.append("isAvaliable", data.isAvaliable.toString());

        if (data.image) {
            formData.append("image", data.image);
        }

        if (state) {
            formData.append("_id", state._id);
        }

        mutateAsync({
            data: formData,
            token: token!,
        })
            .then(async (res) => {
                const previousData = await queryClient.getQueryData([
                    Keys.PRODUCT_LIST,
                    1,
                ]);

                const colorResponse = [];
                let index = 0;
                for (const item of colors) {
                    const colorData = new FormData();
                    let dataUpdated = false;
                    if (
                        state &&
                        (state?.colors?.[index]?.color_code !==
                            item.colorcode ||
                            state?.colors?.[index]?.name !== item.colorname ||
                            state?.colors?.[index]?.isAvaliable !==
                                item.isAvailable)
                    ) {
                        dataUpdated = true;
                    }

                    if (state && !!item._id) {
                        colorData.append("_id", item._id);
                    }

                    colorData.append("name", item.colorname);
                    colorData.append("color_code", item.colorcode);
                    colorData.append("productId", res.data?._id);
                    colorData.append(
                        "isAvaliable",
                        item.isAvailable.toString()
                    );

                    if (state) {
                        if (
                            typeof item.image1 === "object" &&
                            "type" in item.image1
                        ) {
                            colorData.append("image1", item.image1);
                            dataUpdated = true;
                        }

                        if (
                            typeof item.image2 === "object" &&
                            "type" in item.image2
                        ) {
                            colorData.append("image2", item.image2);
                            dataUpdated = true;
                        }

                        if (
                            typeof item.image3 === "object" &&
                            "type" in item.image3
                        ) {
                            colorData.append("image3", item.image3);
                            dataUpdated = true;
                        }
                    } else {
                        if (item.image1) {
                            colorData.append("image1", item.image1);
                        }

                        if (item.image2) {
                            colorData.append("image2", item.image2);
                        }

                        if (item.image3) {
                            colorData.append("image3", item.image3);
                        }
                    }

                    if (state) {
                        if (dataUpdated) {
                            await addColor({
                                data: colorData,
                                token: token!,
                            });
                        }
                    } else {
                        const response = await addColor({
                            data: colorData,
                            token: token!,
                        });

                        colorResponse.push(response.data);
                    }
                    index++;
                }

                const newItem = { ...res.data, colors: colorResponse };

                if (!!state === false && checkQueryDataType(previousData)) {
                    previousData.items.unshift(newItem as any);
                    previousData.totalItems = +previousData.totalItems + 1;
                    previousData.pageSize = (
                        +previousData.pageSize + 1
                    ).toString();
                    queryClient.setQueryData(
                        [Keys.PRODUCT_LIST, 1],
                        previousData
                    );
                }

                if (state) {
                    queryClient.refetchQueries(Keys.PRODUCT_LIST);
                }

                toast.success(res?.message);
                navigate(Paths.VIEW_PRODUCTS);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : "Unable to login right now!"
                )
            );
    };

    return (
        <div className={`${styles.container} container`}>
            <h4>Add Product</h4>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form
                        className={`${styles.input_holder} needs-validation`}
                        onSubmit={formHandler}
                        encType="multipart/form-data"
                    >
                        <div className="row">
                            <div className="col-12 col-sm-4">
                                <label htmlFor="madeFor" className="form-label">
                                    Made For
                                </label>
                                <select
                                    className="form-select"
                                    id="madeFor"
                                    value={data._for}
                                    onChange={textHandler.bind(this, "_for")}
                                    required
                                >
                                    <option value="BOTH">Both</option>
                                    <option value="MEN">Men</option>
                                    <option value="WOMEN">Women</option>
                                </select>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label
                                    htmlFor="productName"
                                    className="form-label"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={textHandler.bind(this, "name")}
                                    onBlur={errorRemoveHandler.bind(
                                        this,
                                        "name"
                                    )}
                                    className={`form-control ${
                                        error.name ? "is-invalid" : ""
                                    }`}
                                    id="productName"
                                    maxLength={80}
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid Product Name.
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={textHandler.bind(this, "price")}
                                    onBlur={errorRemoveHandler.bind(
                                        this,
                                        "price"
                                    )}
                                    className={`form-control ${
                                        error.price ? "is-invalid" : ""
                                    }`}
                                    id="price"
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid price.
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <label
                                    htmlFor="description"
                                    className="form-label"
                                >
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={textHandler.bind(
                                        this,
                                        "description"
                                    )}
                                    onBlur={errorRemoveHandler.bind(
                                        this,
                                        "description"
                                    )}
                                    className={`form-control ${
                                        error.description ? "is-invalid" : ""
                                    }`}
                                    id="description"
                                    maxLength={2000}
                                    rows={3}
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid description.
                                </div>
                            </div>
                        </div>

                        <div className={`row ${styles.checkbox_row}`}>
                            <label className="form-label">Size</label>
                            <div className="col-12">
                                <div>
                                    <input
                                        type="checkbox"
                                        value="S"
                                        checked={size.includes("S")}
                                        onChange={selectHandler.bind(this, "S")}
                                        id="small"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="small"
                                    >
                                        Small
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="M"
                                        checked={size.includes("M")}
                                        onChange={selectHandler.bind(this, "M")}
                                        id="medium"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="medium"
                                    >
                                        Medium
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="L"
                                        checked={size.includes("L")}
                                        onChange={selectHandler.bind(this, "L")}
                                        id="large"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="large"
                                    >
                                        Large
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="XL"
                                        checked={size.includes("XL")}
                                        onChange={selectHandler.bind(
                                            this,
                                            "XL"
                                        )}
                                        id="xl"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="xl"
                                    >
                                        Extra Large
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="XXL"
                                        checked={size.includes("XXL")}
                                        onChange={selectHandler.bind(
                                            this,
                                            "XXL"
                                        )}
                                        id="xxl"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="xxl"
                                    >
                                        Extra Extra Large
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="POLO"
                                        checked={size.includes("POLO")}
                                        onChange={selectHandler.bind(
                                            this,
                                            "POLO"
                                        )}
                                        id="polo"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="polo"
                                    >
                                        Polo
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="OVERSIZED"
                                        checked={size.includes("OVERSIZED")}
                                        onChange={selectHandler.bind(
                                            this,
                                            "OVERSIZED"
                                        )}
                                        id="oversized"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="oversized"
                                    >
                                        Oversized
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <label htmlFor="img" className="form-label">
                                    Main Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="img"
                                    accept="image/*"
                                    onChange={fileHandler}
                                />
                            </div>

                            {state ? (
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="img" className="form-label">
                                        Image Preview
                                    </label>
                                    <img
                                        src={
                                            state?.image
                                                ? CONSTANTS.HOST +
                                                  CONSTANTS.IMG_PATH +
                                                  state.image
                                                : NoImage
                                        }
                                        alt="Main Image"
                                        className="form-control p-0 border-0"
                                    />
                                </div>
                            ) : null}
                        </div>

                        <div className="row py-3">
                            <div className="col-12 col-sm-6">
                                <div
                                    className={`${styles.toggle} form-check form-switch`}
                                >
                                    <label
                                        className="form-check-label"
                                        htmlFor="isAvailable"
                                    >
                                        Available?
                                    </label>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="isAvailable"
                                        checked={data.isAvaliable}
                                        onChange={toggleCheckboxHandler}
                                    />
                                </div>
                            </div>
                        </div>
                        {colors.map((item, index) => (
                            <div
                                key={`color_${index}`}
                                className={styles.color_row}
                            >
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div
                                            className={`d-flex align-items-center gap-2 ${styles.color}`}
                                        >
                                            <div>
                                                <label
                                                    htmlFor={`color_name_${index}`}
                                                >
                                                    Color Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.colorname}
                                                    onChange={dynamicTextHandler.bind(
                                                        this,
                                                        "colorname",
                                                        index
                                                    )}
                                                    className="form-control"
                                                    id={`color_name_${index}`}
                                                    maxLength={50}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`color_code_${index}`}
                                                >
                                                    Pick Color
                                                </label>
                                                <input
                                                    type="color"
                                                    value={item.colorcode}
                                                    onChange={dynamicTextHandler.bind(
                                                        this,
                                                        "colorcode",
                                                        index
                                                    )}
                                                    className="form-control p-0 rounded"
                                                    id={`color_code_${index}`}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 py-3 py-md-0">
                                        <label htmlFor="img">
                                            Select upto 3 image(s)
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="img"
                                            onChange={dynamicFileHandler.bind(
                                                this,
                                                index
                                            )}
                                            accept="image/*"
                                            multiple
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div
                                        className={
                                            state ? "col-12 col-md-6" : "col-6"
                                        }
                                    >
                                        <div
                                            className={`${styles.toggle} form-check form-switch`}
                                        >
                                            <label
                                                className="form-check-label"
                                                htmlFor={`isAvailable_${index}`}
                                            >
                                                Available?
                                            </label>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id={`isAvailable_${index}`}
                                                checked={item.isAvailable}
                                                onChange={dynamicToggleHandler.bind(
                                                    this,
                                                    index
                                                )}
                                            />
                                            {state ? (
                                                <button
                                                    type="button"
                                                    className="mx-3"
                                                    onClick={
                                                        index === 0
                                                            ? addInputHandler
                                                            : removeInputHandler.bind(
                                                                  this,
                                                                  index
                                                              )
                                                    }
                                                >
                                                    {index === 0 ? (
                                                        <Add />
                                                    ) : (
                                                        <Minus />
                                                    )}
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            state ? "col-12 col-md-6" : "col-6"
                                        }
                                    >
                                        {state ? (
                                            <div className="d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-center justify-content-md-start">
                                                <img
                                                    src={
                                                        state?.colors?.[index]
                                                            ?.image1
                                                            ? CONSTANTS.HOST +
                                                              CONSTANTS.IMG_PATH +
                                                              state.colors[
                                                                  index
                                                              ].image1
                                                            : NoImage
                                                    }
                                                    alt={
                                                        state?.colors?.[index]
                                                            ?.name + " Image 1"
                                                    }
                                                />
                                                <img
                                                    src={
                                                        state?.colors?.[index]
                                                            ?.image2
                                                            ? CONSTANTS.HOST +
                                                              CONSTANTS.IMG_PATH +
                                                              state.colors[
                                                                  index
                                                              ].image2
                                                            : NoImage
                                                    }
                                                    alt={
                                                        state?.colors?.[index]
                                                            ?.name + " Image 2"
                                                    }
                                                />
                                                <img
                                                    src={
                                                        state?.colors?.[index]
                                                            ?.image3
                                                            ? CONSTANTS.HOST +
                                                              CONSTANTS.IMG_PATH +
                                                              state.colors[
                                                                  index
                                                              ].image3
                                                            : NoImage
                                                    }
                                                    alt={
                                                        state?.colors?.[index]
                                                            ?.name + " Image 3"
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={
                                                    index === 0
                                                        ? addInputHandler
                                                        : removeInputHandler.bind(
                                                              this,
                                                              index
                                                          )
                                                }
                                            >
                                                {index === 0 ? (
                                                    <Add />
                                                ) : (
                                                    <Minus />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="submit"
                            variant="primary"
                            text={state ? "Edit Product" : "Add Product"}
                            isLoading={loading}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEditProduct;
