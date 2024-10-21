import { Button, Pagination, Table, Tooltip, Whisper } from "rsuite";
import { RowDataType } from "rsuite/esm/Table";
import { getFileSize } from "../utils/convertors";

type ResultsBoxPropsType = { handleOpen: any; loading: boolean; data: any; page: number; limit: number; setPage: any; setLimit: any };

const { Cell, Column, HeaderCell } = Table;
function ResultsBox({ handleOpen, loading, data, page, limit, setPage, setLimit }: ResultsBoxPropsType) {
  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  return (
    <div className="flex-1 bg-white p-4 rounded-xl shadow-xl h-full flex flex-col gap-4">
      <Table loading={loading} fillHeight={true} data={data?.hits ? data.hits : []}>
        <Column width={60} align="center" verticalAlign="middle">
          <HeaderCell>ردیف</HeaderCell>
          <Cell>{(rowData, _rowIndex: any) => <>{page && limit && page * limit - limit + _rowIndex + 1}</>}</Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>نام فایل</HeaderCell>
          <Cell dataKey="filename" />
        </Column>

        <Column width={100}>
          <HeaderCell>پسوند</HeaderCell>
          <Cell dataKey="extension" />
        </Column>

        <Column width={100}>
          <HeaderCell>حجم</HeaderCell>
          <Cell>{(rowData: any) => <span dir="ltr">{getFileSize(rowData.size)}</span>}</Cell>
        </Column>

        <Column flexGrow={1} fullText>
          <HeaderCell>خلاصه محتوا</HeaderCell>
          <Cell style={{ padding: "6px" }}>
            {(rowData: any) => {
              if (rowData.highlightContent && rowData.highlightContent.length > 0) return <div dangerouslySetInnerHTML={{ __html: rowData.highlightContent }}></div>;
              return <>{rowData.abstractContent}</>;
            }}
          </Cell>
        </Column>

        <Column width={80} fixed="right" align="center" verticalAlign="middle">
          <HeaderCell>عملیات</HeaderCell>

          <Cell style={{ padding: "6px" }}>
            {(rowData: RowDataType) => (
              <Whisper placement="top" speaker={<Tooltip>جزئیات</Tooltip>}>
                <Button classPrefix="decoration-transparent text-blue-500 flex items-center justify-center" appearance="link" onClick={() => handleOpen(rowData.id)}>
                  <i className="ki-solid ki-eye text-xl"></i>
                </Button>
              </Whisper>
            )}
          </Cell>
        </Column>
      </Table>
      <div>
        <Pagination prev next ellipsis boundaryLinks maxButtons={5} size="xs" layout={["total", "-", "limit", "|", "pager"]} total={data?.total} limitOptions={[10, 30]} limit={limit} activePage={page} onChangePage={setPage} onChangeLimit={handleChangeLimit} />
      </div>
    </div>
  );
}

export default ResultsBox;
