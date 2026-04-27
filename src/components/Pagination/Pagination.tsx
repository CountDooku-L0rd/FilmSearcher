import { Paginator } from "primereact/paginator";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setPage, setPageSize } from "../../store/filterSlice";

const Pagination = () => {
  const { page, pageSize } = useAppSelector((store) => store.filter);
  const { pagination } = useAppSelector((store) => store.main);
  const dispatch = useAppDispatch();
  return (
    <Paginator
      rows={pageSize}
      first={(page - 1) * pageSize}
      totalRecords={pagination.total}
      rowsPerPageOptions={[4, 8, 12, 16]}
      onPageChange={(event) => {
        dispatch(setPage(event.page + 1));
        dispatch(setPageSize(event.rows));
      }}
    />
  );
};

export default Pagination;
