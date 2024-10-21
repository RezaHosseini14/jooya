import { researchers } from "../jsons/Researchers";

function ResultSidebar({ data }: { data: any }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl w-96 h-full  overflow-y-auto">
      {data?.hits?.length > 0 ? (
        <ul className="space-y-4 ">
          {researchers.map((person, index) => (
            <li key={index} className="p-4 bg-slate-100 rounded-lg shadow-md">
              <strong>نام محقق:</strong> {person.name}
              <br />
              <strong>تعداد دفعاتی که نام آمده:</strong> {person.appearances}
              <br />
              <strong>تعداد پیداشده از مقاله ها:</strong> {person.fileUsage}
              <ul className="mt-2 space-y-1">
                <strong>فایل‌های مرتبط:</strong>
                {person.relatedFiles.map((file, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{file.filename}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid place-content-center w-full h-full">داده ایی پیدا نشد</div>
      )}
    </div>
  );
}

export default ResultSidebar;
