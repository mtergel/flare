import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import FormControl from "@/components/FormControl/FormControl";
import Input from "@/components/Input/Input";
import { definitions } from "@/utils/generated";
import { supabase } from "@/utils/supabaseClient";
import useDisclosure from "hooks/useDisclosure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditScribbleButtonProps {
  id: number;
  title: string;
  onUpdateMutation: (title: string) => void;
}

const EditScribbleButton: React.FC<EditScribbleButtonProps> = ({
  id,
  title,
  onUpdateMutation,
}) => {
  const { isOpen, setIsOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title,
    },
  });

  const onSubmit = async (data: { title: string }) => {
    const updateRes = await supabase
      .from<definitions["posts"]>("posts")
      .update(
        {
          title: data.title,
        },
        {
          returning: "minimal",
        }
      )
      .eq("id", id);

    if (updateRes.error) {
      toast.error(updateRes.error.message);
    } else {
      onUpdateMutation(data.title);
      onClose();
      toast.success("Updated!");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Edit"
      content={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-2 h-full flex flex-col"
        >
          <div className="flex-grow">
            <FormControl inValid={!!errors.title}>
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                autoComplete="off"
                autoFocus
                isFullWidth
                {...register("title", {
                  disabled: isSubmitting,
                  required: {
                    message: "A title is required",
                    value: true,
                  },
                })}
              />
              {errors.title && (
                <span className="error">{errors.title.message}</span>
              )}
            </FormControl>
            <div className="hidden sm:flex items-center justify-end mt-6 space-x-3">
              <Button isLoading={isSubmitting}>Cancel</Button>
              <Button isLoading={isSubmitting} type="submit" color="primary">
                Save
              </Button>
            </div>
          </div>

          <div className="space-y-3 sm:hidden">
            <Button isFullWidth isLoading={isSubmitting}>
              Cancel
            </Button>

            <Button
              isFullWidth
              isLoading={isSubmitting}
              type="submit"
              color="primary"
            >
              Save
            </Button>
          </div>
        </form>
      }
    >
      <Button size="sm">Edit</Button>
    </Dialog>
  );
};

export default EditScribbleButton;
