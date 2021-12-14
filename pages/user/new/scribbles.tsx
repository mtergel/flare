import Container from "@/components/Container/Container";
import Spinner from "@/components/Spinner/Spinner";
import { getRandomEmoji } from "@/utils/const";
import { NextPageWithLayout } from "@/utils/types";
import { useAuth } from "context/auth";
import { useForm } from "react-hook-form";
import Layout from "ui/Layout/Layout";
import { GiStabbedNote } from "@react-icons/all-files/gi/GiStabbedNote";

const NewScribble: NextPageWithLayout = () => {
  const { user, loading } = useAuth();

  const {} = useForm({
    defaultValues: {
      title: "",
      emoji: getRandomEmoji(),
    },
  });

  if (loading) {
    return (
      <div className="h-full bg-paper border-t">
        <div className="pt-20 flex items-center justify-center">
          <Spinner className="text-primary" />
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="h-full bg-paper border-t">
        <Container className="pt-20">
          <div className="text-center flex flex-col">
            <h1 className="text-3xl font-bold">New scribble</h1>
            <div className="flex items-center justify-center mt-8 mb-4">
              <GiStabbedNote className="h-20 w-20  text-primary-500 dark:text-primary-300" />
            </div>
            <p className="text-tMuted text-sm">
              In a "scribble" you can summarize your knowledge in a thread
              format. It can be used not only for recording development but also
              for sharing info and exchanging opinions.
            </p>
          </div>
        </Container>
      </div>
    );
  } else {
    return null;
  }
};

NewScribble.getLayout = function getLayout(page) {
  return <Layout hideFooter>{page}</Layout>;
};
export default NewScribble;
