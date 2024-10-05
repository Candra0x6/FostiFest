import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IconType } from "react-icons/lib";

type Props = {
  title: string;
  description: string;
  headerIcon: IconType;
  footerIcon: IconType;
  onClick: () => void;
};

export const AiChoiseCard: React.FC<Props> = (props) => {
  return (
    <Card
      onClick={props.onClick}
      className="flex items-center px-5 py-6 justify-between gap-x-5 group hover:bg-primary/[0.01] hover:border-primary hover:scale-[1.03] hover:shadow-primary/10 shadow-xl transition-all duration-300 ease-in-out cursor-pointer "
    >
      <CardHeader className="flex p-0">
        {
          <props.headerIcon className="text-4xl group-hover:text-primary transition-colors duration-300 ease-in-out" />
        }{" "}
      </CardHeader>
      <CardContent className="p-0 w-full ">
        <CardTitle className="text-xl ">{props.title}</CardTitle>
        <CardDescription className="text-sm">
          {props.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-0">
        {
          <props.footerIcon className="text-2xl  group-hover:text-3xl group-hover:text-primary transition-all duration-300 ease-in-out" />
        }
      </CardFooter>
    </Card>
  );
};
