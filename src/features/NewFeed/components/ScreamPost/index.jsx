import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
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
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { ScreamPostStyle } from "features/NewFeed/Style/ScreamPostStyle";
import ActionDial from "./ActionDial";

ScreamPost.propTypes = {
  authenticated: PropTypes.bool,
  credentials: PropTypes.object,
};

ScreamPost.defaultProps = {
  authenticated: false,
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
  
  return authenticated === true ? (
    <Card elevation={12} className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title="Make a scream 🎉"
      />
      <Divider />
      <CardContent>
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
      </CardContent>
      <Divider />
      <CardActions>
        <Box alignItems="center" width="-webkit-fill-available;" height="40px" position="relative">
        <ActionDial handleAddImage={handleAddImage} />
          {imageName === "none" ? "" : <Typography>{imageName}</Typography>}
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
