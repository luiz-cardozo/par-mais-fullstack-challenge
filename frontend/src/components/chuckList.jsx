import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  Input,
  TextField,
  Button
} from "@parmais/par-ui-material";
import swagger from "../api";
import * as _ from "lodash";

/*
  TODO fetch data using the swagger API methods described in /docs
  hint:
  import swagger from '../api'
  swagger.then((client) => client.apis.facts.randomFact().then(console.log))
*/

class chuckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: {
        value: ""
      },
      categories: [],
      categorySelected: "",
      search: [],
      searchInput: ""
    };

    this.getRandom = this.getRandom.bind(this);
    this.searchFacts = this.searchFacts.bind(this);
  }

  getRandom() {
    const { categorySelected } = this.state;

    return swagger.then(client =>
      client.apis.facts
        .randomFact({ category: categorySelected })
        .then(response => {
          this.setState({ fact: response.body, search: [], searchInput: "" });
        })
    );
  }

  listCategories() {
    return swagger.then(client =>
      client.apis.facts.listCategories().then(response => {
        this.setState({ categories: response.body });
      })
    );
  }

  searchFacts() {
    const { searchInput } = this.state;
    if (searchInput.replace(/\s+/, "").length > 0) {
      return swagger.then(client =>
        client.apis.facts.search({ query: searchInput }).then(response => {
          this.setState({ search: response.body.result });
        })
      );
    }

    this.setState({ search: [] });
  }

  componentDidMount() {
    this.getRandom();
    this.listCategories();
  }

  render() {
    const {
      fact,
      search,
      searchInput,
      categories,
      categorySelected
    } = this.state;
    return (
      <div style={{ padding: "100px" }}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Paper style={{ padding: "100px", wordWrap: "break-word" }}>
              <Typography variant="body1">{fact.value}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="flex-end"
          spacing="40"
          direction="row"
          style={{ marginTop: "40px" }}
        >
          <Grid item>
            <Select
              label="Search by category"
              input={<Input name="category" id="category-helper" />}
              value={categorySelected}
              onChange={event => {
                this.setState({ categorySelected: event.target.value });
              }}
              style={{ width: "300px" }}
            >
              <MenuItem value={""}>Random category</MenuItem>
              {_.map(categories, category => (
                <MenuItem value={category}>{_.capitalize(category)}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Button
              onClick={this.getRandom}
              className={"button-random"}
              variant="contained"
            >
              <Typography
                variant="button"
                style={{
                  color: "#fff"
                }}
              >
                Random
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          spacing="40"
          direction="row"
        >
          <Grid item>
            <TextField
              required="{false}"
              id="standard-with-placeholder"
              helperText="See Chuck's thoughts"
              label="Search"
              placeholder="Search"
              margin="normal"
              value={searchInput}
              onChange={event => {
                this.setState({
                  searchInput: event.target.value
                });
              }}
              style={{ width: "300px" }}
            />
          </Grid>
          <Grid item>
            <Button onClick={this.searchFacts} variant="contained">
              <Typography
                variant="button"
                style={{
                  color: "#fff"
                }}
              >
                Search
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item style={{ maxWidth: "100%" }}>
            {_.map(search, (item, index) => (
              <Paper
                key={index}
                style={{
                  padding: "100px",
                  margin: "20px",
                  maxWidth: "100%"
                }}
              >
                <Typography style={{ wordWrap: "break-word" }} variant="body1">
                  {item.value}
                </Typography>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default chuckList;
