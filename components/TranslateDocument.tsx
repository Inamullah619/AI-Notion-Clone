"use client";

import * as Y from "yjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransition, useState, FormEvent } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

type Languages =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Languages[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleTranslate = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      console.log(documentData); // Debugging line

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              documentData,
              targetLang: language,
            }),
          },
        );

        if (res.ok) {
          const { translated_text } = await res.json();
          setSummary(translated_text);
          toast.success("Translated Summary Successfully!");
        } else {
          const { error } = await res.json();
          toast.error(error || "Failed to translate the document.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a Language and AI will translate a summary of the document in
            the selected language.
          </DialogDescription>
          <hr className="mt-5" />
        </DialogHeader>
        {summary && (
          <div className="flex max-h-96 flex-col items-start gap-2 overflow-y-scroll bg-gray-100 p-5">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">GPT Says</p>
            </div>
            <Markdown>{summary}</Markdown>
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleTranslate}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
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
