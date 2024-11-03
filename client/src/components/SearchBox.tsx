import { areFiltersApplied } from "../redux/slices/search.filter.slice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function SearchBox({ fill, search, searchFilter, handleClick, onInputChange, onInputKeyDown }: any) {
  const filtersApplied = useSelector((state: RootState) => areFiltersApplied(state.searchFilter));
  return (
    <div className={`fixed right-1/2 translate-x-1/2 ${fill ? "top-8" : "top-1/2 -translate-y-1/2"} transition-all duration-500`}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-mainColorDark">جویا</h1>
        <form className="w-96 h-12 rounded-lg overflow-hidden border border-mainColor relative shadow-2xl">
          <input
            type="text"
            className="w-full h-full bg-white focus:outline-none pe-10 ps-10 text-xl"
            value={search}
            onChange={(e: any) => onInputChange(e.target.value)}
            onKeyDown={onInputKeyDown}
          />

          <div className=" absolute right-2 top-1/2 -translate-y-1/2 h-[1.4rem]">
            <button className="relative" type="button" onClick={searchFilter}>
              {filtersApplied ? <div className="absolute bg-red-500 rounded-xl size-2 top-0 right-0"></div> : <></>}

              <i className="ki-outline ki-setting text-mainColor font-bold text-2xl"></i>
            </button>
          </div>

          <button type="button" onClick={handleClick}>
            <i className="ki-outline ki-magnifier text-mainColor font-bold text-2xl absolute left-2 top-1/2 -translate-y-1/2"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
