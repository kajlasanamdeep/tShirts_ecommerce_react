import DoubleLeftChevron from "assets/svg/DoubleLeftChevron";
import DoubleRightChevron from "assets/svg/DoubleRightChevron";
import LeftChevron from "assets/svg/LeftChevron";
import RightChevron from "assets/svg/RightChevron";
import tableStyles from "styles/Table.module.css";

const Pagination = (props: {
    activePage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    onInitial: () => void;
    onEnd: () => void;
}) => {
    const leftDisabled = props.activePage === 1;
    const rightDisabled = props.activePage === props.totalPages;

    return (
        <tfoot className={tableStyles.table_footer}>
            <tr>
                <td>
                    <div
                        className={`${tableStyles.pagination_container} justify-content-start justify-content-md-center`}
                    >
                        <button
                            className={leftDisabled ? tableStyles.inactive : ""}
                            onClick={leftDisabled ? undefined : props.onInitial}
                        >
                            <DoubleLeftChevron />
                        </button>
                        <button
                            className={leftDisabled ? tableStyles.inactive : ""}
                            onClick={
                                leftDisabled ? undefined : props.onPrevious
                            }
                        >
                            <LeftChevron />
                        </button>
                        <p>
                            Page {props.activePage} of {props.totalPages}
                        </p>
                        <button
                            onClick={rightDisabled ? undefined : props.onNext}
                            className={
                                rightDisabled ? tableStyles.inactive : ""
                            }
                        >
                            <RightChevron />
                        </button>
                        <button
                            className={
                                rightDisabled ? tableStyles.inactive : ""
                            }
                            onClick={rightDisabled ? undefined : props.onEnd}
                        >
                            <DoubleRightChevron />
                        </button>
                    </div>
                </td>
            </tr>
        </tfoot>
    );
};

export default Pagination;
