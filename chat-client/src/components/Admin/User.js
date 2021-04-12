import Button  from '../../form-components/Button'
const User = (props) => {

    const { nickName, dateCreated, userName, isAdmin, _id } = props;

    const onDeleteClick = (_id,nickName) =>{
        if (window.confirm(`Are you sure that you want to delete: ${nickName} ?`)){
            props.onDeleteCallback(_id);
        }
    }

    console.log('USER SubRender', props)
    return (
        <div className="ui card">

            <div className="content">
                <span className="header">{nickName}</span>
                <div className="meta">
                    <span className="date">{dateCreated}</span>
                </div>
                {isAdmin ? <span className="ui red ribbon label">Admin</span> : ''}
                <div className="description">
                    <p>username: {userName}</p>
                </div>
                {!isAdmin ? <Button onClick={()=>onDeleteClick(_id,nickName)} className="ui red basic button right floated">Delete User</Button> : null}
            </div>

        </div>

    )

};
export default User;