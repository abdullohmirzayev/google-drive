"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { IFolderAndFile } from "@/types";
import { File, Folder } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface ListItemProps {
  item: IFolderAndFile;
}

const ListItem = ({ item }: ListItemProps) => {
  const { user } = useUser();

  return (
    <TableRow className="group cursor-pointer">
      <TableCell className="font-medium">
        <div className="flex items-center space-x-1" role="button">
          {item.size ? (
            <File className="w-4 h-4 text-blue-500" />
          ) : (
            <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  );
};

export default ListItem;
