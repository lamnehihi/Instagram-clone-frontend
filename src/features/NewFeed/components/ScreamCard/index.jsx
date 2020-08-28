import React, { useState, createRef, useEffect } from "react";
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
  Slide,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import dayjs from "dayjs";
import ScreamDialog from "../ScreamDialog";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_SCREAMS } from "features/NewFeed/NewFeedSlice";
import { RandomBackGroundImage } from "assets/images/randomPics/randomPics";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    marginBottom: "1.5rem",
    paddingBottom: ".3rem",
    "& a": {
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
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
    wordWrap: "break-word",
  },
  moveUp: {
    marginTop: "-2rem",
  },
  grey: {
    color: "#8e8e8e",
  },
  comment: {
    marginLeft: "1.5rem",
    fontSize: "12px",
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
  textBody: {
    width: "90%",
  },
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
  const { authenticated, credentials } = useSelector((state) => state.user);
  let {} = props;
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

  const handleClose = () => {
    setOpen(false);
  };

  let isMyScream = false;
  if (scream.userHandle === credentials.handle) {
    isMyScream = true;
  }

  const randomNum = () => {
    return Math.trunc(Math.random() * 15);
  };
  let indexPic = RandomBackGroundImage[3];
  useEffect(()=> {
    indexPic = RandomBackGroundImage[randomNum()];
    //console.log("indexPic", indexPic)
  },[])

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
          <NavLink to={`profile/${userHandle}`} className={`${classes.bold}`}>
            {`${userHandle}`}
          </NavLink>
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
            image={indexPic}
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
//</Slide>
  );
}

export default ScreamCard;
