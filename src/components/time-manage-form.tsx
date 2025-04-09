"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { CardContent, CardFooter } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import {
  timeManagementFormSchema,
  type WeeklySchedule,
} from "@/schema/dashboard";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { times } from "@/lib/enums";

const TimeManageForm = ({ data }: { data: WeeklySchedule }) => {
  const form = useForm<WeeklySchedule>({
    resolver: zodResolver(timeManagementFormSchema),
    defaultValues: data,
  });

  const handleSubmit = (data: WeeklySchedule) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="weeklySchedule"
            render={({ field }) => {
              return (
                <>
                  {field.value.map((item,index) => (
                    <FormItem key={item.id}>
                      <div
                        className="grid grid-cols-1 items-center gap-4 md:grid-cols-3"
                        key={item.id}
                      >
                        <input
                          type="hidden"
                          value={item.id}
                          name={`id-${item.id}`}
                        />
                        <div className="flex items-center gap-x-3">
                          <FormField
                            control={form.control}
                            name={`weeklySchedule.${index}.isActive`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <p>{item.day}</p>
                        </div>
                        <FormField
                          control={form.control}
                          name={`weeklySchedule.${index}.fromTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>开始时间</FormLabel>
                              <FormControl>
                                <Select
                                  name={`fromTime-${item.id}`}
                                  defaultValue={item.fromTime}
                                  onValueChange={field.onChange}
                                  disabled={!item.isActive}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="开始时间" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {times.map((time) => (
                                        <SelectItem
                                          key={time.id}
                                          value={time.time}
                                        >
                                          {time.time}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`weeklySchedule.${index}.toTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>结束时间</FormLabel>
                              <FormControl>
                                <Select
                                  name={`toTime-${item.id}`}
                                  defaultValue={item.toTime}
                                  onValueChange={field.onChange}
                                  disabled={!item.isActive}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="结束时间" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {times.map((time) => (
                                        <SelectItem
                                          key={time.id}
                                          value={time.time}
                                        >
                                          {time.time}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </FormItem>
                  ))}
                </>
              );
            }}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">保存</Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default TimeManageForm;
