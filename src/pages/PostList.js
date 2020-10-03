import {
  ListItem,
  List,
  Box,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
  DrawerHeader,
  Input,
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

import { Get } from "../Utils/JSONUtil";

const PostList = ({ isDrawerOpen, closeDrawer }) => {
  const { isLoading, error, data } = useQuery("postlist", () => {
    return Get("http://localhost:3002/posts");
  });

  return (
    <Box
      w={{
        sm: "0",
        md: "20%",
      }}
      h="100%"
    >
      {isLoading ? (
        "Loading.."
      ) : (
        <List
          d={{
            sm: "none",
            md: "block",
          }}
          h="100%"
          borderRight="1px solid #ccc"
        >
          {data.data.map((listItem) => {
            return (
              <ListItem key={listItem.id}>
                <Link
                  padding=".8rem"
                  display="flex"
                  as={RouterLink}
                  to={`/posts/${listItem.id}`}
                >
                  {listItem.title}
                </Link>
              </ListItem>
            );
          })}
        </List>
      )}
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={closeDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Blog List</DrawerHeader>

          <DrawerBody>
            {data
              ? data.data.map((listItem) => {
                  return (
                    <ListItem listStyleType="none" key={listItem.id}>
                      <Link
                        padding=".8rem"
                        display="flex"
                        as={RouterLink}
                        to={`/posts/${listItem.id}`}
                      >
                        {listItem.title}
                      </Link>
                    </ListItem>
                  );
                })
              : null}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={closeDrawer}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default PostList;
