import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function AppliedJobs() {

  const users = [
    {
      handle: "u001",
      name: "Alice Johnson",
      email: "alice@example.com",
      access: "Admin",
    },
    {
      handle: "u002",
      name: "Bob Smith",
      email: "bob@example.com",
      access: "Editor",
    },
    {
      handle: "u003",
      name: "Charlie Davis",
      email: "charlie@example.com",
      access: "Viewer",
    },
  ];

  return (
    <TableContainer component={Paper} className="shadow-md rounded-lg">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="font-bold text-sm">Company Name</TableCell>
            <TableCell className="font-bold text-sm">Job Title</TableCell>
            <TableCell className="font-bold text-sm">Applied Date</TableCell>
            <TableCell className="font-bold text-sm">Job Source</TableCell>
            <TableCell className="font-bold text-sm">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.handle}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-zinc-500">{user.access}</TableCell>
              <TableCell className="text-zinc-500">{user.access}</TableCell>
              <TableCell className="text-zinc-500"> <input type="radio"/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AppliedJobs;
