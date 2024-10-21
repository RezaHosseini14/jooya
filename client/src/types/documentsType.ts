export type DocumentType = {
  id: string;
  index: string;
  filename: string;
  extension: string;
  filePath: string;
  size: number;
  creationDate: number;
  lastModifiedDate: number;
  abstractContent: string;
  highlightContent: string;
  metadataDetail: string;
  contentType: string;
  encoding: string;
  author: string | null;
  title: string | null;
  subject: string | null;
  isRead: boolean | null; // Allow isRead to be null
  hasPassword: boolean; // This should be a boolean
  language: string; // This should be a string, assuming it's not null
  insertToDB: number;
};
