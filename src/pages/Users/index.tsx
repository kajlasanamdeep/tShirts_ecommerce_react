import { UsersList } from "api/UsersList";
import Pagination from "common/Pagination";
import Spinner from "common/Spinner";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { StoreModel } from "store/store";
import tableStyles from "styles/Table.module.css";
import { formatDate } from "utils/Helpers";
import { Keys } from "utils/Keys";

const Users = () => {
    const token = useSelector(
        (state: StoreModel) => state.credentialsReducer.token
    );

    const [activePage, setActivePage] = useState(1);

    const { data, isLoading } = useQuery(
        [Keys.USER_LIST, activePage],
        UsersList.bind(this, {
            pageNumber: activePage,
            token: token!,
        })
    );

    const previousHandler = () => {
        setActivePage((oldState) => oldState - 1);
    };

    const nextHandler = () => {
        setActivePage((oldState) => oldState + 1);
    };

    const pageHandler = (pageNumber: number) => {
        setActivePage(pageNumber);
    };

    const noData =
        data?.totalItems === 0 ||
        !!data === false ||
        (Array.isArray(data!.items) && data!.items.length < 1);

    return (
        <>
            {isLoading ? <Spinner /> : null}
            <div className="container">
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover m-0">
                        <thead className={tableStyles.table_head}>
                            <tr>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>State</th>
                                <th>Zip</th>
                                <th>Country</th>
                                <th>Joined On</th>
                                <th>Status</th>
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
                                        <td>{item?.email}</td>
                                        <td>{item?.role}</td>
                                        <td>{item?.name}</td>
                                        <td>
                                            {item?.countryCode}{" "}
                                            {item?.phoneNumber}
                                        </td>
                                        <td>{item?.address}</td>
                                        <td>{item?.state}</td>
                                        <td>{item?.zipCode}</td>
                                        <td>{item?.country}</td>
                                        <td>{formatDate(item?.createdAt)}</td>
                                        <td
                                            className={
                                                item?.isBlocked
                                                    ? tableStyles.blocked
                                                    : tableStyles.active
                                            }
                                        >
                                            {item?.isBlocked
                                                ? "Blocked"
                                                : "Active"}
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

export default Users;
