import React from "react";
import type { CardState, IData } from "../../Data/data";
import "./Card.scss";

class Card extends React.Component<IData, CardState> {
  constructor(props: IData) {
    super(props);
    this.state = {
      imgError: false,
    };
  }

  render() {
    return (
      <li className="card-wrapper" data-testid="card">
        <div className="card-image-box">
          {this.props.images?.web?.url && !this.state.imgError ? (
            <img
              src={this.props.images.web.url}
              alt={this.props.title}
              onError={() => this.setState({ imgError: true })}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">Image not available</div>
          )}
        </div>
        <h3>
          Author:{" "}
          <i className="card-value">
            {this.props.creators?.[0]?.description || "Unknown"}
          </i>
        </h3>
        <h3>
          Name: <i className="card-value">{this.props.title}</i>
        </h3>
        <h3>
          Year:{" "}
          <i className="card-value">{this.props.creation_date || "Unknown"}</i>
        </h3>
      </li>
    );
  }
}

export { Card };
