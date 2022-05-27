export interface NotificationProps {
  title: string;
  description?: string;
  show: boolean;
  setShow: (value: boolean) => void;
}
