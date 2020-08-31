import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
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
import { NavLink, useHistory } from "react-router-dom";
import { DELETE_SCREAMS } from "features/NewFeed/NewFeedSlice";
import "./ScreamDetails.css";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import dayjs from "dayjs";
import { ScreamDetailsStyle } from "features/Scream/Style/ScreamDetailsStyle";
import Scroll from "react-scroll";
import useRandomImage from "hooks/useRandomImage.js";

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

  const classes = ScreamDetailsStyle();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    setOpen(!open);
    dispatch(DELETE_SCREAMS(scream.screamId));
    history.push('/');
  };


  const {indexPic} = useRandomImage();


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

  var Link = Scroll.Link;
  var Element = Scroll.Element;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit comment");

    const clickLink = document.getElementById("scrollLink");
    clickLink.click();

    if (handleCommentSubmit) {
      if (comment.body.trim() !== "") {
        handleCommentSubmit(comment, scream.screamId);
        SetComment({
          body: "",
        });
      }
    }
  };

  let newComments = [...scream.comments];
  newComments.reverse();

  return (
    <Card className={classes.root} elevation={15} >
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
            className={`${classes.media}`}
            title={scream.body}
            image={indexPic}
          />
          <Box component="span">
            <Typography>{scream.body}</Typography>
          </Box>
        </Box>
      )}

      {/* Content Right */}
      <div className={classes.details}>
        <Link
          id="scrollLink"
          activeClass="active"
          to="secondInsideContainer"
          spy={true}
          smooth={true}
          duration={250}
          containerId="containerElement"
          style={{ display: "inline-block" }}
        ></Link>

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
        <CardContent className={classes.content}>
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
          <Element
            name="test7"
            className="element"
            id="containerElement"
            style={{
              position: "relative",
              height: "100%",
              overflowY: "scroll",
              marginBottom: "0px",
            }}
          >
            <ul id="comments">
              {newComments.map((comment, index) => {
                if (index === scream.comments.length - 1) {
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
                      <Element
                        name="secondInsideContainer"
                        style={{
                          marginBottom: "100px",
                        }}
                      ></Element>
                    </li>
                  );
                }
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
            </ul>
          </Element>
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
          <IconButton
            disableFocusRipple
            disableRipple
            aria-label="comment"
          >
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
          <Button type="submit" classes={classes.postBtn}>
            Post
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default ScreamDetails;
