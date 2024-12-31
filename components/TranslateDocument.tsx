"use client";
import * as Y from "yjs";
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
import { Button } from "./ui/button";
import { useTransition, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Languages =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "germen"
  | "chinese"
  | "arabic"
  | "hindi"
  | "urdu"
  | "russian"
  | "japanese";

const language: Languages[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "germen",
  "chinese",
  "arabic",
  "hindi",
  "urdu",
  "russian",
  "japanese",
];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [summer, setSummer] = useState("");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState<string>("");
  const [isPending, startTransition] = useState();

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {});
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User to collaborate!</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
          </Select>
          <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating" : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TranslateDocument;
