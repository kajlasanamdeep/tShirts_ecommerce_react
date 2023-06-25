import { DeleteProduct } from "api/DeleteProduct";
import { ProductsList } from "api/ProductsList";
import NoImage from "assets/images/no_image.png";
import Bin from "assets/svg/Bin";
import Pencil from "assets/svg/Pencil";
import Star from "assets/svg/Star";
import Modal from "common/Modal";
import Pagination from "common/Pagination";
import Spinner from "common/Spinner";
import FeaturedModal from "components/Products/FeaturedModal";
import { IProductItem, IProductList } from "models/api/ProductsListResponse";
import {
    IFeaturedProductModal,
    IProductModal,
} from "models/data/ProductListModel";
import { IError } from "models/general/ErrorType";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreModel } from "store/store";
import tableStyles from "styles/Table.module.css";
import { CONSTANTS } from "utils/Constants";
import { Keys } from "utils/Keys";
import { Paths } from "utils/Paths";

const Products = () => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const token = useSelector(
        (state: StoreModel) => state.credentialsReducer.token
    );

    const [activePage, setActivePage] = useState(1);

    const { data, isLoading } = useQuery(
        [Keys.PRODUCT_LIST, activePage],
        ProductsList.bind(this, {
            pageNumber: activePage,
            token: token!,
        })
    );

    const { isLoading: deleteLoading, mutateAsync } = useMutation(
        Keys.DELETE_PRODUCT,
        DeleteProduct
    );

    const [modal, setModal] = useState<IProductModal>({
        isVisible: false,
        productId: null,
    });

    const [featuredModal, setFeaturedModal] = useState<IFeaturedProductModal>({
        isVisible: false,
        productId: "",
        productName: "",
    });

    const previousHandler = () => {
        setActivePage((oldState) => oldState - 1);
    };

    const nextHandler = () => {
        setActivePage((oldState) => oldState + 1);
    };

    const pageHandler = (pageNumber: number) => {
        setActivePage(pageNumber);
    };

    const modalHandler = (productId: string) => {
        setModal({
            isVisible: true,
            productId,
        });
    };

    const closeModalHandler = () => {
        setModal({
            isVisible: false,
            productId: null,
        });
    };

    const closeFeaturedModalHandler = () => {
        setFeaturedModal({
            isVisible: false,
            productId: "",
            productName: "",
        });
    };

    const openFeatureModalHandler = (
        productId: string,
        productName: string
    ) => {
        setFeaturedModal({
            isVisible: true,
            productId,
            productName,
        });
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

    const editHandler = (data: IProductItem) => {
        navigate(Paths.ADD_EDIT_PRODUCT, { state: data });
    };

    const deleteHandler = () => {
        const productId = modal.productId;

        closeModalHandler();

        mutateAsync({
            productId: productId!,
            token: token!,
        })
            .then(async (res) => {
                const previousData = await queryClient.getQueryData([
                    Keys.PRODUCT_LIST,
                    activePage,
                ]);

                if (checkQueryDataType(previousData)) {
                    const filteredItems = previousData?.items?.filter(
                        (item) => item?._id !== productId
                    );
                    previousData.items = filteredItems;
                    previousData.totalItems = +previousData.totalItems - 1;
                    queryClient.setQueryData(
                        [Keys.PRODUCT_LIST, activePage],
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
        data?.totalItems === 0 ||
        !!data === false ||
        (Array.isArray(data!.items) && data!.items.length < 1);

    return (
        <>
            {modal.isVisible ? (
                <Modal
                    heading="Delete Product"
                    para="Do you really want to delete this product? This action is irreversible. Click on Proceed to delete."
                    onCancel={closeModalHandler}
                    onConfirm={deleteHandler}
                />
            ) : null}
            {featuredModal.isVisible ? (
                <FeaturedModal
                    productId={featuredModal.productId}
                    productName={featuredModal.productName}
                    onClose={closeFeaturedModalHandler}
                />
            ) : null}
            {isLoading || deleteLoading ? <Spinner /> : null}
            <div className="container">
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover m-0">
                        <thead className={tableStyles.table_head}>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>For</th>
                                <th>Price</th>
                                <th>Sizes</th>
                                <th>Colors</th>
                                <th>Available</th>
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
                                data?.items?.map((item) => (
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
                                        <td>{item?.name}</td>
                                        <td>{item?.for}</td>
                                        <td>{item?.price}</td>
                                        <td>{item?.sizes?.join(", ")}</td>
                                        <td>
                                            <div className="row gap-1 justify-content-center">
                                                {item?.colors?.map((item) => (
                                                    <div
                                                        key={item?._id}
                                                        className={`${
                                                            tableStyles.color
                                                        } ${
                                                            item?.isAvaliable ===
                                                            false
                                                                ? tableStyles.inactive_color
                                                                : ""
                                                        }`}
                                                        style={{
                                                            backgroundColor:
                                                                item?.color_code,
                                                        }}
                                                        data-toggle="tooltip"
                                                        title={item?.name}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td
                                            className={
                                                item?.isAvaliable
                                                    ? tableStyles.active
                                                    : tableStyles.blocked
                                            }
                                        >
                                            {item?.isAvaliable ? "Yes" : "No"}
                                        </td>
                                        <td>
                                            <div
                                                className={tableStyles.actions}
                                            >
                                                <button
                                                    data-toggle="tooltip"
                                                    title="Edit"
                                                    className={
                                                        tableStyles.pencil
                                                    }
                                                    onClick={editHandler.bind(
                                                        this,
                                                        item
                                                    )}
                                                >
                                                    <Pencil />
                                                </button>
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
                                                <button
                                                    data-toggle="tooltip"
                                                    title="Add to Featured"
                                                    className={tableStyles.star}
                                                    onClick={openFeatureModalHandler.bind(
                                                        this,
                                                        item?._id,
                                                        item?.name
                                                    )}
                                                >
                                                    <Star />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        {noData ? null : (
                            <Pagination
                                activePage={activePage}
                                totalPages={Math.ceil(
                                    data!.totalItems / +data!.pageSize
                                )}
                                onPrevious={previousHandler}
                                onNext={nextHandler}
                                onInitial={pageHandler.bind(this, 1)}
                                onEnd={pageHandler.bind(
                                    this,
                                    Math.ceil(
                                        data!.totalItems / +data!.pageSize
                                    )
                                )}
                            />
                        )}
                    </table>
                </div>
            </div>
        </>
    );
};

export default Products;
