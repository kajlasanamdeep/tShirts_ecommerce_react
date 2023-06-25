import { AddFeaturedProduct } from "api/AddFeaturedProduct";
import Button from "common/Button";
import { IFeaturedProductsData } from "models/api/FeaturedProductsResponse";
import { IError } from "models/general/ErrorType";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreModel } from "store/store";
import styles from "styles/Modal.module.css";
import { isDataFeaturedProduct } from "utils/Helpers";
import { Keys } from "utils/Keys";
import { Paths } from "utils/Paths";

const FeaturedModal = (props: {
    productId: string;
    productName: string;
    onClose: () => void;
}) => {
    const { isLoading, mutateAsync } = useMutation(
        Keys.ADD_FEATURED_PRODUCT,
        AddFeaturedProduct
    );

    const token = useSelector(
        (state: StoreModel) => state.credentialsReducer.token
    );

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState("");
    const [labelError, setLabelError] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const labelHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value);
    };

    const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files ? event.target.files?.[0] : null;
        setFile(file);
    };

    const errorRemoveHandler = () => {
        if (labelError) {
            setLabelError(false);
        }
    };

    const formHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (label.trim().length < 1) {
            setLabelError(true);
            return;
        }

        if (file === null) {
            toast.error("Please select a valid image");
            return;
        }

        const formData = new FormData();
        formData.append("productId", props.productId);
        formData.append("label", label);
        formData.append("image", file);

        mutateAsync({
            data: formData,
            token: token!,
        })
            .then(async (res) => {
                const getQueryData = await queryClient.getQueryData(
                    Keys.FEATURED_PRODUCT_LIST
                );

                if (isDataFeaturedProduct(getQueryData)) {
                    const newData = {
                        ...res.data,
                        product: {
                            name: props.productName,
                        },
                    };
                    getQueryData.data.push(newData as IFeaturedProductsData);
                    queryClient.setQueryData(
                        Keys.FEATURED_PRODUCT_LIST,
                        getQueryData
                    );
                }

                toast.success(res?.message);
                props.onClose();
                navigate(Paths.FEATURED_PRODUCTS);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : "Unable to login right now!"
                )
            );
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return createPortal(
        <div className={styles.container}>
            <div
                className={`${styles.content} ${visible ? styles.active : ""}`}
            >
                <h2 className={styles.heading}>Add to Featured Product</h2>
                <div className="container py-4">
                    <form
                        className={`${styles.input_holder} needs-validation`}
                        onSubmit={formHandler}
                    >
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label htmlFor="label" className="form-label">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={labelHandler}
                                    onBlur={errorRemoveHandler}
                                    className={`form-control ${
                                        labelError ? "is-invalid" : ""
                                    }`}
                                    id="label"
                                    maxLength={80}
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid Label.
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="img" className="form-label">
                                    Featured Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="img"
                                    accept="image/*"
                                    onChange={fileHandler}
                                />
                                <small
                                    id="img"
                                    className="form-text text-muted"
                                >
                                    Recommended Size (526x817, 1063x950)
                                </small>
                            </div>
                        </div>
                        <div className={styles.btn_holder}>
                            <div>
                                <Button
                                    text="Cancel"
                                    variant="secondary"
                                    onClick={props.onClose}
                                />
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    text="Add to Featured"
                                    variant="primary"
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById("modal")!
    );
};

export default FeaturedModal;
