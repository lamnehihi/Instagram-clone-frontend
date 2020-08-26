import React, { useEffect, useState } from "react";
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

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import dayjs from "dayjs";
import ScreamDialog from "../ScreamDialog";


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

ScreamCard.propTypes = {
  scream: PropTypes.object,
  isLike: PropTypes.bool,
  handleLike: PropTypes.func,
};

ScreamCard.defaultProps = {
  scream: {},
  isLike: false,
  handleLike: null,
};

function ScreamCard(props) {
  const { scream, isLike, handleLike } = props;
  let {  } = props
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

  const handleOnLike = () => {
    if(handleLike) {
      handleLike(scream.screamId, isLike);
    }
  }

  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const [open, setOpen] = React.useState(false);

  const nums = [0,1,2,3]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card elevation={15} className={`${classes.root} card`}>
      <CardHeader
        avatar={<Avatar alt={userHandle} src={userImage} />}
        action={
          <IconButton aria-label="more-action" onClick={handleClickOpen}>
            <MoreHorizIcon />
          <ScreamDialog open={open} onClose={handleClose}/>
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
          <IconButton aria-label="like" onClick={handleOnLike}>
          {
            isLike ? <FavoriteIcon className={classes.bold} /> : <FavoriteBorderIcon className={classes.bold} />
          }
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
