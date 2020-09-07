import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { API, graphqlOperation } from "aws-amplify";

const query = `
query {
  listRestaurants {
    items {
      id name description locationg
    }
  }
}
`;

function App() {
  const [restaurants, setRestaurants] = React.useState([]);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await API.graphql(graphqlOperation(query));
        setRestaurants(data.data.listRestaurants.items);
      } catch (error) {
        console.log(error)
      }
    };
    getData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {restaurants.map((rest, i) => (
          <p key={i}>{rest.name}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
