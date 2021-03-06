import cx from 'classnames';
import { map } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { getDataAttrs, getDataProps } from '../../dataUtils';
import OverflowMenuItem from './OverflowMenuItem.jsx';
import style from './style.scss';

const direction = { RIGHT: 'right', LEFT: 'left' };

class OverflowMenu extends React.Component {
  state = {
    revealed: false,
  };

  handleMouseEnter = () => {
    if (!this.props.disabled) {
      this.setState({ revealed: true });
    }
  };

  handleMouseLeave = () => {
    this.setState({ revealed: false });
  };

  handleClick = event => {
    this.setState({ revealed: false });
    this.props.onClick(event);
  };

  renderLabel = () => {
    const { label } = this.props;
    if (label) {
      return <div className={style.labelWithText}>{label} &#9662;</div>;
    }

    return <div className={style.overflow} />;
  };

  render() {
    const revealableStyle = cx(style.revealable, {
      [style.revealed]: this.state.revealed,
    });
    const revealableListStyle = cx(style.revealableList, {
      [style.openLeft]: this.props.openDirection && this.props.openDirection === direction.LEFT,
    });
    return (
      <div
        {...getDataAttrs(this.props.data)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={style.container}
      >
        <div className={style.action}>{this.renderLabel()}</div>
        <div className={revealableStyle}>
          <div className={style.revealableTopWrapper}>
            <div className={style.revealableTop}>{this.renderLabel()}</div>
          </div>
          <ol className={revealableListStyle}>
            {map(this.props.options, option => {
              return (
                <OverflowMenuItem
                  key={option.key}
                  optionKey={option.key}
                  text={option.text}
                  onClick={this.handleClick}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

OverflowMenu.defaultProps = {
  options: [],
  openDirection: direction.RIGHT,
};

OverflowMenu.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
  openDirection: PropTypes.oneOf([direction.LEFT, direction.RIGHT]),
  label: PropTypes.string,
  ...getDataProps(),
};

OverflowMenu.displayName = 'Plasma@OverflowMenu';

export default OverflowMenu;
