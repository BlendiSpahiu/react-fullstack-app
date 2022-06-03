export interface ModalProps {
  open: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  publish?: boolean;
  setOpen: (value: boolean) => void;
  onClick: () => void;
}
