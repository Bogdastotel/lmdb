import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";
import StepWizard from "react-step-wizard";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import axios from "axios";
import FormPage3 from "./FormPage3";
import net from "./services";

// const net = "http://192.168.0.74:8000";

// const net = "https://56831765.ngrok.io";

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
      episodesPerSeason: "",
      _method: "PUT"
    };
  }

  componentDidMount() {
    axios
      .get(`${net}/api/videos/${this.props.location.state.id}`)
      .then(res => {
        console.log(res);
        this.setState({
          video_type_id: res.data.video_type_id,
          seasons: res.data.seasons.length,
          name: res.data.name,
          mpaa_rating: res.data.mpaa_rating,
          duration_in_minutes: res.data.duration_in_minutes,
          release_date: res.data.release_date,
          country: res.data.country,
          plot: res.data.plot,
          id: this.props.location.state.id
        });
      })
      .catch(errors => {
        // react on errors.
        console.log(errors);
      });

    let genres = `${net}/api/genres`;
    let directors = `${net}/api/artists/directors`;
    let artists = `${net}/api/artists/actors`;

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
    event.preventDefault();
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
    fd.append("_method", this.state._method);

    axios
      .post(`${net}/api/videos/${this.props.location.state.id}`, fd, {
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
        style={{ color: "white", minHeight: "100vh" }}
        className="p-3 text-center"
        /* style={{ backgroundColor: "#C5C6C6" }} */
      >
        <section className="mt-2">
          <h2>Edit video</h2>

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
                name={this.state.name}
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
