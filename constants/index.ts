import { SidebarLink } from "@/types";
import exp from "constants";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const TOP_QUESTIONS = [
  {
    _id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: 2, title: "Is it only me or the font is bolder than necessary?" },
  { _id: 3, title: " Can I get the course for free?" },
  { _id: 4, title: "ReduxToolkit Not Updating State as Expected" },
  { _id: 5, title: "Async/Await Function Not HandlingErrors Properly" },
];

export const QUESTIONS = [
  {
    _id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "javascript" },
    ],
    author: { _id: 1, name: "Jhon Doe", picture: "url-to-picture" },
    upvotes: 10,
    views: 20000,
    answers: [],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: 2,
    title: "Understanding React Hooks and their use cases",
    tags: [
      { _id: "3", name: "react" },
      { _id: "4", name: "javascript" },
    ],
    author: { _id: 2, name: "Jane Smith", picture: "url-to-another-picture" },
    upvotes: 15,
    views: 250,
    answers: [],
    createdAt: new Date("2021-09-05T10:30:00.000Z"),
  },
  {
    _id: 3,
    title: "Introduction to GraphQL and its advantages",
    tags: [
      { _id: "5", name: "graphql" },
      { _id: "6", name: "javascript" },
    ],
    author: { _id: 3, name: "Alice Johnson", picture: "url-to-third-picture" },
    upvotes: 8,
    views: 180,
    answers: [],
    createdAt: new Date("2021-09-10T15:45:00.000Z"),
  },
  // Add more question objects as needed...
];
