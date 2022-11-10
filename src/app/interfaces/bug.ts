import { BugComment } from "./bug-comment";

export interface Bug {
  id: number,
  title: string,
  description: string,
  priority: number,
  reporter: string,
  status: string,
  created: string,
  comments: BugComment[]
}
