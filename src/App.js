import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./components/Home";
import { NoMatch } from "./components/NoMatch";
import { Layout } from "./components/Layout";
import NavigationBar from "./components/NavigationBar";
import TopMovies from "./components/TopMovies";
import ViewDetails from "./components/ViewDetails";
import ViewDetails2 from "./components/ViewDetails2";
import SearchedMovieList from "./components/SearchedMovieList";
import SignIn from "./components/SignIn";
import ActorDetails from "./components/ActorDetails";
import DirectorDetails from "./components/DirectorDetails";
import SearchedActorDetails from "./components/SearchedActorDetails";
import SearchedDirectorDetails from "./components/SearchedDirectorDetails";
import Admin from "./components/Admin";
import Registration from "./components/Registration";
import MyProvider from "./components/MyProvider";

// import { Container } from "react-bootstrap";

class App extends React.Component {
  render() {
    // const PrivateRoute = ({ component: Component, ...rest }) => (
    //   <Route
    //     {...rest}
    //     render={props => (
    //       <MyContext.Consumer>
    //         {context =>
    //           context.authenticated === true ? (
    //             <Component {...props} />
    //           ) : (
    //             <Redirect to="/SignIn" />
    //           )
    //         }
    //       </MyContext.Consumer>
    //     )}
    //   />
    // );

    return (
      <Layout>
        <Router>
          <MyProvider>
            <NavigationBar />
            <Switch>
              <Route path="/TopMovies" exact component={TopMovies} />
              <Route path="/TopMovies/:id" component={ViewDetails} />
              <Route path="/ViewDetails/:id" component={ActorDetails} />

              <Route path="/ActorDetails" exact component={ActorDetails} />
              <Route
                path="/SearchedActorDetails"
                exact
                component={SearchedActorDetails}
              />
              <Route
                path="/SearchedDirectorDetails"
                exact
                component={SearchedDirectorDetails}
              />

              <Route
                path="/DirectorDetails"
                exact
                component={DirectorDetails}
              />

              <Route
                path="/SearchedMovieList"
                exact
                component={SearchedMovieList}
              />
              <Route path="/Registration" exact component={Registration} />
              <Route path="/SearchedMovieList/:id" component={ViewDetails2} />
              <Route path="/SignIn" component={SignIn} />
              <Route path="/Admin" component={Admin} />
              <Route path="/" component={Home} />

              <Route component={NoMatch} />
            </Switch>
          </MyProvider>
        </Router>
      </Layout>
    );
  }
}

export default App;
