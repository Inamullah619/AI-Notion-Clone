"use client";
import * as Y from "yjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { FormEvent, use, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { FormEvent, useState, useTransition } from "react";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { Input } from "./ui/input";
import Markdown from "react-markdown";
import { BotIcon, MessageCircleCode } from "lucide-react";
import { toast } from "sonner";

const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [summery, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setQuestion(input);
    startTransition(async () => {
      try {
        const documentData = doc.get("document-store").toJSON();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chatToDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ documentData, question: input }),
          },
        );

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const { message } = await res.json();

        setInput("");
        setSummary(message);
        toast.success("Question Asked Successfully!");
      } catch (err) {
        // console.error("Error asking question:", err);
        toast.error("Failed to ask the question. Please try again.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>
          <MessageCircleCode />
          Chat To Document
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat to the Document!</DialogTitle>
          <DialogDescription>
            Ask a question and chat to the document with AI.
          </DialogDescription>
          <hr className="mt-5" />
          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>
        {summery && (
          <div className="flex max-h-96 flex-col items-start gap-2 overflow-y-scroll bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking..." : "Says"}
              </p>
            </div>
            <p>{isPending ? "Thinking..." : <Markdown>{summery}</Markdown>}</p>
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            type="text"
            placeholder="i.e. what is this about?"
            className="w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={!input || isPending}>
            {isPending ? "Asking..." : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatToDocument;
