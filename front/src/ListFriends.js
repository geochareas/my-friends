import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import escStringRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListFriends extends Component {
  static propTypes = {
    friends: PropTypes.array.isRequired,
    onDeleteFriend: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value.trim() });
  };

  clearQuery = (event) => {
    this.setState({ query: "" });
  };

  render() {
    const { friends, onDeleteFriend } = this.props;
    const { query } = this.state;
    let showingFriends;

    if (query) {
      const match = new RegExp(escStringRegExp(query), "i");
      showingFriends = friends.filter((friend) => match.test(friend.name));
    } else {
      showingFriends = friends;
    }

    showingFriends.sort(sortBy("name"));

    return (
      <div className="list-friends">
        <div className="list-friends-top">
          <input
            className="search-friends"
            type="text"
            placeholder="Search"
            value={query}
            onChange={this.handleChange}
          />
          <Link to="/create" className="add-friend">
            Add Friend
          </Link>
        </div>
        {/* {JSON.stringify(this.state)} */}

        {showingFriends.length !== friends.length && (
          <div className="showing-friends">
            <span>
              Now showing {showingFriends.length} of {friends.length}
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className="friend-list">
          {showingFriends.map((friend) => (
            <li key={friend.id} className="friend-list-item">
              <div
                className="friend-avatar"
                style={{
                  backgroundImage: `url(${friend.avatarURL})`,
                }}
              ></div>
              <div className="friend-details">
                <p>{friend.name}</p>
                <p>{friend.email}</p>
              </div>
              <button
                onClick={() => onDeleteFriend(friend)}
                className="friend-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListFriends;
