import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { getSession } from "@/lib/session";
import TimeManageForm from "@/components/time-manage-form";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
const TimeManagementPage = async () => {
  const session = await getSession();
  const caller = createCaller(
    await createTRPCContext({
      headers: new Headers(),
    }),
  );
  const availability = await caller.availability.getAvailability({
    userId: session.user.id,
  });

  console.log(availability, "availability");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>日程安排</CardTitle>
        <CardDescription>设置可预约时段，轻松掌控会面安排</CardDescription>
      </CardHeader>
      <TimeManageForm />
    </Card>
  );
};
export default TimeManagementPage;
