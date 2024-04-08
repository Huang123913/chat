import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

import model from "../assets/model.svg";
import eventBus from "../util/eventBus";

function Toggler(props: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const { defaultExpanded = false, renderToggle, children } = props;
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar(props: any) {
  const { setSelectedModelData } = props;
  const [treeList, setTreeList] = React.useState<any[]>([]);
  const [selectDataNum, setSelectDataNum] = React.useState(0);
  React.useEffect(() => {
    let treeList1 = [
      {
        text: "销售类模型",
        isCheck: false,
        children: [
          {
            id: "test1",
            text: "成本效益分析模型",
            isCheck: false,
          },
          {
            id: "test2",
            text: "市场需求预测模型",
            isCheck: false,
          },
          {
            id: "test3",
            text: "营销策略评估模型",
            isCheck: false,
          },
          {
            id: "test4",
            text: "库存管理模型",
            isCheck: false,
          },
          {
            id: "test5",
            text: "销售预测模型",
            isCheck: false,
          },
        ],
      },
      {
        text: "客户类模型",
        isCheck: false,
        children: [
          {
            id: "test6",
            text: "客户满意度调查模型",
            isCheck: false,
          },
        ],
      },
    ];
    setTreeList(() => {
      return treeList1;
    });
  }, []);

  React.useEffect(() => {
    let num = 0;
    treeList.forEach((item) => {
      item.children.forEach((element: any) => {
        if (element.isCheck) ++num;
      });
    });
    setSelectDataNum(num);
    eventBus.$on("updateDate", (data: any) => {
      if (!data) return;
      console.log("data", data);
      let updatedTreeList = treeList.map((item) => {
        return {
          ...item,
          children: item.children.map((child: any) => {
            if (child.id === data[0].id) {
              return {
                ...child,
                isCheck: false,
              };
            }
            return child;
          }),
        };
      });
      updatedTreeList.forEach((item) => {
        if (item.children.every((item1: any) => item1.isCheck)) {
          item.isCheck = true;
        } else {
          item.isCheck = false;
        }
      });
      let num = 0;
      let selectedModel: any[] = [];
      updatedTreeList.forEach((item) => {
        item.children.forEach((element: any) => {
          if (element.isCheck) {
            ++num;
            selectedModel.push(element);
          }
        });
      });
      setSelectDataNum(num);
      setTreeList(updatedTreeList);
    });
  });

  return (
    <Sheet
      sx={{
        width: props?.isOpen ? "500px" : "0",
        transition: "0.5s",
        overflow: "hidden",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        sx={{
          height: "100dvh",
          p: 2,
          flexShrink: 0,
          display: props?.isOpen ? "flex" : "none",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Avatar
              src={model}
              size="sm"
              sx={{ width: "20px", height: "20px" }}
            />
            <Typography level="title-lg">选择模型</Typography>
          </Box>
          <IconButton
            variant="plain"
            aria-label="edit"
            color="neutral"
            size="sm"
            onClick={() => {
              props.chooseModel(false);
            }}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Input
          size="sm"
          endDecorator={
            <IconButton size="sm">
              <SearchRoundedIcon />
            </IconButton>
          }
          placeholder="搜索模型"
        />
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}
          >
            {treeList.map((item: any, parentIndex: number) => {
              return (
                <ListItem nested key={parentIndex}>
                  <Toggler
                    renderToggle={({ open, setOpen }) => (
                      <ListItemButton>
                        <ListItemContent>
                          <Checkbox
                            size="sm"
                            checked={item.isCheck}
                            label={item.text}
                            onChange={(e) => {
                              let updatedTreeList = treeList.map(
                                (item, index) => {
                                  if (index === parentIndex) {
                                    return {
                                      ...item,
                                      isCheck: e.target.checked,
                                      children: item.children.map(
                                        (child: any) => {
                                          return {
                                            ...child,
                                            isCheck: e.target.checked,
                                          };
                                        }
                                      ),
                                    };
                                  }
                                  return item;
                                }
                              );
                              let num = 0;
                              let selectedModel: any[] = [];
                              updatedTreeList.forEach((item) => {
                                item.children.forEach((element: any) => {
                                  if (element.isCheck) {
                                    ++num;
                                    selectedModel.push(element);
                                  }
                                });
                              });
                              setSelectDataNum(num);
                              setTreeList(updatedTreeList);
                              setSelectedModelData(selectedModel);
                            }}
                          ></Checkbox>
                        </ListItemContent>
                        <KeyboardArrowDownIcon
                          onClick={() => setOpen(!open)}
                          sx={{ transform: open ? "rotate(180deg)" : "none" }}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{ gap: 0.5 }}>
                      {item.children.map((item1: any, childIdx: number) => {
                        return (
                          <ListItem sx={{ mt: 0.5 }} key={item1.id}>
                            <ListItemButton>
                              <Checkbox
                                size="sm"
                                onChange={(e) => {
                                  let updatedTreeList = treeList.map(
                                    (item, index) => {
                                      if (index === parentIndex) {
                                        return {
                                          ...item,
                                          children: item.children.map(
                                            (
                                              child: any,
                                              childIndex: number
                                            ) => {
                                              if (childIdx === childIndex) {
                                                return {
                                                  ...child,
                                                  isCheck: e.target.checked,
                                                };
                                              }
                                              return child;
                                            }
                                          ),
                                        };
                                      }
                                      return item;
                                    }
                                  );

                                  if (
                                    updatedTreeList[parentIndex].children.every(
                                      (item: any) => item.isCheck
                                    )
                                  ) {
                                    updatedTreeList[parentIndex].isCheck = true;
                                  } else {
                                    updatedTreeList[parentIndex].isCheck =
                                      false;
                                  }
                                  let num = 0;
                                  let selectedModel: any[] = [];
                                  updatedTreeList.forEach((item) => {
                                    item.children.forEach((element: any) => {
                                      if (element.isCheck) {
                                        ++num;
                                        selectedModel.push(element);
                                      }
                                    });
                                  });
                                  setSelectDataNum(num);
                                  setTreeList(updatedTreeList);
                                  setSelectedModelData(selectedModel);
                                }}
                                checked={item1.isCheck}
                                label={item1.text}
                              ></Checkbox>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Toggler>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            mb: "40px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            <span>已选择</span>
            <Typography
              level="title-sm"
              sx={{ padding: "0 2px", fontWeight: "700" }}
            >
              {selectDataNum}
            </Typography>
            <span>项模型</span>
          </Box>

          <Button
            size="sm"
            color="primary"
            sx={{ alignSelf: "center", borderRadius: "sm" }}
            onClick={() => {
              props.chooseModel(false);
            }}
          >
            确定
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
}
