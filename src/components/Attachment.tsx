import React, { useState } from "react";
import {
  GridListTile,
  GridListTileBar,
  Link,
  Paper,
  Typography,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import PlayIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Photo } from "./Photo";

const useStyles = makeStyles({
  photo: {
    width: "100%",
  },
  linkPhoto: {
    flex: "1 1 0",
    minWidth: 0,
    maxWidth: "40%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
});

export function Attachment(props: any) {
  const classes = useStyles();

  const att = props.attachment;

  if (att.type === "photo") {
    return (
      <div>
        <Photo className={classes.photo} sizes={att.photo.sizes} />
      </div>
    );
  }

  if (att.type === "video") {
    return (
      <GridListTile component="div" key={att.video.id}>
        <Photo className={classes.photo} sizes={att.video.image} />
        <GridListTileBar
          title={att.video.title}
          subtitle={att.video.description}
        />
      </GridListTile>
    );
  }

  if (att.type === "link") {
    return (
      <Link href={att.link.url} target="_blank" rel="noopener noreferrer">
        <Paper
          style={{ display: "flex", minHeight: "80px", margin: 8 }}
          variant="outlined"
        >
          {att.link.photo ? (
            <Photo className={classes.linkPhoto} sizes={att.link.photo.sizes} />
          ) : (
            <div
              style={{
                display: "flex",
                width: "80px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LinkIcon />
            </div>
          )}
          <div
            style={{
              padding: 8,
              display: "flex",
              alignItems: "center",
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            <Typography variant="body2" lang="ru">
              {att.link.title} <LinkIcon fontSize="inherit" />
            </Typography>
          </div>
        </Paper>
      </Link>
    );
  }

  if (att.type === "doc" && att.doc.ext === "gif") {
    return <Video attachment={att} />;
  }

  return (
    <Typography variant="body2" lang="ru" className={classes.photo}>
      {`Unsupported attachment: ${att.type}`}
    </Typography>
  );
}

function Video(props: any) {
  const classes = useStyles();
  const { attachment } = props;

  const [isShownPlayer, setIsShownPlayer] = useState(false);

  const src = attachment.doc.preview?.video?.src;
  const preview = attachment.doc.preview?.photo?.sizes;

  if (!src || !preview) return null;

  return (
    <div>
      {isShownPlayer ? (
        <video src={src} autoPlay controls className={classes.photo} />
      ) : (
        <div
          style={{ position: "relative" }}
          onClick={() => setIsShownPlayer(true)}
        >
          <PlayIcon
            style={{
              color: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px",
              height: "100px",
            }}
          />
          <Photo className={classes.photo} sizes={preview} />
        </div>
      )}
    </div>
  );
}
