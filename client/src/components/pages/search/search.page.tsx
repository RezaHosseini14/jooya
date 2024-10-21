import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ResultsBox from "../../ResultsBox";
import ResultModal from "../../ResultModal";
import SearchFilter from "../../SearchFilter";
import { highlightService, resultByIdService, serachService } from "../../../services/search.service";
import SearchBox from "../../SearchBox";
import ResultSidebar from "../../ResultSidebar";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SET_FORMVALUE_ITEM } from "../../../redux/slices/search.filter.slice";

function SearchPage() {
  const { formValue } = useSelector((state: RootState) => state.searchFilter);
  const dispatch = useDispatch();

  // const [search, setSearch] = useState<string>("");
  const [fill, setFill] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { data, isPending, mutateAsync } = useMutation({
    mutationKey: ["searchService"],
    mutationFn: () =>
      serachService({
        pagenum: page - 1,
        pagesize: limit,
        ...formValue,
      }),
  });

  const {
    data: resultData,
    isPending: resultIsPending,
    mutateAsync: resultMutateAsync,
  } = useMutation({
    mutationKey: ["resultServiceById"],
    mutationFn: (id: string) =>
      resultByIdService({
        id: id,
      }),
  });

  const {
    data: highlightData,
    isPending: highlightIsPending,
    mutateAsync: highlightMutateAsync,
  } = useMutation({
    mutationKey: ["resultServiceById"],
    mutationFn: (id: string) =>
      highlightService({
        id: id,
      }),
  });

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === "NumEnter") {
      e.preventDefault();
      setFill(true);
      mutateAsync();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (formValue.should.length > 0) {
    setFill(true);
    mutateAsync();
    // }
  };

  const searchFilter = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = (id: string) => {
    setOpenModal(true);
    resultMutateAsync(id);
    highlightMutateAsync(id);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    mutateAsync();
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    mutateAsync();
  };

  return (
    <>
      <div className="w-screen h-screen relative pt-52">
        <SearchBox
          fill={fill}
          search={formValue.should.join(" ")}
          searchFilter={searchFilter}
          handleClick={handleClick}
          onInputChange={(input: string) => {
            dispatch(SET_FORMVALUE_ITEM({ key: "should", value: input === "" ? [] : input.split(" ") }));
          }}
          onInputKeyDown={handleInputKeyDown}
        />
        <div className={`transition-all duration-500 px-20 ${fill ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="flex items-start gap-4  h-[calc(100vh-15rem)]">
            <ResultSidebar data={data?.data} />
            <ResultsBox
              handleOpen={handleOpen}
              loading={isPending}
              data={data?.data}
              page={page}
              limit={limit}
              setPage={handlePageChange}
              setLimit={handleLimitChange}
            />
          </div>
        </div>
      </div>

      <SearchFilter open={open} setOpen={setOpen} handleClick={handleClick} />
      <ResultModal
        openModal={openModal}
        handleClose={handleClose}
        loading={resultIsPending}
        data={resultData?.data}
        highlightData={highlightData?.data}
        highlightLoading={highlightIsPending}
      />
    </>
  );
}

export default SearchPage;
