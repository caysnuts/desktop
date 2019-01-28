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
  readonly isGerrit?: boolean
  readonly onChange?: (event: boolean) => void
}

/**
 * A general purpose toolbar button
 */
export class ToolbarCheckBox extends React.Component<IToolbarCheckBoxProps, {}> {


  private onChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event.currentTarget.checked)
    }
  }
  public render() {
    const className = classNames(
      'toolbar-gerrit-box',
      { 'has-progress': this.props.progressValue !== undefined },
      this.props.className
    )
    return (
      <div
        className={className}
      >
        <div className="toolbar-checkbox">
          <Checkbox value={this.props.isGerrit?CheckboxValue.On:CheckboxValue.Off} onChange={this.onChange}></Checkbox>
        </div>
        <div className="text">
          <div className="title">On Gerrit</div>
        </div>
      </div>
    )
  }

}
