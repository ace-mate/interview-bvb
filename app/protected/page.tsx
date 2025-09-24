import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitFeedback } from "../actions";
import { Button } from "@/components/ui/button";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        Hello World
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={submitFeedback}>
            <DialogHeader>
              <DialogTitle>Feedback</DialogTitle>
              <DialogDescription>
                Please give your valuable feedback here!!
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Email</Label>
                <Input
                  id="name-1"
                  name="email"
                  defaultValue="brgv95@gmail.com"
                />
              </div>
              #TODO later for dropdown
              <div className="grid gap-3">
                <Label htmlFor="username-1">Feedback</Label>
                <Input
                  id="username-1"
                  type="text"
                  name="feedback"
                  defaultValue="..."
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
