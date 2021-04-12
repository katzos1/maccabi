const Room = (props) => {
    const { name, dateCreated } = props;

    return (
        <div className="ui card">

            <div className="content">
                <span className="header">{name}</span>
                <div className="meta">
                    <span className="date">{dateCreated}</span>
                </div>
            </div>
        </div>
    );
};
export default Room;