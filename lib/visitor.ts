import { v4 as uuidv4 } from "uuid";

export function getVisitorId() {
  if (typeof window === "undefined") return null;
  let id = localStorage.getItem("affinote_visitor_id");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("affinote_visitor_id", id);
  }
  return id;
}
