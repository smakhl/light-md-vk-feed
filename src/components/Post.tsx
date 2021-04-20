import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// @ts-ignore
import Linkify from "react-linkify";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { Attachment } from "./Attachment";

const useStyles = makeStyles({
  postText: {
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
  },
});

export function Post({ post }: { post: any }) {
  const classes = useStyles();
  const attachments = post.attachments?.map((att: any, i: number) => (
    <Attachment attachment={att} key={i} />
  ));

  return (
    <Box my={4}>
      <Card
        onClick={() => {
          console.log(post);
        }}
      >
        <CardHeader
          title={post.source_name}
          subheader={post.date.toLocaleString("ru")}
          avatar={<Avatar src={post.avatar_src}>😊</Avatar>}
        />
        {attachments}
        <CardContent>
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            lang="ru"
            className={classes.postText}
          >
            <Linkify>{post.text}</Linkify>
          </Typography>
        </CardContent>
        <CardActions>
          <Button href={post.url} target="_blank" size="small" color="primary">
            Open in VK
          </Button>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
