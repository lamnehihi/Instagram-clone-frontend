import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  useTheme,
  CardHeader,
  Avatar,
  Box,
  Divider,
  CardActions,
  TextField,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ScreamDialog from "features/NewFeed/components/ScreamDialog";
import { NavLink } from "react-router-dom";
import { DELETE_SCREAMS } from "features/NewFeed/NewFeedSlice";
import { RandomBackGroundImage } from "assets/images/randomPics/randomPics";
import "./ScreamDetails.css";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import dayjs from "dayjs";
import { createRef } from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    "& a": {
      color: "#262626",
      textDecoration: "none",
      lineHeight: 1.5,
    },
    "& a:active": {
      color: "#26262690",
    },
    "& ul": {
      listStyle: "none",
      padding: "0rem",
    },
    "& .MuiIconButton-root:hover": {
      backgroundColor: "rgba(0, 0, 0,0)",
    },
    "& .MuiIconButton-root": {
      padding: "0rem .85rem 0rem .85rem",
    },
    "& .MuiCardActions-root": {
      padding: ".85rem .65rem .3rem .65rem",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "330px",
  },
  content: {
    flex: "1 0 auto",
    height: "300px",
    overflowY: "scroll",
  },
  cover: {
    width: "65%",
    "& .MuiCardMedia-root": {
      paddingTop: "100%",
      height: "100%",
    },
  },
  noImage: {
    "& span": {
      position: "absolute",
      top: "0%",
      left: "0%",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      backgroundColor: "#00000050",
      "& .MuiTypography-root": {
        width: "80%",
        maxHeight: "90%",
        fontSize: "28px",
        wordWrap: "break-word",
        color: "#fff",
        textShadow: "#000000 1px 1px 20px",
        textAlign: "center",
        overflow: "hidden !important",
        textOverflow: "ellipsis",
      },
      [theme.breakpoints.down("xs")]: {
        "& .MuiTypography-root": {
          fontSize: "18px",
          wordWrap: "break-word",
        },
      },
      [theme.breakpoints.down("sm")]: {
        "& .MuiTypography-root": {
          fontSize: "22px",
          wordWrap: "break-word",
        },
      },
    },
  },
  bold: {
    color: "#262626",
    fontWeight: "bold",
    marginRight: ".5rem",
  },
  boldIcon: {
    color: "#262626",
    fontWeight: "bold",
  },
  author: {
    marginBottom: "1rem",
    "& .MuiAvatar-root": {
      marginRight: "1rem",
    },
    "& span": {
      wordWrap: "break-word",
    },
    "& .author__body": {
      width: "80%",
    },
  },
  iconLeft: {
    marginLeft: "auto",
  },
  moveUp: {
    padding: "0rem 1.5rem .85rem 1.5rem",
  },
  grey: {
    color: "#8e8e8e",
  },
  time: {
    display: "block",
    fontSize: "10px",
    lineHeight: 1.8,
  },
  form: {
    height: "56px",
    padding: "0rem .5rem 0rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .MuiInputBase-root": {
      height: "100%",
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
  },
}));

ScreamDetails.propTypes = {
  isLike: PropTypes.bool,
  handleLike: PropTypes.func.isRequired,
  scream: PropTypes.object,
  handleCommentSubmit: PropTypes.func,
};

ScreamDetails.defaultProps = {
  isLike: false,
  scream: {},
  handleCommentSubmit: null,
};

function ScreamDetails(props) {
  const { authenticated, credentials } = useSelector((state) => state.user);
  let isMyScream = false;

  const { isLike, handleLike, scream, handleCommentSubmit } = props;

  const handleOnLike = () => {
    if (handleLike) {
      handleLike(scream.screamId, isLike);
    }
  };

  if (credentials.handle) {
    if (credentials.handle === scream.userHandle) {
      isMyScream = true;
    }
  }

  const classes = useStyle();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    setOpen(!open);
    dispatch(DELETE_SCREAMS(scream.screamId));
  };

  const randomNum = () => {
    return Math.trunc(Math.random() * 3);
  };
  const indexPic = useRef(RandomBackGroundImage[2]);
  useEffect(() => {
    indexPic.current = RandomBackGroundImage[randomNum()];
    console.log("indexPic", indexPic);
  }, []);

  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const [comment, SetComment] = useState({
    body: "",
  });

  const handleChange = (event) => {
    SetComment({
      body: event.target.value,
    });
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSubmit = (event) => {
    scrollToBottom()
    event.preventDefault();
    console.log("submit comment");
    if (handleCommentSubmit) {
      if (comment.body.trim() !== "") {
        handleCommentSubmit(comment, scream.screamId);
        SetComment({
          body: "",
        })
      }
    }
  };

  let newComments = [...scream.comments];
  newComments.reverse();


  //useEffect(scrollToBottom, [scream.comments]);

  return (
    <Card className={classes.root} elevation={15}>
      {/* Image left */}
      {scream.imageUrl ? (
        <CardMedia
          className={classes.cover}
          image={scream.imageUrl}
          title={scream.body}
        />
      ) : (
        <Box
          component="div"
          className={`${classes.cover} ${classes.noImage}`}
          position="relative"
        >
          <CardMedia
            className={`${classes.media} ${classes.noImageChild}`}
            title={scream.body}
            image={indexPic.current}
          />
          <Box component="span">
            <Typography>{scream.body}</Typography>
          </Box>
        </Box>
      )}

      {/* Content Right */}
      <div className={classes.details}>
        {/* Header */}
        <CardHeader
          avatar={<Avatar alt={scream.userHandle} src={scream.userImage} />}
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
            <NavLink
              to={`/profile/${scream.userHandle}`}
              className={`${classes.bold}`}
            >
              {`${scream.userHandle}`}
            </NavLink>
          }
        />
        <Divider />

        {/* Body */}
        <CardContent  className={classes.content}>
          <Box display="flex" className={classes.author}>
            <Box>
              <Avatar alt={scream.userHandle} src={scream.userImage} />
            </Box>
            <Box className="author__body">
              <NavLink
                to={`/profile/${scream.userHandle}`}
                className={`${classes.bold}`}
              >
                {`${scream.userHandle}`}
              </NavLink>
              <span>{scream.body}</span>
            </Box>
          </Box>
          {/* ref={commentEndRef} */}
          <ul onFocus={scrollToBottom}>
            {newComments.map((comment, index) => {
              return (
                <li key={index}>
                  <Box display="flex" className={classes.author}>
                    <Box>
                      <Avatar
                        alt={comment.userHandle}
                        src={comment.userImage}
                      />
                    </Box>
                    <Box className="author__body">
                      <NavLink
                        to={`/profile/${comment.userHandle}`}
                        className={`${classes.bold}`}
                      >
                        {`${comment.userHandle}`}
                      </NavLink>
                      <span>{comment.body}</span>
                    </Box>
                  </Box>
                </li>
              );
            })}
            <li ref={messagesEndRef} >
            </li>
          </ul>
        </CardContent>
        <Divider />

        {/* Action */}
        <CardActions disableSpacing>
          <IconButton
            disableFocusRipple
            disableRipple
            aria-label="like"
            onClick={handleOnLike}
          >
            {isLike ? (
              <FavoriteIcon className={classes.boldIcon} />
            ) : (
              <FavoriteBorderIcon className={classes.boldIcon} />
            )}
          </IconButton>
          <IconButton disableFocusRipple disableRipple aria-label="comment">
            <ChatBubbleOutlineIcon className={classes.boldIcon} />
          </IconButton>
          <IconButton
            disableFocusRipple
            disableRipple
            className={classes.iconLeft}
            aria-label="bookmark"
          >
            <BookmarkBorderIcon className={classes.boldIcon} />
          </IconButton>
        </CardActions>
        <CardContent className={`${classes.moveUp}`}>
          <Typography className={`${classes.bold} ${classes.text}`}>
            {`${scream.likeCount} likes`}
          </Typography>
          <NavLink
            to={`/posts/${scream.screamId}`}
            className={`${classes.text} ${classes.time} ${classes.grey}`}
          >
            {dayjs(scream.createAt).fromNow()}
          </NavLink>
        </CardContent>
        <Divider />

        {/* Comment */}
        <form noValidate onSubmit={handleSubmit} className={classes.form}>
          <TextField
            id="body"
            name="body"
            type="text"
            placeholder="Add a comment..."
            onChange={handleChange}
            value={comment.body}
          />
          <Button
            type="submit"
            classes={classes.postBtn}
          >
            Post
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default ScreamDetails;
