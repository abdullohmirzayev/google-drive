import { ElementRef, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { defineImageAndFile } from "@/lib/utils";
import { db } from "@/lib/firebase";

import { IFolderAndFile } from "@/types";

import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { File, Paperclip, Save, X } from "lucide-react";

import { Avatar, AvatarImage } from "../ui/avatar";
import ListAction from "../shared/list-action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SuggestCardProps {
  item: IFolderAndFile;
}

const SuggestCard = ({ item }: SuggestCardProps) => {
  const [isEditing, setisEditing] = useState(false);
  const [value, setvalue] = useState(item.name);

  const inputRef = useRef<ElementRef<"input">>(null);
  const { refresh } = useRouter();
  const { user } = useUser();

  const onStartEditing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setisEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, value.length);
    }, 0);
  };

  const onSave = () => {
    const type = item.size ? "files" : "folders";

    const ref = doc(db, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      name: value.length ? value : "Untitled",
    }).then(() => {
      setisEditing(false);
      refresh();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Saved!",
      error: "Failed to save.",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    } else if (e.key === "Escape") {
      setisEditing(false);
    }
  };

  return (
    <div className="max-w-[300px] max-h-[400px] h-[210px] flex flex-col rounded-md shadow-lg p-4 bg-secondary group">
      {isEditing ? (
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            ref={inputRef}
            onKeyDown={onKeyDown}
          />

          <div className="absolute right-0 top-0 h-full flex items-center space-x-1">
            <Button
              size={"sm"}
              variant={"outline"}
              className="h-full"
              onClick={onSave}
            >
              <Save className="w-4 h-4" />
            </Button>

            <Button
              size={"sm"}
              variant={"outline"}
              className="h-full"
              onClick={() => setisEditing(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center space-x-2"
          role="button"
          onDoubleClick={onStartEditing}
        >
          <Paperclip className="w-4 h-4 text-rose-500" />
          <span className="text-sm opacity-70">{item.name}</span>
        </div>
      )}
      <div className="relative h-[70%] w-full bg-white dark:bg-black mt-2 rounded-md">
        {defineImageAndFile(item.type) === "file" ? (
          <div className="flex h-full items-center justify-center">
            <File className="w-16 h-16" strokeWidth={1} />
          </div>
        ) : (
          <Image
            fill
            src={item.image}
            alt={item.name}
            className="object-cover"
          />
        )}
      </div>

      <div className="flex items-center w-full justify-between space-x-2 mt-4">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="opacity-75">me</span>
        </div>

        <ListAction item={item} onStartEditing={onStartEditing} />
      </div>
    </div>
  );
};

export default SuggestCard;
