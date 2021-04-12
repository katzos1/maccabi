const Loading = (props) => {
    return (
        <div className="ui container segment">
        <div id="loading" style={{height:'70px'}} className="ui active inverted dimmer">
          <div className="ui text loader">{props.text}</div>
        </div>
        <p></p>
      </div>
    )
}

Loading.defaultProps = {
  text:'Loading'
};

export default Loading;