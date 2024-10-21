import { Button, Drawer, Form, Schema, SelectPicker, TagInput } from "rsuite";
import TextField from "./global/fields/TextField";
import SelectField from "./global/fields/SelectField";
import DateField from "./global/fields/DateField";
import { DateObject } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { RESET_FILTERS, SET_ADDITIONALDATA_ITEM, SET_FORMVALUE_ITEM } from "../redux/slices/search.filter.slice";
import { RootState } from "../redux/store";
import TagField from "./global/fields/TagField";
import { ext } from "../jsons/ext";
import { mimeTypesList } from "../jsons/mimeTypesList";
import TagSelectField from "./global/fields/TagSelectField";
import { useEffect, useState } from "react";
import { sizeList } from "../jsons/sizeList";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  startCreationDate: StringType(),
  endCreationDate: StringType().isRequired("تاریخ پایان باید مشخص شود."),
  size: NumberType().min(0, "حجم فایل باید بزرگتر یا مساوی صفر باشد."),
  startLastModifiedDate: StringType().isRequired("تاریخ شروع آخرین تغییر باید مشخص شود."),
  endLastModifiedDate: StringType(),
  sentence: StringType(),
  must: StringType(),
  mustNot: StringType(),
  should: StringType(),
  extension: StringType(),
  contentType: StringType(),
});

function SearchFilter({ open, setOpen, handleClick }: { open: boolean; setOpen: any; handleClick: (e: any) => void }) {
  const { formValue, additionalData } = useSelector((state: RootState) => state.searchFilter);
  const dispatch = useDispatch();

  const handleCreationDate = (dateObjects: DateObject[] | null) => {
    if (dateObjects && dateObjects.length > 1) {
      let startCreationDate: number = dateObjects[0].valueOf();
      let endCreationDate: number = dateObjects[1].valueOf();
      if (dateObjects[0].valueOf() > dateObjects[1].valueOf()) {
        startCreationDate = dateObjects[1].valueOf();
        endCreationDate = dateObjects[0].valueOf();
      }
      dispatch(SET_FORMVALUE_ITEM({ key: "startCreationDate", value: startCreationDate }));
      dispatch(SET_FORMVALUE_ITEM({ key: "endCreationDate", value: endCreationDate }));
    }
  };

  const handleClearFilter = () => {
    dispatch(RESET_FILTERS());
  };
  // const handleStartCreationDate = (dateObjects: DateObject | null) => {
  //   if (dateObjects) {
  //     let startCreationDate: number = dateObjects?.valueOf();
  //     dispatch(SET_FORMVALUE_ITEM({ key: "startCreationDate", value: startCreationDate }));
  //   }
  // };
  // const handleEndCreationDate = (dateObjects: DateObject | null) => {
  //   if (dateObjects) {
  //     let endCreationDate: number = dateObjects?.valueOf();
  //     dispatch(SET_FORMVALUE_ITEM({ key: "endCreationDate", value: endCreationDate }));
  //   }
  // };

  const handleClear = () => {
    dispatch(SET_FORMVALUE_ITEM({ key: "startCreationDate", value: null }));
    dispatch(SET_FORMVALUE_ITEM({ key: "endCreationDate", value: null }));
  };

  useEffect(() => {
    dispatch(SET_FORMVALUE_ITEM({ key: "size", value: additionalData.cSize * parseInt(additionalData.sizeInput) }));
  }, [additionalData.cSize, additionalData.sizeInput]);

  return (
    <Drawer open={open} placement="left" size="sm" onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>جستجوی پیشرفته</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body className="flex flex-col justify-between overflow-y-hidden">
        <Form model={model}>
          <div className="grid grid-cols-2 gap-4">
            <DateField
              name="asfsaf"
              title="تاریخ ایجاد"
              value={[formValue.startCreationDate, formValue.endCreationDate]}
              onChange={handleCreationDate}
              onClear={handleClear}
            />
            {/* <DateField name="asfsaf" title="تاریخ پایان ایجاد" value={formValue.endCreationDate} onChange={handleEndCreationDate} /> */}
            <div className="flex gap-4 items-end">
              <TextField
                name="sizeInput"
                title="حجم فایل"
                type="number"
                value={additionalData.sizeInput}
                onChange={(input) => dispatch(SET_ADDITIONALDATA_ITEM({ key: "sizeInput", value: input }))}
              />
              <SelectPicker
                className="w-32"
                style={{ height: "2.5rem" }}
                data={sizeList}
                value={additionalData.cSize}
                cleanable={false}
                searchable={false}
                onChange={(input) => dispatch(SET_ADDITIONALDATA_ITEM({ key: "cSize", value: input }))}
              />
            </div>

            <TagField
              name="sentence"
              title="شامل تمامی عبارات"
              value={formValue.sentence}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "sentence", value: input }))}
            />

            <TagField
              name="should"
              title="شامل هر یک از کلمات"
              value={formValue.should}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "should", value: input }))}
              trigger={["Enter", "Space"]}
            />

            <TagField
              name="mustNot"
              title="فاقد هیچ یک از کلمات"
              value={formValue.mustNot}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "mustNot", value: input }))}
              trigger={["Enter", "Space"]}
            />

            <TagField
              name="must"
              title="شامل تمامی کلمات"
              value={formValue.must}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "must", value: input }))}
              trigger={["Enter", "Space"]}
            />

            {/* <TagField
              name="extension"
              title="پسوند"
              value={formValue?.extension}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "extension", value: input }))}
            /> */}

            <TagSelectField
              name="extension"
              title="پسوند"
              // value={formValue?.extension?.length > 0 ? formValue.extension : null}
              value={formValue?.extension}
              data={ext}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "extension", value: input }))}
              // onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "extension", value: input ? input : null }))}
              creatable={true}
            />

            <TagSelectField
              name="contentType"
              title="نوع محتوا"
              // value={formValue?.extension?.length > 0 ? formValue.extension : null}
              value={formValue?.contentType}
              data={mimeTypesList}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "contentType", value: input }))}
              // onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "extension", value: input ? input : null }))}
              creatable={true}
            />

            {/* <SelectField
              name="contentType"
              title="نوع محتوا"
              value={formValue?.contentType?.length > 0 ? formValue?.contentType[0] : null}
              data={mimeTypesList}
              virtualized={true}
              onChange={(input) => dispatch(SET_FORMVALUE_ITEM({ key: "contentType", value: input ? [input] : null }))}
            /> */}
          </div>
        </Form>
        <div className="flex items-center gap-4">
          <Button
            className="flex items-center gap-2 text-xl flex-1"
            appearance="primary"
            onClick={(e) => {
              handleClick(e);
              setOpen(false);
            }}
          >
            جستجو
            <i className="ki-outline ki-magnifier "></i>
          </Button>
          <Button className="flex items-center gap-2 text-xl" color="red" appearance="primary" onClick={handleClearFilter}>
            <span>حذف فیلتر</span>
            <i className="ki-outline ki-trash"></i>
          </Button>
        </div>
      </Drawer.Body>
    </Drawer>
  );
}

export default SearchFilter;
