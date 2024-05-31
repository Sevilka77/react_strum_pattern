import { Component } from 'react';
import "./visual.css"
import { ArrowUpFromDot } from "lucide-react"

class Visual extends Component {
  render() {
    return <ArrowUpFromDot className={this.props.toggleStart} style={{
      height: 27,
      animationDuration: `${this.props.swing}s`
    }} />
  }
}

export default Visual;

