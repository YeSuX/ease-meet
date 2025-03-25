import SettingsForm from "@/components/settings-form";
import { getSession } from "@/lib/session";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { notFound } from "next/navigation";

const SettingsPage = async () => {
  const session = await getSession();
  const caller = createCaller(
    await createTRPCContext({
      headers: new Headers(),
    }),
  );
  const user = await caller.user.getUser({ id: session.user.id });

  if (!user) {
    return notFound();
  }

  console.log(user);

  return <SettingsForm user={user} />;
};
export default SettingsPage;
