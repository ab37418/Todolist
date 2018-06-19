class UserList extends React.Component {
    render() {
        
        return (
            <div className="userList">
            Hei, jeg er en promp
            </div>
        );
    }
}

ReactDOM.render(
    <UserList />,
    document.getElementById('content')
);