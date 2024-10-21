function SearchBox({ fill, search, searchFilter, handleClick, onInputChange, onInputKeyDown }: any) {
  return (
    <div className={`fixed right-1/2 translate-x-1/2 ${fill ? "top-8" : "top-1/2 -translate-y-1/2"} transition-all duration-500`}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-mainColorDark">جویا</h1>
        <form className="w-96 h-12 rounded-lg overflow-hidden border border-mainColor relative shadow-2xl">
          <input type="text" className="w-full h-full bg-white focus:outline-none pe-10 ps-10 text-xl" value={search} onChange={(e: any) => onInputChange(e.target.value)} onKeyDown={onInputKeyDown} />
          <button type="button" onClick={searchFilter}>
            <i className="ki-outline ki-setting text-mainColor font-bold text-2xl absolute right-2 top-1/2 -translate-y-1/2"></i>
          </button>
          <button type="button" onClick={handleClick}>
            <i className="ki-outline ki-magnifier text-mainColor font-bold text-2xl absolute left-2 top-1/2 -translate-y-1/2"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
