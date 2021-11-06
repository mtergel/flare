import { useState, useCallback } from "react";
const useDisclosure = (isOpenDefault: boolean = false) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, onOpen, onClose, toggle, setIsOpen };
};

export default useDisclosure;
