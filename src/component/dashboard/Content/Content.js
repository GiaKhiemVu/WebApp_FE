import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Paper, Typography } from "@mui/material";
import ContentItem from "./ContentItem";

function Content(props) {
    const currentContent = props.currentContent

  return (
    <Paper>
      <Typography variant="h4" className="middleTitle">
        {currentContent.title}
      </Typography>
      {currentContent.content && <Typography variant="h5" className="middleSubTitle">
        {currentContent.content}
      </Typography>}
      <ContentItem className="middleContent"/>
    </Paper>
  );
}

Content.propTypes = {
  currentContent: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default Content;
