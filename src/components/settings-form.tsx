"use client";

import { type User } from "@/server/db/schema";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsFormSchema } from "@/schema/dashboard";
import { type z } from "zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SettingsForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      nickname: user.nickname!,
      email: user.email,
      pronouns: user.pronouns!,
    },
  });

  const updateUserMutation = api.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success("更新成功");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const isSubmitting = updateUserMutation.isPending;

  const onSubmit = (data: z.infer<typeof settingsFormSchema>) => {
    updateUserMutation.mutate({
      id: user.id,
      nickname: data.nickname,
      email: data.email,
      pronouns: data.pronouns,
    });
  };

  return (
    <div className="">
      <div className="absolute top-0 h-52 w-full">
        <Image
          unoptimized
          alt="profile background"
          src="https://images.unsplash.com/photo-1560379790-d7f9dd2b6116"
          objectFit="cover"
          fill
          className="rounded-xl object-cover opacity-80 blur-sm"
          priority
        />
      </div>
      <div className="mt-40 px-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="size-28 cursor-pointer">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>点击更换头像</TooltipContent>
        </Tooltip>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
            <p className="text-sm text-muted-foreground">
              {user.name} · {user.pronouns}
            </p>
          </div>
          <div>
            <Button variant="outline">
              <Share2 className="mr-2 size-4" />
              分享名片
            </Button>
          </div>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>个人资料</CardTitle>
            <CardDescription>
              编辑你的个人资料，包括头像、昵称、邮箱等。
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => {
                    return (
                      <FormItem className="mb-4">
                        <FormLabel>昵称</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          这是大家认识你的第一印象，选一个独特的昵称吧！
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>邮箱</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        让朋友们能够方便地联系到你，保持联络很重要呢
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pronouns"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>称谓代词</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="选择一个称谓代词" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dont_specify">不指定</SelectItem>
                          <SelectItem value="they/them">they/them</SelectItem>
                          <SelectItem value="she/her">she/her</SelectItem>
                          <SelectItem value="he/him">he/him</SelectItem>
                          <SelectItem value="custom">自定义</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        帮助他人以你喜欢的方式称呼你，让交流更加贴心
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "保存中..." : "保存"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default SettingsForm;
