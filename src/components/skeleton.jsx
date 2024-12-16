import { Component } from 'react';

class Skeleton extends Component {
  render() {
    const { height, width, replicate = 1 } = this.props;
    const cantToRender = new Array(replicate).fill(undefined);

    return (
      <>
        {cantToRender.map((_val, index) => (
          <div
            key={`skeleton-${index}`}
            style={{ width, height }}
            className="skeleton"
          ></div>
        ))}
      </>
    );
  }
}

export default Skeleton;
