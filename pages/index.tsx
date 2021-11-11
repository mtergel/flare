import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
  DropdownMenuTrigger,
} from "@/components/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import Layout from "ui/Layout/Layout";
import { NextPageWithLayout } from "utils/types";
import { FiLayers } from "@react-icons/all-files/fi/FiLayers";
import { FiPenTool } from "@react-icons/all-files/fi/FiPenTool";
import FormControl from "@/components/FormControl/FormControl";
import Input from "@/components/Input/Input";
import Link from "next/link";
import useDisclosure from "hooks/useDisclosure";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto py-4 px-4">
        <CreateNewPostButton />
      </div>
    </>
  );
};

const CreateNewPostButton: React.FC<{}> = () => {
  const { isOpen, setIsOpen, onClose } = useDisclosure();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button color="primary">Add new</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={4}>
        <Link href={`/new`} passHref>
          <DropdownMenuItem asChild>
            <a onClick={onClose}>
              <DropdownMenuLeftSlot>
                <FiPenTool />
              </DropdownMenuLeftSlot>
              Article
            </a>
          </DropdownMenuItem>
        </Link>
        <Dialog
          title="Add notes"
          description="Enter your notes title"
          content={<NotesForm />}
        >
          <DropdownMenuItem>
            <DropdownMenuLeftSlot>
              <FiLayers />
            </DropdownMenuLeftSlot>
            Notes
          </DropdownMenuItem>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NotesForm: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: { title: string }) => {
    try {
    } catch (error) {}
  };

  return (
    <form>
      <FormControl inValid={!!errors.title}>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          autoComplete="off"
          isFullWidth
          {...register("title", {
            disabled: isSubmitting,
            required: {
              message: "A title is required",
              value: true,
            },
            maxLength: {
              message: "Maximum length can be up to 50 characters",
              value: 50,
            },
          })}
        />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </FormControl>
    </form>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
