import { uniqueId } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDataAttrs, getDataProps } from '../../dataUtils';
import style from './style.scss';

class RadioButton extends React.Component {
  value = () => {
    const { checked, value, fieldValue } = this.props;
    return checked || (fieldValue && value === this.props.fieldValue);
  };

  render() {
    const id = uniqueId('id');
    const wrapperClasses = cx(style.wrapper, {
      [style.isLarge]: this.props.isLarge,
      [style.disabled]: this.props.disabled,
    });

    return (
      <div {...getDataAttrs(this.props.data)}>
        <label htmlFor={id} className={wrapperClasses}>
          <input
            className={cx(style.original, {
              [style.disabled]: this.props.disabled,
            })}
            type="radio"
            id={id}
            name={this.props.name}
            onChange={this.props.onChange}
            checked={this.value()}
            value={this.props.fieldValue}
            disabled={this.props.disabled}
          />
          <div className={style.faux} />
          <div
            className={cx(style.text, {
              [style.disabled]: this.props.disabled,
            })}
          >
            {this.props.text}
          </div>
        </label>
        {this.props.description && (
          <span className={style.description}>{this.props.description}</span>
        )}
      </div>
    );
  }
}

RadioButton.defaultProps = {
  text: 'Option',
  name: 'radioButton',
};

RadioButton.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  isLarge: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string,
  fieldValue: PropTypes.string,
  disabled: PropTypes.bool,
  ...getDataProps(),
};

RadioButton.displayName = 'Plasma@RadioButton';

export default RadioButton;
