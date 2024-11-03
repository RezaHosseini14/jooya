import { Button, Modal } from "rsuite";
import { getFileSize } from "../utils/convertors";
import { shamsi } from "../utils/functions";
import SpLoader from "./global/SpLoader";
type ResultModalPropsType = {
  openModal: boolean;
  handleClose: () => void;
  loading: boolean;
  data: any;
  highlightData: any;
  highlightLoading: boolean;
};
function ResultModal({ openModal, handleClose, loading, data, highlightData, highlightLoading }: ResultModalPropsType) {
  return (
    <Modal open={openModal} onClose={handleClose} size="lg" className="text-xl">
      <Modal.Header>
        <Modal.Title>
          {data?.filename}.{data?.extension}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="min-h-96">
        {loading ? (
          <SpLoader size="lg" />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-200 p-4 rounded-lg min-h-52 shadow-lg col-span-2">
              <span className="font-bold text-lg">جزئیات فایل</span>
              <hr className="border-slate-300 pb-3" />
              <ul className="mt-4">
                {[
                  { label: "نام فایل", value: data?.filename },
                  { label: "پسوند فایل", value: data?.extension },
                  { label: "نوع محتوا", value: data?.contentType, isLtr: true },
                  { label: "حجم فایل", value: getFileSize(data?.size), isLtr: true },
                  { label: "تاریخ ایجاد", value: shamsi(data?.creationDate, "YYYY/MM/DD") },
                  { label: "تاریخ آخرین تغییر", value: shamsi(data?.lastModifiedDate, "YYYY/MM/DD") },
                  { label: "تاریخ ایجاد در دیتابیس", value: shamsi(data?.insertToDB, "YYYY/MM/DD") },
                ].map(({ label, value, isLtr }, index) => (
                  <li className="flex gap-4 mb-2" key={index}>
                    <span className="w-64 font-semibold">{label}</span>
                    <span className="flex-1 w-full truncate" dir={isLtr ? "ltr" : "rtl"}>
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-200 p-4 rounded-lg min-h-52 shadow-lg col-span-2">
              <span className="font-bold text-lg">محتوا فایل</span>
              <hr className="border-slate-300 pb-3" />
              {highlightData.length > 0 ? (
                <div className="flex flex-col divide-y divide-gray-400">
                  {highlightData.map((item: any) => (
                    <p className="leading-8 pt-2" dangerouslySetInnerHTML={{ __html: item }}></p>
                  ))}
                </div>
              ) : (
                <p>{data?.abstractContent}</p>
              )}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="primary" color="red">
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;
