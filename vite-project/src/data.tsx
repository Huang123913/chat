import { ChatProps, UserProps } from "./types";

export const users: UserProps[] = [
  {
    name: "营销专家",
    username: "擅长在合同、市场、客户关系中分析数据",
    avatar:
      "https://img2.baidu.com/it/u=1039195250,2903150616&fm=253&fmt=auto?w=171&h=171",
    online: true,
  },
  {
    name: "Katherine Moss",
    username: "@kathy",
    avatar: "/static/images/avatar/3.jpg",
    online: false,
  },
  {
    name: "Phoenix Baker",
    username: "@phoenix",
    avatar: "/static/images/avatar/1.jpg",
    online: true,
  },
  {
    name: "Eleanor Pena",
    username: "@eleanor",
    avatar: "/static/images/avatar/4.jpg",
    online: false,
  },
  {
    name: "Kenny Peterson",
    username: "@kenny",
    avatar: "/static/images/avatar/5.jpg",
    online: true,
  },
  {
    name: "Al Sanders",
    username: "@al",
    avatar: "/static/images/avatar/6.jpg",
    online: true,
  },
  {
    name: "Melissa Van Der Berg",
    username: "@melissa",
    avatar: "/static/images/avatar/7.jpg",
    online: false,
  },
];

export const chats: ChatProps[] = [
  {
    id: "1",
    sender: users[0],
    messages: [
      {
        id: "1",
        timestamp: "Today 2:20pm",
        sender: "You",
        content: "生成2021年-2023年的销售数据",
      },
      {
        id: "2",
        timestamp: "Just now",
        sender: users[0],
        content: "表格",
      },
    ],
  },
  {
    id: "2",
    sender: users[1],
    messages: [
      {
        id: "1",
        content: "Hi Olivia, I am thinking about taking a vacation.",
        timestamp: "Wednesday 9:00am",
        sender: users[1],
      },
      {
        id: "2",
        content:
          "That sounds like a great idea, Katherine! Any idea where you want to go?",
        timestamp: "Wednesday 9:05am",
        sender: "You",
      },
      {
        id: "3",
        content: "I am considering a trip to the beach.",
        timestamp: "Wednesday 9:30am",
        sender: users[1],
      },
      {
        id: "4",
        content: "The beach sounds perfect this time of year!",
        timestamp: "Wednesday 9:35am",
        sender: "You",
      },
      {
        id: "5",
        content: "Yes, I agree. It will be a much-needed break.",
        timestamp: "Wednesday 10:00am",
        sender: users[1],
      },
      {
        id: "6",
        content: "Make sure to take lots of pictures!",
        timestamp: "Wednesday 10:05am",
        sender: "You",
      },
    ],
  },
  {
    id: "3",
    sender: users[2],
    messages: [
      {
        id: "1",
        content: "Hey!",
        timestamp: "5 mins ago",
        sender: users[2],
        unread: true,
      },
    ],
  },
  {
    id: "4",
    sender: users[3],
    messages: [
      {
        id: "1",
        content:
          "Hey Olivia, I was thinking about doing some home improvement work.",
        timestamp: "Wednesday 9:00am",
        sender: users[3],
      },
      {
        id: "2",
        content:
          "That sounds interesting! What kind of improvements are you considering?",
        timestamp: "Wednesday 9:05am",
        sender: "You",
      },
      {
        id: "3",
        content:
          "I am planning to repaint the walls and replace the old furniture.",
        timestamp: "Wednesday 9:15am",
        sender: users[3],
      },
      {
        id: "4",
        content:
          "That will definitely give your house a fresh look. Do you need help with anything?",
        timestamp: "Wednesday 9:20am",
        sender: "You",
      },
      {
        id: "5",
        content:
          "I might need some help with picking the right paint colors. Can we discuss this over the weekend?",
        timestamp: "Wednesday 9:30am",
        sender: users[3],
      },
    ],
  },

  {
    id: "5",
    sender: users[4],
    messages: [
      {
        id: "1",
        content: "Sup",
        timestamp: "5 mins ago",
        sender: users[4],
        unread: true,
      },
    ],
  },
  {
    id: "6",
    sender: users[5],
    messages: [
      {
        id: "1",
        content: "Heyo",
        timestamp: "5 mins ago",
        sender: "You",
        unread: true,
      },
    ],
  },
  {
    id: "7",
    sender: users[6],
    messages: [
      {
        id: "1",
        content:
          "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        timestamp: "5 mins ago",
        sender: users[6],
        unread: true,
      },
    ],
  },
  {
    id: "5",
    sender: users[4],
    messages: [
      {
        id: "1",
        content: "Sup",
        timestamp: "5 mins ago",
        sender: users[4],
        unread: true,
      },
    ],
  },
  {
    id: "6",
    sender: users[5],
    messages: [
      {
        id: "1",
        content: "Heyo",
        timestamp: "5 mins ago",
        sender: "You",
        unread: true,
      },
    ],
  },
  {
    id: "7",
    sender: users[6],
    messages: [
      {
        id: "1",
        content:
          "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        timestamp: "5 mins ago",
        sender: users[6],
        unread: true,
      },
    ],
  },
];

export const tableList: any[] = [
  {
    data: [
      {
        日期: "2022-01-01",
        部门: "大客户部",
        销售额: 1000,
        成本: 800,
        利润: 200,
        客户数: 100,
        平均交易: 66.67,
      },
      {
        日期: "2022-02-01",
        部门: "大客户部",
        销售额: 1500,
        成本: 900,
        利润: 600,
        客户数: 200,
        平均交易: 75,
      },
      {
        日期: "2022-03-01",
        部门: "大客户部",
        销售额: 1600,
        成本: 900,
        利润: 700,
        客户数: 300,
        平均交易: 66.67,
      },
      {
        日期: "2023-04-01",
        部门: "大客户部",
        销售额: 700,
        成本: 600,
        利润: 200,
        客户数: 400,
        平均交易: 90,
      },
    ],
    headerData: [
      "日期",
      "部门",
      "销售额",
      "成本",
      "利润",
      "客户数",
      "平均交易",
    ],
  },
  {
    data: [
      { student: "studen1", yuwen: 109, yingyu: 89, shuxue: 140 },
      { student: "studen2", yuwen: 119, yingyu: 90, shuxue: 100 },
      { student: "studen3", yuwen: 99, yingyu: 89, shuxue: 88 },
      { student: "stude4", yuwen: 88, yingyu: 70, shuxue: 99 },
      { student: "stude5", yuwen: 90, yingyu: 89, shuxue: 98 },
    ],
    headerData: ["student", "yuwen", "yingyu", "shuxue"],
  },
];
