import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <Button onClick={() => signOut()}>signOut</Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>signin</Button>
    </>
  );
}
