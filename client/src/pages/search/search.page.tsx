import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import ResultsBox from "../../components/ResultsBox";
import ResultModal from "../../components/ResultModal";
import SearchFilter from "../../components/SearchFilter";
import SearchBox from "../../components/SearchBox";
import ResultSidebar from "../../components/ResultSidebar";
import { highlightService, resultByIdService, serachService } from "../../services/search.service";
import { RootState } from "../../redux/store";
import { areFiltersApplied, SET_FORMVALUE_ITEM } from "../../redux/slices/search.filter.slice";
import toast from "react-hot-toast";

function SearchPage() {
  const { formValue, prevFormValue } = useSelector((state: RootState) => state.searchFilter);
  const filtersApplied = useSelector((state: RootState) => areFiltersApplied(state.searchFilter));

  const dispatch = useDispatch();

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
        should: formValue.should.length > 0 ? formValue.should : prevFormValue.should,
        mustNot: formValue.mustNot.length > 0 ? formValue.mustNot : prevFormValue.mustNot,
        must: formValue.must.length > 0 ? formValue.must : prevFormValue.must,
        sentence: formValue.sentence.length > 0 ? formValue.sentence : prevFormValue.sentence,
      }),
  });

  const handleSearch = () => {
    if (filtersApplied) {
      setFill(true);
      mutateAsync();
    } else {
      toast.error("تعداد کاراکتر مورد نظر باید بیشتر از یک حرف باشد");
      setFill(false);
    }
  };

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === "NumEnter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const showSearchFilter = () => {
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
          searchFilter={showSearchFilter}
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
        highlightData={highlightData?.data?.content ? highlightData?.data?.content : []}
        highlightLoading={highlightIsPending}
      />
    </>
  );
}

export default SearchPage;
