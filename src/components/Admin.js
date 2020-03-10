import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import axios from "axios";
import FormPage3 from "./FormPage3";

const net = "http://192.168.0.74:8000";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video_type_id: 2,
      name: "Fica",
      genres: [],
      genresApi: [2, 3],
      mpaa_rating: "PG",
      duration_in_minutes: 122,
      release_date: "2002-05-02",
      country: "Serbia",
      plot:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis asperiores numquam consequuntur non nisi facere assumenda distinctio qui. Modi, omnis recusandae? Odit iusto saepe neque alias. Eligendi deleniti tenetur quas.",
      artists: [],
      artistsApi: [22, 137],
      director_id: 11,
      director: [11],
      trailer: "trailer",
      poster: "",
      seasons: "",
      episodes: [],
      episodesPerSeason: ""
    };
  }

  componentDidMount() {
    let genres = "http://192.168.0.74:8000/api/genres";
    let directors = "http://192.168.0.74:8000/api/artists/directors";
    let artists = "http://192.168.0.74:8000/api/artists/actors";

    const requestGenres = axios.get(genres);
    const requestDirectors = axios.get(directors);
    const requestArtists = axios.get(artists);

    axios
      .all([requestGenres, requestDirectors, requestArtists])
      .then(
        axios.spread((...responses) => {
          const responseGenres = responses[0];
          const responseDirectors = responses[1];
          const responseArtists = responses[2];
          // use/access the results

          this.setState({
            genresApi: [...responseGenres.data],
            director: [...responseDirectors.data],
            artistsApi: [...responseArtists.data]
          });
        })
      )
      .catch(errors => {
        // react on errors.
        console.log(errors);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileSelectedHandler = event => {
    this.setState({
      poster: event.target.files[0]
    });
  };

  handleChangeDirectors = director => {
    this.setState({ director_id: director.value });
    console.log("director_id is ", director.value);
  };

  handleChangeGenres = genres => {
    let genresMapped = genres.map(genre => genre.value);
    this.setState({ genres: genresMapped });
    console.log("genres ", genresMapped);
  };

  handleChangeActors = actors => {
    let actorsMapped = actors.map(actor => actor.value);

    this.setState({ artists: actorsMapped }, () =>
      console.log("artists ", actorsMapped)
    );
  };

  onChangeEpisodes = (index, value) => {
    let episodes = this.state.episodes;
    episodes[index] = parseInt(value);

    this.setState({
      episodes: episodes
    });
  };

  formUpload = event => {
    const fd = new FormData();
    const user = JSON.parse(localStorage.getItem("user"));

    this.state.artists.map(artist => {
      fd.append("artists[]", artist);
    });

    this.state.genres.map(genre => {
      fd.append("genres[]", genre);
    });

    this.state.episodes.map(episodePerSeason => {
      fd.append("episodes[]", episodePerSeason);
    });

    fd.append("poster", this.state.poster, this.state.poster.name);
    fd.append("name", this.state.name);
    fd.append("mpaa_rating", this.state.mpaa_rating);
    fd.append("duration_in_minutes", this.state.duration_in_minutes);
    fd.append("release_date", this.state.release_date);
    fd.append("country", this.state.country);
    fd.append("plot", this.state.plot);
    fd.append("director_id", this.state.director_id);
    fd.append("trailer", this.state.trailer);
    fd.append("video_type_id", this.state.video_type_id);

    axios
      .post(`${net}/api/videos`, fd, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res => {
        console.log(res);
        alert("video successfully uploaded!");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <Container
        style={{ color: "white" }}
        className="my-2 p-3 text-center"
        /* style={{ backgroundColor: "#C5C6C6" }} */
      >
        <h2>Welcome to Admin page</h2>

        <section className="mt-5">
          <h4 className="p-3">Here you can add a new video!</h4>
          <Form
            style={{ width: "500px", margin: "0 auto", color: "black" }}
            className="my-3"
          >
            <StepWizard>
              <FormPage1
                onChange={this.handleChange}
                fileSelectedHandler={this.fileSelectedHandler}
                onChangeSeasons={this.onChangeSeasons}
                video_type_id={this.state.video_type_id}
                name={this.state.name}
                rating={this.state.rating}
                mpaa_rating={this.state.mpaa_rating}
                poster={this.state.poster}
                seasons={this.state.seasons}
                episodes={this.state.episodes}
                onChangeEpisodes={this.onChangeEpisodes}
                episodesPerSeason={this.state.episodesPerSeason}
              />

              <FormPage2
                onChange={this.handleChange}
                fileSelectedHandler={this.fileSelectedHandler}
                duration_in_minutes={this.state.duration_in_minutes}
                release_date={this.state.release_date}
                country={this.state.country}
                plot={this.state.plot}
              />
              <FormPage3
                formUpload={this.formUpload}
                onChange={this.handleChange}
                genres={this.state.genresApi}
                artists={this.state.artistsApi}
                directors={this.state.director}
                handleChangeDirectors={this.handleChangeDirectors}
                handleChangeGenres={this.handleChangeGenres}
                handleChangeActors={this.handleChangeActors}
              />
            </StepWizard>
          </Form>
        </section>
      </Container>
    );
  }
}

export default Admin;
