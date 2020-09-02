import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  IconButton,
  Avatar,
  TextField,
  Divider,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { ScreamPostStyle } from "features/NewFeed/Style/ScreamPostStyle";
import ActionDial from "./ActionDial";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";

ScreamPost.propTypes = {
  authenticated: PropTypes.bool,
  credentials: PropTypes.object,
};

ScreamPost.defaultProps = {
  authenticated: true,
  credentials: {},
};

function ScreamPost(props) {
  const { handlePost, handleImageChange } = props;
  const classes = ScreamPostStyle();
  const { authenticated, credentials } = props;
  const [body, setBody] = useState("");
  const [imageName, setImageName] = useState("none");

  const handleAddImage = () => {
    const imageInput = document.getElementById("image");
    imageInput.click();
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleImageOnChange = (event) => {
    const image = event.target.files[0];

    if (image) {
      setImageName(image.name);
      if (handleImageChange) {
        handleImageChange(image);
      }
    }
  };

  const handleOnPost = () => {
    if (handlePost) {
      if (body.trim() !== "") {
        handlePost(body);
        setBody("");
      }
    }
  };
  const { loadingNewFeed } = useSelector((state) => state.ui);

  return authenticated === true ? (
    <Card elevation={12} className={classes.root}>
      {loadingNewFeed ? (
        <CardHeader title={<Skeleton animation="wave" width="30%" />} />
      ) : (
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
          title="Make a scream 🎉"
        />
      )}

      <Divider />
      <CardContent>
        {loadingNewFeed ? (
          <Box height={70}>
            <Skeleton animation="wave" variant="circle" width={56} height={56} />
          </Box>
        ) : (
          <Box display="flex" position="relative">
            <Avatar
              alt={credentials.handle}
              src={credentials.imageUrl}
              className={classes.large}
            />
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                id="body"
                name="body"
                type="text"
                placeholder="How about a cup of coffee ?"
                autoFocus={true}
                multiline={true}
                className={classes.body}
                value={body}
                onChange={handleBodyChange}
              />
              <TextField
                id="image"
                name="image"
                type="file"
                hidden={true}
                onChange={handleImageOnChange}
              />
            </form>
          </Box>
        )}
      </CardContent>
      <Divider />
      <CardActions>
        <Box
          display="flex"
          minWidth="60%"
          justifyContent="space-between"
          alignItems="center"
          width="-webkit-fill-available;"
          height="40px"
          position="relative"
        >
          <ActionDial handleAddImage={handleAddImage} />
          {imageName === "none" ? (
            ""
          ) : (
            <Typography className={classes.imageName}>{imageName}</Typography>
          )}
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleOnPost}
          color="secondary"
        >
          Post
        </Button>
      </CardActions>
    </Card>
  ) : (
    ""
  );
}

export default ScreamPost;
