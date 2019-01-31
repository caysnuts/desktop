import * as React from 'react'
import { ToolbarButton, ToolbarButtonStyle } from './button'
import { OcticonSymbol } from '../octicons'
import { shell } from 'electron'
import { Commit } from '../../models/commit'
import { ICompareState } from '../../lib/app-state'

/** The button style. */

export interface IToolbarOpenIcodeCardProps {
  readonly commitLookup?: Map<string, Commit>
  readonly compareState?: ICompareState
}


/**
 * A general purpose toolbar button
 */
export class ToolbarOpenIcodeCard extends React.Component<IToolbarOpenIcodeCardProps, {}> {
  private selectCard?: React.RefObject<HTMLSelectElement>

  public constructor(props:any) {
    super(props)
    this.selectCard = React.createRef()
  }

  public render() {
    const cards = this.getCards()
    return (
      <div className={'toolbar-open-card'}>
        <ToolbarButton
          title={'卡片查看'}
          description={'浏览器打开'}
          className="toolbar-open-card-button"
          icon={this.getIcon()}
          iconClassName={''}
          style={ToolbarButtonStyle.Subtitle}
          onClick={this.OpenIcode}
          tooltip={undefined}
        >
        </ToolbarButton>
        {
          cards ?
            <select ref={this.selectCard}
                    className={'toolbar-open-card-select'}
            >
              <option value={''}>{'请选择卡片'}</option>
              {
                [...cards].map((value => {
                  return (
                    <option key={value} value={value}>{value}</option>
                  )
                }))
              }
            </select>
            :
            <div className={'toolbar-open-card-select'}>未找到卡片
            </div>
        }
      </div>
    )
  }

  private getIcon(): OcticonSymbol {
    return OcticonSymbol.browser
  }

  private getCards = () => {
    const commitLookup = this.props.commitLookup
    const compareState = this.props.compareState
    const commits = new Set()
    if (!compareState) {
      return
    }
    const commitSHAs = compareState.commitSHAs
    if (commitSHAs && commitSHAs.length > 10 && commitLookup) {
      let commitLatestIndex = 0
      for (const commitSHA of commitSHAs) {
        if (commitLatestIndex < 10) {
          const commit = commitLookup.get(commitSHA)
          if (commit) {
            const commitSumarry = commit.summary
            const isCard = this.isBxCard(commitSumarry)
            if (isCard) {
              commits.add(this.findCardString(commitSumarry))
            }
          }
        }
        commitLatestIndex = commitLatestIndex + 1
      }
    } else if (commitSHAs && commitSHAs.length > 0 && commitLookup) {
      for (const commitSHA of commitSHAs) {
        const commit = commitLookup.get(commitSHA)
        if (commit) {
          const commitSumarry = commit.summary
          const isCard = this.isBxCard(commitSumarry)
          if (isCard) {
            commits.add(this.findCardString(commitSumarry))
          }
        }
      }
    }
    return commits
  }

  private isBxCard = (summary: string) => {
    return summary.includes('Bxxfxd-')
  }

  private findCardString = (summary: string) => {
    return 'Bxxfxd-' + summary.split('Bxxfxd-')[1].slice(0, 5)
  }
  private OpenIcode = () => {
    if (this.selectCard && this.selectCard.current && this.selectCard.current.value) {
      shell.openExternal(`http://xiaolvyun.dev.bx/bxbank/icafe/issue/${this.selectCard.current.value}/show`)
    }
  }
}
