import * as React from 'react'
import * as classNames from 'classnames'
import { Checkbox, CheckboxValue } from '../lib/checkbox'

/** The button style. */
export enum ToolbarCheckStyle {
  /** The default style with the description above the title. */
  Standard,

  /** A style in which the description is below the title. */
  Subtitle,
}

export interface IToolbarCheckBoxProps {
  /**
   * An optional classname that will be appended to the default
   * class name 'toolbar-button'
   */
  readonly className?: string

  /** The button's style. Defaults to `ToolbarButtonStyle.Standard`. */

  /**
   * An optional progress value as a fraction between 0 and 1. Passing a number
   * greater than zero will render a progress bar background in the toolbar
   * button. Use this to communicate an ongoing operation.
   *
   * Consumers should not rely solely on the visual progress bar, they should
   * also implement alternative representation such as showing a percentage
   * text in the description or title along with information about what
   * operation is currently in flight.
   */
  readonly progressValue?: number

}

/**
 * A general purpose toolbar button
 */
export class ToolbarCheckBox extends React.Component<IToolbarCheckBoxProps, {}> {

  public render() {
    const className = classNames(
      'toolbar-checkbox',
      { 'has-progress': this.props.progressValue !== undefined },
      this.props.className
    )
    return (
      <div
        className={className}
      >
        <div className="checkbox">
          <Checkbox value={CheckboxValue.On}></Checkbox>
          <div className="status">On</div>
        </div>
        <div className="text">
          <div className="title">Gerrit</div>
        </div>
      </div>
    )
  }

}
