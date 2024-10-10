import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { demographicsSchema } from "@/lib/validators/demographicsSchema";
import { useUserHealthStore } from "@/store/user-health-store";
type Props = {
  onClick: () => void;
};

export const UserDetailForm: React.FC<Props> = (props) => {
  const { updateUserDetails } = useUserHealthStore();
  const form = useForm<z.infer<typeof demographicsSchema>>({
    resolver: zodResolver(demographicsSchema),
    defaultValues: {
      beratBadan: "",
      tinggiBadan: "",
      jenisKelamin: "Laki-Laki",
      usia: "",
    },
  });

  const onSubmit = async (data: any) => {
    updateUserDetails({ personalData: data });
    props.onClick();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="gap-x-4 grid grid-cols-1 sm:grid-cols-2 ">
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="beratBadan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Berat Badan</FormLabel>
                  <div className="flex items-center w-full rounded-xl relative">
                    <FormControl>
                      <Input
                        inputMode="decimal"
                        maxLength={1}
                        type="number"
                        placeholder="65.2"
                        step="0.01"
                        pattern="[0-9]+([\.][0-9]+)?"
                        required
                        min="1"
                        id="decimal_number"
                        {...field}
                      />
                    </FormControl>
                    <span className="absolute right-3 font-bold text-muted">
                      KG
                    </span>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jenisKelamin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Pilih Jenis Kelamin Anda"
                          className="w-full"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Jenis Kelamin</SelectLabel>
                        <SelectItem value="Laki-Laki">Laki - Laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="tinggiBadan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tinggi Badan</FormLabel>
                  <div className="flex items-center w-full rounded-xl relative">
                    <FormControl>
                      <Input
                        inputMode="decimal"
                        maxLength={1}
                        type="number"
                        placeholder="172.12"
                        step="0.01"
                        pattern="[0-9]+([\.][0-9]+)?"
                        required
                        min="2"
                        id="decimal_number"
                        {...field}
                      />
                    </FormControl>
                    <span className="absolute right-3 font-bold text-muted">
                      CM
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usia</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      maxLength={1}
                      type="number"
                      placeholder="17"
                      pattern="[0-9]+([\.][0-9]+)?"
                      required
                      id="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="mt-5 w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};
