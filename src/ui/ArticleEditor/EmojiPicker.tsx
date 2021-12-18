import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import useDisclosure from "hooks/useDisclosure";
import Picker from "emoji-picker-react";

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
  disabled?: boolean;
}
const EmojiPicker: React.FC<EmojiPickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const { isOpen, setIsOpen, onClose } = useDisclosure();

  return (
    <section className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            disabled={disabled}
            className="flex items-center gray-bg disabled:cursor-not-allowed w-full p-5 rounded-lg transition-shadow focus:outline-none focus:ring focus:ring-primary"
          >
            <span className="text-5xl border-r pr-4 mr-5">{value}</span>
            <div className="flex flex-col items-start text-left text-sm text-tMuted">
              <span>Select an eye catching emoji</span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={4}
          align="start"
          className="emoji-container dark:border-0"
        >
          <Picker
            disableSkinTonePicker
            onEmojiClick={(_, emojiObject) => {
              onChange(emojiObject.emoji);
              onClose();
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default EmojiPicker;
