class ReactReduxComment extends React.Component {

    getInitials = (author) => {
        return author
            .split(" ")
            .map(word => word.substring(0, 1).toUpperCase())
            .join("");
    }

    render = () => {
        const {comment} = this.props;
        const time = formatTime(comment.datatime) + " " + formatDate(comment.datatime);
        return (
            <div className="comments-comment">
                <div className="comments-comment-header">
                    <div className="comments-comment-header-icon">
                        <img src={framework.resource("/img/profile-icon.png")}/>
                        <div className="comments-comment-header-icon-text">{this.getInitials(comment.author)}</div>
                    </div>
                    <div className="comments-comment-header-author">{comment.author}</div>
                    <div className="comments-comment-header-date">{time}</div>
                </div>
                <div className="comments-comment-content">
                    <div className="comments-comment-text">{comment.text}</div>
                    {
                        comment.photo && <div className="comments-comment-image"><img src={framework.resource("/img/" + comment.photo.small)}/></div>
                    }
                </div>
            </div>
        )
    }
}
