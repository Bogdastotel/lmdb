import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ViewDetails({ props, match }) {
  useEffect(() => {
    fetchItem();
    // console.log(match);
  }, []);

  const fetchItem = async () => {
    const fetchItem = await fetch(
      // `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=78a4b48716787650faf80366a4cfe99a`
      // `http://192.168.0.74:8000/api/videos/${match.params.id}`
      // `http://25.64.100.106/:8000/api/videos/${match.params.id}`
      `http://25.32.37.187:8000/api/videos/${match.params.id}`
    );

    const item = await fetchItem.json();
    setItem(item);

    console.log(item);
  };
  const [item, setItem] = useState({
    artists: [],
    director: [{}]
  });

  let history = useHistory();
  const goBack = () => {
    history.push("/TopMovies");
  };

  return (
    <Container style={{ backgroundColor: "#1D1D1D", color: "#B0B0B0" }}>
      <h2 style={{ margin: "20px 0", color: "white" }}>{item.name}</h2>

      <Row className="justify-content-start">
        <Col md="3" className="pl-0 pr-1">
          <img
            width="100%"
            height="100%"
            style={{ display: "inline-block" }}
            src={`${item.poster}`}
            alt="item_pic"
          />
        </Col>
        <Col md="9" className="p-0 pr-1">
          {" "}
          <div
            className="video"
            style={{
              position: "relative",
              paddingBottom: "56.25%" /* 16:9 */,
              paddingTop: 25,
              height: 0
            }}
          >
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
              src={item.trailer}
              frameBorder="0"
            />
          </div>
        </Col>
      </Row>

      <p style={{ width: "500px", marginTop: "20px" }}>
        <strong style={{ color: "white" }}>Movie Overview: </strong> {item.plot}
      </p>

      <p>
        <strong style={{ color: "white" }}>Release date: </strong>{" "}
        {item.release_date}
      </p>

      <p>
        <strong style={{ color: "white" }}>IMDb rating: </strong>
        {item.rating_avg}
      </p>

      <p>
        <strong style={{ color: "white" }}>Director: </strong>
        <Link
          style={{ color: "#B0B0B0" }}
          to={{
            pathname: "/DirectorDetails",
            state: {
              director: item.director,
              id: match.params.id
            }
          }}
        >
          {item.director[0].name}
        </Link>
      </p>
      <p>
        <strong style={{ color: "white" }}>Actors: </strong>
        {item.artists.map((artist, index) => (
          <span style={{ marginRight: "15px" }} key={index}>
            {/* <Link to={`/ViewDetails/${artist.id}`}>{artist.name}</Link> */}
            <Link
              style={{ color: "#B0B0B0" }}
              to={{
                pathname: "/ActorDetails",
                state: {
                  artist: artist,
                  id: match.params.id
                }
              }}
            >
              {artist.name}
            </Link>
          </span>
        ))}
      </p>

      <Button variant="outline-primary" onClick={goBack}>
        Go back to movie list
      </Button>
    </Container>
  );
}
