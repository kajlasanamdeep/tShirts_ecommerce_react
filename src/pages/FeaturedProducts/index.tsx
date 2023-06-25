import { DeleteFeaturedProduct } from "api/DeleteFeaturedProduct";
import { FeaturedProductsList } from "api/FeaturedProductsList";
import NoImage from "assets/images/no_image.png";
import Bin from "assets/svg/Bin";
import Modal from "common/Modal";
import Spinner from "common/Spinner";
import { IFeaturedProductModal } from "models/data/FeaturedProductModel";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StoreModel } from "store/store";
import tableStyles from "styles/Table.module.css";
import { CONSTANTS } from "utils/Constants";
import { isDataFeaturedProduct } from "utils/Helpers";
import { Keys } from "utils/Keys";

const FeaturedProducts = () => {
    const queryClient = useQueryClient();

    const token = useSelector(
        (state: StoreModel) => state.credentialsReducer.token
    );

    const { data, isLoading } = useQuery(
        Keys.FEATURED_PRODUCT_LIST,
        FeaturedProductsList.bind(this, token!)
    );

    const { isLoading: deleteLoading, mutateAsync } = useMutation(
        Keys.DELETE_FEATURED_PRODUCT,
        DeleteFeaturedProduct
    );

    const [modal, setModal] = useState<IFeaturedProductModal>({
        isVisible: false,
        featuredId: null,
    });

    const modalHandler = (featuredId: string) => {
        setModal({
            isVisible: true,
            featuredId,
        });
    };

    const closeModalHandler = () => {
        setModal({
            isVisible: false,
            featuredId: null,
        });
    };

    const deleteHandler = () => {
        const featuredId = modal.featuredId;

        closeModalHandler();

        mutateAsync({
            featuredId: featuredId!,
            token: token!,
        })
            .then(async (res) => {
                const previousData = await queryClient.getQueryData(
                    Keys.FEATURED_PRODUCT_LIST
                );

                if (isDataFeaturedProduct(previousData)) {
                    const filteredItems = previousData?.data?.filter(
                        (item) => item?._id !== featuredId
                    );
                    previousData.data = filteredItems;
                    queryClient.setQueryData(
                        Keys.FEATURED_PRODUCT_LIST,
                        previousData
                    );
                }

                toast.success(res?.message);
            })
            .catch((err: IError) =>
                toast.error(
                    err.response?.data?.error
                        ? err.response?.data?.error
                        : "Unable to delete product right now!"
                )
            );
    };

    const noData =
        !!data === false ||
        (Array.isArray(data!.data) && data!.data.length < 1);

    return (
        <>
            {modal.isVisible ? (
                <Modal
                    heading="Delete Featured Product"
                    para="Do you really want to delete this product from Featured List? This action is irreversible. Click on Proceed to delete."
                    onCancel={closeModalHandler}
                    onConfirm={deleteHandler}
                />
            ) : null}
            {isLoading || deleteLoading ? <Spinner /> : null}
            <div className="container">
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover m-0">
                        <thead className={tableStyles.table_head}>
                            <tr>
                                <th>Featured Image</th>
                                <th>Name</th>
                                <th>Label</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className={tableStyles.table_body}>
                            {noData ? (
                                <tr>
                                    <td
                                        className={tableStyles.no_data}
                                        colSpan={9}
                                    >
                                        {isLoading ? "" : "No data found"}
                                    </td>
                                </tr>
                            ) : (
                                data?.data?.map((item) => (
                                    <tr key={item?._id}>
                                        <td>
                                            {item?.image ? (
                                                <img
                                                    src={
                                                        CONSTANTS.HOST +
                                                        CONSTANTS.IMG_PATH +
                                                        item.image
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    src={NoImage}
                                                    alt="No Product Image available"
                                                />
                                            )}
                                        </td>
                                        <td>{item?.product?.name}</td>
                                        <td>{item?.label}</td>
                                        <td>
                                            <div
                                                className={tableStyles.actions}
                                            >
                                                <button
                                                    data-toggle="tooltip"
                                                    title="Delete"
                                                    className={tableStyles.bin}
                                                    onClick={modalHandler.bind(
                                                        this,
                                                        item?._id
                                                    )}
                                                >
                                                    <Bin />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default FeaturedProducts;
