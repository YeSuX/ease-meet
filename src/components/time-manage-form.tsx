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

const defaultValues: WeeklySchedule = {
  weeklySchedule: [
    {
      fromTime: "08:00",
      toTime: "18:00",
      isActive: true,
      dayName: "周一",
      dayIndex: 0,
    }, // 周一
    {
      fromTime: "08:00",
      toTime: "18:00",
      isActive: true,
      dayName: "周二",
      dayIndex: 1,
    }, // 周二
    {
      fromTime: "08:00",
      toTime: "18:00",
      isActive: true,
      dayName: "周三",
      dayIndex: 2,
    }, // 周三
    {
      fromTime: "08:00",
      toTime: "18:00",
      isActive: true,
      dayName: "周四",
      dayIndex: 3,
    }, // 周四
    {
      fromTime: "08:00",
      toTime: "18:00",
      isActive: true,
      dayName: "周五",
      dayIndex: 4,
    }, // 周五
    {
      fromTime: "08:00",
      toTime: "18:00",
      isActive: true,
      dayName: "周六",
      dayIndex: 5,
    }, // 周六
    {
      fromTime: "08:00",
      toTime: "18:00",
      isActive: true,
      dayName: "周日",
      dayIndex: 6,
    }, // 周日
  ],
};

const TimeManageForm = () => {
  const form = useForm<WeeklySchedule>({
    resolver: zodResolver(timeManagementFormSchema),
    defaultValues,
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
              console.log(field, "field");
              return (
                <>
                  {field.value.map((item) => (
                    <FormItem key={item.dayIndex}>
                      <div
                        className="grid grid-cols-1 items-center gap-4 md:grid-cols-3"
                        key={item.dayIndex}
                      >
                        <input
                          type="hidden"
                          value={item.dayIndex}
                          name={`dayIndex-${item.dayIndex}`}
                        />
                        <div className="flex items-center gap-x-3">
                          <FormField
                            control={form.control}
                            name={`weeklySchedule.${item.dayIndex}.isActive`}
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
                          <p>{item.dayName}</p>
                        </div>
                        <FormField
                          control={form.control}
                          name={`weeklySchedule.${item.dayIndex}.fromTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>开始时间</FormLabel>
                              <FormControl>
                                <Select
                                  name={`fromTime-${item.dayIndex}`}
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
                          name={`weeklySchedule.${item.dayIndex}.toTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>结束时间</FormLabel>
                              <FormControl>
                                <Select
                                  name={`toTime-${item.dayIndex}`}
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
