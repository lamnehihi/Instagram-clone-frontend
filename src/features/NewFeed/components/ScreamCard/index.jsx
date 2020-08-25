import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  makeStyles,
  CardActions,
  CardContent,
  Typography,
  Box,
  Link,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import dayjs from "dayjs";

ScreamCard.propTypes = {
  scream: PropTypes.object,
};

ScreamCard.defaultProps = {
  scream: {},
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    marginBottom: "1.5rem",
    paddingBottom: '.3rem',
  },
  media: {
    height: 100,
    paddingTop: "56.25%",
  },
  iconLeft: {
    marginLeft: "auto",
  },
  bold: {
    color: "#262626",
    fontWeight: "bold",
  },
  text: {
    paddingLeft: ".5rem",
  },
  moveUp: {
    marginTop: "-2rem",
  },
  grey: {
    color: "#8e8e8e",
  },
  comment : {
    marginLeft: "1.5rem",
    fontSize: '12px'
  }
}));

function ScreamCard(props) {
  const { scream } = props;
  const {
    body,
    commentCount,
    createAt,
    imageUrl,
    likeCount,
    userHandle,
    userImage,
  } = scream;
  const classes = useStyle();

  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  return (
    <Card elevation={15} className={`${classes.root} card`}>
      <CardHeader
        avatar={<Avatar alt={userHandle} src={userImage} />}
        action={
          <IconButton aria-label="more-action">
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Link href="#" className={`${classes.bold}`}>
            {`${userHandle}`}
          </Link>
        }
      />
      <CardMedia
        className={`${classes.media} card__media`}
        image={imageUrl}
        title={body}
      />
      <Box>
        <CardActions disableSpacing>
          <IconButton aria-label="like">
            <FavoriteBorderIcon className={classes.bold} />
          </IconButton>
          <IconButton aria-label="comment">
            <ChatBubbleOutlineIcon className={classes.bold} />
          </IconButton>
          <IconButton className={classes.iconLeft} aria-label="bookmark">
            <BookmarkBorderIcon className={classes.bold} />
          </IconButton>
        </CardActions>

        <CardContent className={`${classes.moveUp}`}>
          <Typography className={`${classes.bold} ${classes.text}`}>
            {`${likeCount} likes`}
          </Typography>
          <Box display="flex">
            <Typography className={`${classes.bold} ${classes.text}`}>
              {userHandle}
            </Typography>
            <Typography className={`${classes.text}`}>{body}</Typography>
          </Box>
          {commentCount === 0 ? (
            ""
          ) : (
            <Link href="#" className={`${classes.text} ${classes.grey}`}>
              {`view all ${commentCount} comments`}
            </Link>
          )}
        </CardContent>
        <Typography className={`${classes.comment} ${classes.grey}`}>
        {dayjs(createAt).fromNow()}
      </Typography>
      </Box>
    </Card>
  );
}

export default ScreamCard;
