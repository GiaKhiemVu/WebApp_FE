import { useState } from "react";
import { Grid, Card, CardMedia, Typography, Box, Button } from "@mui/material";
import PropTypes from "prop-types";

const seed = Array(10).fill({
  name: "Name",
  description: "abcxyz",
  cookTime: "15 mins",
  price: "10000",
})

function ContentItem(props) {
  const [list, setList] = useState(seed);

  return (
    <>
      <Grid container spacing={2} className={props.className}>
        {list?.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Card className="cardItem">
              <Typography variant="h5">{item.name}</Typography>
              <Box className="timeBox">{item.cookTime}</Box>
              <CardMedia
                component="img"
                src={item.imgPath ? `/img/${item.imgPath}` : `/img/nonimg.png`}
                alt={`Image ${index}`}
                className="cardImg"
              />
              <div
                className="description"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography variant="h8">Describe:</Typography>
                <Typography style={{ marginLeft: "10px" }}>
                  {item.description}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Box style={{}} variant="outlined">
                  Price: {item.price} vnd
                </Box>
                <Button variant="outlined">Add to cart</Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

ContentItem.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      imgPath: PropTypes.string,
    })
  ),
};

export default ContentItem;
