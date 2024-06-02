import { useEffect, useState } from "react";
import { Grid, Card, CardMedia, Typography, Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { imageDecoder } from "@/util/imageUtil";

const seed = Array(10).fill({
  name: "Name",
  description: "abcxyz",
  cooktime: "15 mins",
  price: "10000",
})

function ContentItem(props) {
  const [list, setList] = useState(props.list?props.list:seed);

  useEffect(() => {
    props.list ? setList(props.list) : setList(seed);
    console.log(props.list)
  }, [props.list] )

  return (
    <>
      {list?.length !== 1 ? (
        <Grid container spacing={2} className={props.className}>
          {list?.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card className="cardItem">
                <Typography variant="h5">{item.name}</Typography>
                <Box className="timeBox">{item.cooktime}</Box>
                <CardMedia
                  component="img"
                  src={
                    item.Image ? imageDecoder(item.Image) : `/images/nonimg.png`
                  }
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
                  {props.user && <Button variant="outlined">Add to cart</Button>}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card className="cardItem">
          <Typography variant="h5">{list[0].name}</Typography>
          <Box className="timeBox">{list[0].cooktime}</Box>
          <CardMedia
            component="img"
            src={list[0].imgPath ? list[0].imgPath : `/images/nonimg.png`}
            alt={"Image"}
            className="cardImg"
          />
          <div
            className="description"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h8">Describe:</Typography>
            <Typography style={{ marginLeft: "10px" }}>
              {list[0].description}
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
              Price: {list[0].price} vnd
            </Box>
            <Button variant="outlined">Add to cart</Button>
          </div>
        </Card>
      )}
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
