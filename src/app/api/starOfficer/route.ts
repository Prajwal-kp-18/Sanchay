import { db } from "@/lib/db";
import { auth } from "../../../../auth";

export async function GET(){
    const session = await auth();
  const user = session?.user.govId;
  const output= await db.user.findMany({
    where: {
        govId:{
            not:user,
        }
    },
    orderBy: { stars: 'desc' },
  })
  console.log(output);
  return new Response(JSON.stringify(output), {
    headers: { "Content-Type": "application/json" },
  });
}