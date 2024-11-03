import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type SearchFilterFormValueDataModel = {
  should: string[];
  mustNot: string[];
  must: string[];
  extension: string[];
  contentType: string[];
  sentence: string[];
  startCreationDate: null | number;
  endCreationDate: null | number;
  size: null | number;
};
type SearchFilterPrevFormValueDataModel = {
  should: string[];
  mustNot: string[];
  must: string[];
  sentence: string[];
};
type SearchFilterAdditionalDataeDataModel = {
  cSize: number;
  sizeInput: string;
};
type SearchFilterReduxSliceType = {
  formValue: SearchFilterFormValueDataModel;
  prevFormValue: SearchFilterPrevFormValueDataModel;
  additionalData: SearchFilterAdditionalDataeDataModel;
};

const initialState: SearchFilterReduxSliceType = {
  formValue: {
    should: [],
    mustNot: [],
    must: [],
    extension: [],
    contentType: [],
    sentence: [],
    startCreationDate: null,
    endCreationDate: null,
    size: null,
  },
  prevFormValue: {
    should: [],
    mustNot: [],
    must: [],
    sentence: [],
  },
  additionalData: {
    cSize: 1000000,
    sizeInput: "",
  },
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    SET_FORMVALUE: (state, action: PayloadAction<any>) => {
      state.formValue = action.payload;
    },
    SET_FORMVALUE_ITEM: (state, action: PayloadAction<{ key: keyof SearchFilterFormValueDataModel; value: null | number | string[] | string }>) => {
      //@ts-ignore
      state.formValue[action.payload.key] = action.payload.value;
    },
    SET_ADDITIONALDATA_ITEM: (state, action: PayloadAction<{ key: keyof SearchFilterAdditionalDataeDataModel; value: null | number | string }>) => {
      //@ts-ignore
      state.additionalData[action.payload.key] = action.payload.value;
    },
    RESET_FILTERS: (state) => {
      state.formValue = initialState.formValue;
      state.additionalData = initialState.additionalData;
    },
    SET_PREV_FORMVALUE: (state, action: PayloadAction<any>) => {
      state.prevFormValue = action.payload;
    },
  },
});

export const areFiltersApplied = (state: SearchFilterReduxSliceType): boolean => {
  const { formValue } = state;

  return (
    (formValue.should.length > 0 && formValue.should.some((item) => item.length > 1)) ||
    formValue.mustNot.length > 0 ||
    formValue.must.length > 0 ||
    formValue.extension.length > 0 ||
    formValue.contentType.length > 0 ||
    formValue.sentence.length > 0 ||
    formValue.startCreationDate !== null ||
    formValue.endCreationDate !== null ||
    formValue.size !== null
  );
};

export const { SET_FORMVALUE, SET_FORMVALUE_ITEM, SET_ADDITIONALDATA_ITEM, RESET_FILTERS, SET_PREV_FORMVALUE } = searchFilterSlice.actions;

export default searchFilterSlice.reducer;
