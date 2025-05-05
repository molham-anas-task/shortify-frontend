export interface Url {
  id: string;
  shortUrl: string;
  shortCode: string;
  originalUrl: string;
  isSaved?: boolean;
  clickCount?: number;
}

export interface FormData {
  originalUrl: string;
}
export interface CardProps {
  link: Url;
  handleSave?: any;
  handleUnSave?: any;
  handledeleteUrl?: any;
  isTrash?: boolean;
  isClicks?: boolean;
  isSavePage?: boolean;
}
