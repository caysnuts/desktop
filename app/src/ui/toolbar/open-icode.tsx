import * as React from 'react'
import { ToolbarButton, ToolbarButtonStyle } from './button'
import { OcticonSymbol } from '../octicons'
import { shell } from 'electron'

/** The button style. */

export interface IToolbarOpenIcodeProps {
  readonly remoteUrl?: string
  readonly branchName?: string
}

/**
 * A general purpose toolbar button
 */
export class ToolbarOpenIcode extends React.Component<IToolbarOpenIcodeProps, {}> {


  public render() {
    return (
      <ToolbarButton
        title={'效率云查看'}
        description={'浏览器打开'}
        className="push-pull-button"
        icon={this.getIcon()}
        iconClassName={''}
        style={ToolbarButtonStyle.Subtitle}
        onClick={this.OpenIcode}
        tooltip={undefined}
      >
        {/*{this.renderAheadBehind()}*/}
      </ToolbarButton>
    )
  }

  private getIcon(): OcticonSymbol {
    return OcticonSymbol.browser
  }

  private OpenIcode = () => {
    const remoteUrl = this.props.remoteUrl || ''
    const branchName = this.props.branchName || ''
    if (remoteUrl !== null) {
      const iCodeBranchUrl = remoteUrl.split('@')[1]
      if (iCodeBranchUrl) {
        const iCodeBranchUrlSpitArr=iCodeBranchUrl.split('/git/')
        const iCodeUrl = iCodeBranchUrlSpitArr[0] + '/bxbank/icode/repo/'+ iCodeBranchUrlSpitArr[1].replace(/\//g,'%2F')+'/files/'+branchName+'/tree/';
        shell.openExternal(`http://${iCodeUrl}`)
      }
    }
  }
}
