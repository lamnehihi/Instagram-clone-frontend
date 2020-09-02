import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Card, CardMedia } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from "react-router-dom";
import useRandomImage from "hooks/useRandomImage";

ScreamBox.propTypes = {
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  imageUrl: PropTypes.string,
  body: PropTypes.string,
  screamId: PropTypes.string,
};

ScreamBox.defaultProps = {
  likeCount: 0,
  commentCount: 0,
  imageUrl: "",
  body: "",
  screamId: "",
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    position: "relative",
    display: "contents",
    height: 300,
    "& ul": {
      padding: "0px"
    },
    "& .MuiCardMedia-root": {
      "& span": {
        display: "none",
      },
    },
    "& .MuiCardMedia-root:hover": {
      "& span": {
        backgroundColor: "#00000070",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
        },
        "& div": {
          "& p": {
            fontWeight: 800,
            fontSize: "20px",
          },
          marginRight: ".5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          [theme.breakpoints.down("sm")]: {
            "& p": {
              fontWeight: 800,
              fontSize: "14px",
            },
          },
        },
      },
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  overlay: {
    position: "absolute",
    top: "0%",
    left: "0%",

    width: "100%",
    height: "100%",
  },
  icon: {
    "& .MuiSvgIcon-root": {
      color: "#fff",
      marginRight: ".3rem",
      fontSize: "30px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "23px",
      },
    },
  },
}));

function ScreamBox(props) {
  const { likeCount, commentCount, imageUrl, body, screamId } = props;
  const classes = useStyle();

  const {indexPic} = useRandomImage();
  return (
    <Card className={classes.root}>
      <Link to={`/posts/${screamId}`} className="link">
        <CardMedia className={classes.media} image={imageUrl ? imageUrl : indexPic} title={body}>
          <Box component="span" className={`${classes.overlay}`}>
            <Box component="ul" display="flex" justifyContent='center' flexDirection="column" alignItems="flex-start">
              <Box component="div" className={classes.icon}>
                <FavoriteIcon />
                <p>{likeCount}</p>
              </Box>
              <Box component="div" className={classes.icon}>
                <ChatBubbleIcon />
                <p>{commentCount}</p>
              </Box>
            </Box>
          </Box>
        </CardMedia>
      </Link>
    </Card>
  );
}

export default ScreamBox;
