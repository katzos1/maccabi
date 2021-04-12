import { useEffect } from "react";

const ChatMessages = (props) => {
    const { messages, myUserId } = props;
    const renderStatusMessage = (statusMessage) =>{

        if (statusMessage===0)
              return <svg className="push-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>;
        else if (statusMessage===1)
            return <svg className="push-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>;       
         
        else if (statusMessage===2)
            return <svg className="push-right" style ={{color:  '#4fc3f7'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0-.063-.51z"></path></svg>;

         return null;
    }

    //auto scroll
    useEffect(()=>{
        window.scrollTo(0,window.outerHeight + 500);
    });

    return (
        <div id="chat-messages">
            <ul>
                {messages.map(c => {
                    const isMyMessage = c.userId===myUserId;

                    return (
                        <div key={c.messageId} className={`ui cards ${isMyMessage? 'my-message': 'user-message'}`}>
                            <div className="card">
                                <div className="content">
                                    <div className="header">
                                        {c.nickName}
                                    </div>
                                    <div className="meta">
                                        {c.sentTime}
                                    </div>
                                    <div className="description">
                                        {c.message}
                                        {isMyMessage? renderStatusMessage(c.statusMessage) : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
};

export default ChatMessages;
