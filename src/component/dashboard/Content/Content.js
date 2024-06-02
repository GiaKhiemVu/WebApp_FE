import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Paper, Typography } from "@mui/material";
import ContentItem from "./ContentItem";
import {
  getCategory,
  getProductByCategory,
  getProductForAdmin,
  getRecommend,
} from "@/api/productService";

function Content(props) {
  const currentContent = props.currentContent;
  const [listItem, setListItem] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!props.currentContent) {
      return;
    }
    const fetchItem = async () => {
      const category = getCategory(props.currentContent);
      let data;
      if (category === 10) {
        data = await getRecommend("food");
      } else if (category === 11) {
        data = await getRecommend("drink");
      } else if (category !== 0) {
        data = await getProductByCategory(category);
      } else {
        data = await getProductForAdmin();
      }
      if (data) {
        setListItem(data.data);
      }
    };
    fetchItem();
  }, [props.currentContent]);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <Paper>
      <Typography variant="h4" className="middleTitle">
        {currentContent.title}
      </Typography>
      {currentContent.content && (
        <Typography variant="h5" className="middleSubTitle">
          {currentContent.content}
        </Typography>
      )}
      <ContentItem className="middleContent" list={listItem} user={user} />
    </Paper>
  );
}

Content.propTypes = {
  currentContent: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  user: PropTypes.object,
};

export default Content;
