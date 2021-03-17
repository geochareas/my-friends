import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListFriends from "./ListFriends";
import CreateFriend from "./CreateFriend";
import * as FriendsAPI from "./utils/FriendsAPI";


class App extends Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    FriendsAPI.getAll().then((friends) =>
      this.setState({
        friends: friends,
      })
    );
  }

  removeFriend = (friend) => {
    this.setState((state) => ({
      friends: state.friends.filter((c) => c.id !== friend.id),
    }));

    FriendsAPI.remove(friend);
  };

  createFriend = (friend) => {
    FriendsAPI.create(friend).then((friend) => {
      this.setState((state) => ({
        friends: state.friends.concat([friend]),
      }));
    });
  };

  render() {
   
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListFriends
              onDeleteFriend={this.removeFriend}
              friends={this.state.friends}
            />
          )}
        ></Route>
        <Route
          path="/create"
          render={({ history }) => (
            <CreateFriend
              onCreateFriend={(friend) => {
                this.createFriend(friend);
                history.push("/");
              }}
            />
          )}
        ></Route>
      </div>
    );
  }
}

export default App;
