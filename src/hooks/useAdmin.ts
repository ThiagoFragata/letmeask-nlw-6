import { useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

export function useAdmin() {

  async function handleGetAuthorId() {
    const roomRef = database.ref("rooms").get();
  }

  const console = handleGetAuthorId
  return console;
}