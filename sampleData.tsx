export interface ListItemType {
  index: number;
  content: string;
  url: string;
  icon?: ImageData | "";
}

export const sampleData: ListItemType[] = [
  {
    index: 0,
    content: "DASHBOARD",
    url: "/",
    icon: "",
  },
  {
    index: 1,
    content: "SAMPLE1",
    url: "/list/SampleList1",
    icon: "",
  },
  {
    index: 2,
    content: "SAMPLE2",
    url: "/list/SampleList2",
    icon: "",
  },
  {
    index: 3,
    content: "SAMPLE3",
    url: "/list/SampleList3",
    icon: "",
  },
  {
    index: 4,
    content: "SAMPLE4",
    url: "/list/SampleList4",
    icon: "",
  },
  {
    index: 5,
    content: "SAMPLE5",
    url: "/list/SampleList5",
    icon: "",
  },
];
