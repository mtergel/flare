import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import { defaultEmojis } from "@/utils/const";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import useDisclosure from "hooks/useDisclosure";
import { useTheme } from "next-themes";
interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}
const EmojiPicker: React.FC<EmojiPickerProps> = ({ value, onChange }) => {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const { resolvedTheme } = useTheme();

  let theme = resolvedTheme === "system" ? "auto" : resolvedTheme;

  return (
    <section className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gray-bg w-full p-5 rounded-lg">
            <span className="text-5xl border-r pr-4 mr-5">{value}</span>
            <div className="flex flex-col items-start text-left text-sm text-gray-600">
              <span>Select an eye catching emoji</span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={4}
          align="start"
          className="dark:border-0"
        >
          <Picker
            color={"#3EA8FF"}
            recent={defaultEmojis}
            theme={theme as any}
            showPreview={false}
            showSkinTones={false}
            exclude={["flags", "symbols"]}
            onSelect={(data) => {
              // @ts-ignore
              onChange(data.native);
              onClose();
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default EmojiPicker;
