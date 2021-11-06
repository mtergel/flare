import Button from "@/components/Button/Button";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="p-6 flex flex-col space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="sm">Add new</Button>
        <Button>Add new</Button>
        <Button size="lg">Add new</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="primary">Add new</Button>
        <Button variant="outline" color="primary">
          Add new
        </Button>
        <Button variant="ghost" color="primary">
          Add new
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Button color="danger">Add new</Button>
        <Button variant="outline" color="danger">
          Add new
        </Button>
        <Button variant="ghost" color="danger">
          Add new
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button disabled>Add new</Button>
        <Button variant="outline" isLoading>
          Add new
        </Button>
        <Button variant="ghost" loadingText="Loading" isLoading>
          Add new
        </Button>
      </div>
    </div>
  );
};

export default Home;
