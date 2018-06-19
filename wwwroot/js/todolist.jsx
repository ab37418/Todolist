

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    loadUsersFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }

    componentDidMount() {
        this.loadUsersFromServer();
        window.setInterval(() => this.loadUsersFromServer(), this.props.pollInterval);
    }
    
    render() {  
            
        return (
            <div className="todoList">
                <h1>Todo Liste</h1>
                <UserList data={this.state.data} />
            </div>
        );
    }
}

class ItemList extends React.Component {
    render() {
        const itemNodes = this.props.data.map(item => (
            <Item title={item.title} key={item.id} description={item.description} owner={item.owner}>
            </Item>
        ));
        return (
            <div className="itemList">
                {itemNodes}
            </div>
        );
    }
}

class Item extends React.Component {
    render() {
        return (
            <div className="item">     
                <div>
                    <h3 className="itemTitle">{this.props.title}</h3>
                    <span className="itemDescription">{this.props.description}</span>
                </div>
            </div>
        );
    }
}

class UserList extends React.Component {
    render() {
        console.log("UserList : ");
       

        const userNodes = this.props.data.map(user => (  
            <div>
                <User name={user.owner} key={user.owner} email={user.email}>
                    {user.email}
                </User>
                <Item title={user.title} key={user.id} description={user.description}/>
            </div>
        ));
        return (
            <div className="userList">
                
                {userNodes}
            </div>
        );
    }
}

class User extends React.Component {
    render() {

        return (
            <div className="user">
                <h2 className="userName">{this.props.name}</h2>
                <span className="userEmail">{this.props.email}</span>
            </div>
        );
    }
}


ReactDOM.render(
    <TodoList url="/api/todolist/users" pollInterval={2000} />,
    document.getElementById('content')
);

