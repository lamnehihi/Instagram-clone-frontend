import React, { useState, createRef, useEffect, useRef } from "react";
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
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import dayjs from "dayjs";
import ScreamDialog from "../ScreamDialog";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_SCREAMS } from "features/NewFeed/NewFeedSlice";
import { RandomBackGroundImage } from "assets/images/randomPics/randomPics";
import { Link, NavLink } from "react-router-dom";
import { ScreamCardStyle } from "features/NewFeed/Style/ScreamCardStyle";



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
  const { authenticated, credentials } = useSelector((state) => state.user);
  const {
    body,
    commentCount,
    createAt,
    imageUrl,
    likeCount,
    userHandle,
    userImage,
    screamId
  } = scream;
  const classes = ScreamCardStyle();

  const handleOnLike = () => {
    if (handleLike) {
      handleLike(scream.screamId, isLike);
    }
  };

  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    setOpen(!open);
    dispatch(DELETE_SCREAMS(scream.screamId));
  };

  let isMyScream = false;
  if (scream.userHandle === credentials.handle) {
    isMyScream = true;
  }

  const randomNum = () => {
    return Math.trunc(Math.random() * 3);
  };
  const indexPic = useRef(RandomBackGroundImage[2]);
  useEffect(() => {
    indexPic.current = RandomBackGroundImage[randomNum()];
    console.log("indexPic", indexPic);
  }, []);

  function add3Dots(string, limit) {
    var dots = "...";
    const showMore = " Show more";
    if(string) {
      if (string.length > limit) {
        // you can also use substr instead of substring
        string = string.substring(0, limit) + dots + showMore;
      }
    }
    return string;
  }


  return (
    //<Slide direction="right" in={true} {...{timeout: 500}} style={{ transitionDelay: "200ms" }}>
    <Card elevation={15} className={`${classes.root} card`}>
      <CardHeader
        avatar={<Avatar alt={userHandle} src={userImage} />}
        action={
          <IconButton aria-label="more-action" onClick={handleClickOpen}>
            <MoreHorizIcon />
            <ScreamDialog
              isMyScream={isMyScream}
              authenticated={authenticated}
              open={open}
              handleDelete={handleDelete}
              handleClick={handleClickOpen}
            />
          </IconButton>
        }
        title={
          <Link to={`profile/${userHandle}`} className={`${classes.bold}`}>
            {`${userHandle}`}
          </Link>
        }
      />
      {imageUrl ? (
        <CardMedia
          className={`${classes.media}`}
          image={imageUrl}
          title={body}
        />
      ) : (
        <Box
          component="div"
          className={`${classes.noImage}`}
          position="relative"
        >
          <CardMedia
            className={`${classes.media} ${classes.noImageChild}`}
            title={body}
            image={indexPic.current}
          />
          <Box component="span">
            <Typography>{body}</Typography>
          </Box>
        </Box>
      )}

      <Box>
        <CardActions disableSpacing>
          <IconButton aria-label="like" onClick={handleOnLike}>
            {isLike ? (
              <FavoriteIcon className={classes.bold} />
            ) : (
              <FavoriteBorderIcon className={classes.bold} />
            )}
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
            <Typography className={`${classes.text} ${classes.textBody}`}>
              {add3Dots(body, 80)}
            </Typography>
          </Box>
          {commentCount === 0 ? (
            ""
          ) : (
            <NavLink to={`posts/${screamId}`} className={`${classes.text} ${classes.grey}`}>
              {`view all ${commentCount} comments`}
            </NavLink>
          )}
        <NavLink to={`posts/${screamId}`} className={`${classes.text} ${classes.time} ${classes.grey}`}>
          {dayjs(createAt).fromNow()}
        </NavLink>
        </CardContent>
      </Box>
    </Card>
//</Slide>
  );
}

export default ScreamCard;
