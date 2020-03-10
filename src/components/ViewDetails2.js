import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const net = "http://192.168.0.74:8000";

// const net = "https://ac239f73.ngrok.io";

export default function ViewDetails2({ props, match }) {
  useEffect(() => {
    fetchItem();
    // console.log(match);
  }, []);

  const fetchItem = async () => {
    const fetchItem = await fetch(`${net}/api/videos/${match.params.id}`);

    const item = await fetchItem.json();
    setItem(item);

    // console.log(item);
  };
  const [item, setItem] = useState({
    artists: [],
    director: [{}],
    genres: [{}],
    seasons: [{}],
    type: {}
  });

  let history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <Container style={{ color: "#B0B0B0" }}>
      <h2 style={{ margin: "20px 0", color: "white" }}>
        {item.name} {item.video_type_id === 2 ? "(TV Show)" : "(Movie)"}
      </h2>

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

      <p>
        <strong style={{ color: "white" }}>Genres: </strong>{" "}
        {item.genres.map((genre, index) => (
          <span key={index} className="ml-2">
            {genre.name}
          </span>
        ))}
      </p>

      {item.seasons.length > 0 ? (
        <p>
          <strong style={{ color: "white" }}>Seasons: </strong>{" "}
          {item.seasons.length}
        </p>
      ) : null}

      {item.video_type_id !== 1
        ? item.seasons.map((season, index) => (
            <p style={{ color: "white" }} key={index}>
              <strong>
                {" "}
                Season {index + 1} Episodes:
                <span style={{ color: "#B0B0B0" }} className="ml-2">
                  {season.episodes}
                </span>
              </strong>
            </p>
          ))
        : null}

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
          to={{
            pathname: "/SearchedDirectorDetails",
            state: {
              director: item.director,
              id: match.params.id
            }
          }}
        >
          {/* {console.log(item.director[0].surname)} */}
          {item.director[0].name}
        </Link>
      </p>
      <p>
        <strong style={{ color: "white" }}>Actors: </strong>
        {item.artists.map(artist => (
          <span style={{ marginRight: "15px" }} key={artist.id}>
            {/* <Link to={`/ViewDetails/${artist.id}`}>{artist.name}</Link> */}
            <Link
              to={{
                pathname: "/SearchedActorDetails",
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
        Go back
      </Button>
    </Container>
  );
}
