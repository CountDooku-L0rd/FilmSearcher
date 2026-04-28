import CustomSelect from "../../shared/CustomSelect/CustomSelect";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { sortingBy, sortingOrders } from "../../../constants/constants";
import type { ESortField, ESortOrder } from "@yp-mentor/films-server-types";
import {
  setPage,
  setSortBy,
  setSortingOrder,
} from "../../../store/filterSlice";

const SortPanel = () => {
  const dispatch = useAppDispatch();
  const { sortBy, sortingOrder } = useAppSelector((store) => store.filter);
  return (
    <>
      <CustomSelect
        options={sortingBy}
        value={sortBy}
        onChange={(option: { value: ESortField; label: string }) => {
          dispatch(setSortBy(option));
          dispatch(setPage(1));
        }}
        title={"Сортировать по"}
        style={{ width: "200px" }}
      />
      <CustomSelect
        options={sortingOrders}
        value={sortingOrder}
        onChange={(option: { value: ESortOrder; label: string }) => {
          dispatch(setSortingOrder(option));
          dispatch(setPage(1));
        }}
        title={"Порядок сортировки"}
        style={{ width: "235px" }}
      />
    </>
  );
};

export default SortPanel;
