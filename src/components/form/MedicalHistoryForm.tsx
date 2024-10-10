"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "../ui/label";
import { useState } from "react";
import { useUserHealthStore } from "@/store/user-health-store";
import {
  GenerateContentResponse,
  predictDiseaseWithAI,
} from "@/services/disease-prediction-ai-service";
import { HealthAnalysis } from "@/types/HealthPredictAI";
import { demographicsPayload } from "@/lib/validators/demographicsSchema";
import { lifestylePayload } from "@/lib/validators/lifestyleSchema";

interface Props {
  onClick: () => void;
}

const items = [
  { id: "demam", label: "Demam" },
  { id: "batuk", label: "Batuk" },
  { id: "sakitKepala", label: "Sakit Kepala" },
  { id: "pusing", label: "Pusing" },
  { id: "mual", label: "Mual" },
  { id: "lemas", label: "Lemas" },
  { id: "nyeriSendi", label: "Nyeri Sendi" },
  { id: "pilek", label: "Pilek" },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const MedicalHistoryFormCheckbox: React.FC<Props> = (props) => {
  const { updateMedicalHistory, updateGenerateContentResponse } =
    useUserHealthStore();
  const { userDetails, medicalHistory, userLifestyle } = useUserHealthStore();

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["demam"],
    },
  });

  const predictDisease = async () => {
    try {
      const response = await predictDiseaseWithAI({
        personalData: userDetails?.personalData as demographicsPayload,
        medicalHistory,
        lifestyleFactors: userLifestyle?.lifestyleFactors as lifestylePayload,
      });
      updateGenerateContentResponse(response);
    } catch (err) {
      console.error(err);
    }
  };
  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateMedicalHistory(data.items);
    predictDisease();
    props.onClick();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem className="w-full">
              <AnimatePresence>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FormItem className="flex border-2 py-2 px-4 rounded-lg">
                        <div className="flex items-center space-x-2 w-full">
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const updatedItems = checked
                                  ? [...field.value, item.id]
                                  : field.value.filter(
                                      (value) => value !== item.id
                                    );
                                form.setValue("items", updatedItems);
                                setCheckedItems((prev) => ({
                                  ...prev,
                                  [item.id]: !!checked,
                                }));
                              }}
                              className="peer h-6 w-6 shrink-0 rounded-sm border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-gray-200 data-[state=checked]:bg-primary"
                            >
                              <motion.div
                                className="h-5 w-5 rounded-sm bg-white shadow-sm"
                                initial={false}
                                animate={{
                                  x: checkedItems[item.id] ? 16 : 0,
                                  scale: checkedItems[item.id] ? 0.8 : 1,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30,
                                }}
                              />
                            </Checkbox>
                          </FormControl>
                          <Label
                            htmlFor={`ios-checkbox-${item.label}`}
                            className="flex-grow"
                          >
                            {item.label}
                          </Label>
                        </div>
                      </FormItem>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};
