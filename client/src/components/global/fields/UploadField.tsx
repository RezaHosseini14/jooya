import { Form, Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";

type UploadFieldType = {
  title: string;
  name: string;
  handleImageChange: (fileList: FileType[]) => void;
};

function UploadField({ title, name, handleImageChange }: UploadFieldType) {
  return (
    <Form.Group className="xl:col-span-4 lg:col-span-3 xs:col-span-2 col-span-1">
      <Uploader autoUpload={false} onChange={handleImageChange} draggable multiple listType="picture-text" accept="image/*" name={name} action="">
        <div
          style={{
            display: "grid",
            placeContent: "center",
            padding: "3rem 1rem",
            border: "1px solid var(--spGreen)",
            borderRadius: ".5rem",
            width: "100%",
            cursor: "pointer",
          }}
        >
          <span className="font-bold text-xl text-spGreen">{title}</span>
        </div>
      </Uploader>
    </Form.Group>
  );
}

export default UploadField;
