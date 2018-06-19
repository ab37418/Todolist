
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state= { data: [] };
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
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

    handleUserSubmit(user) {
        //submit to server and refresh list
        const data = new FormData();
        data.append('name', user.name);
        data.append('email', user.email);

        const xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = () => this.loadUsersFromServer();
        xhr.send(data);
    }
    
    componentDidMount() {
        this.loadUsersFromServer();
        window.setInterval(() => this.loadUsersFromServer(), this.props.pollInterval);
    }

    render() {

        return (
            <div>
                <UsersList data={this.state.data} />
                <AdduserForm />
            </div>
        );
    }
}

class UsersList extends React.Component {
    render() {
        console.log("UsersList : ");
        const userNodes = this.props.data.map(user => (
            
            <User name={user.name} key={user.id} email={user.email}>
                {user.email}
            </User>

        ));
        return (
            <ul className="userList" style={ulStyle}>
                {userNodes}
            </ul>
        );
    }
}

class User extends React.Component {

    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
      }
    
     
      handleClick = (e, data) => {
        // access to e.target here
        console.log("Klikket: ", e, data, this.props.name);
        //call the server to fetch items for user == this.props.name
        

    }

    render() {

        return (
            <li className="user" onClick={this.handleClick}  style={userListStyle}>
                <h2 className="userName">{this.props.name}</h2>
                <span className="userEmail">{this.props.email}</span>
            </li>
            
        );
    }
}

class AdduserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', email: ''};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        const name = this.state.name.trim();
        const email = this.state.email.trim();
        if(!name || !email) {
            return;
        }
        this.props.onUserSubmit({Name: name, Email: email});
        this.setState({name: '', email: ''});
    }

    render() {
        return (
            <form className="adduserForm" onSubmit={this.handleSubmit}>
                <div style={formStyle}> 
                    <label>User name: </label>
                    <input type="text" 
                           placeholder="User name" 
                           value={this.state.name} 
                           onChange={this.handleNameChange} 
                           style={inputStyle} />
                </div>
                <div style={formStyle}>
                    <label>Users e-mail: </label>
                    <input type="text" 
                           placeholder="user e-mail" 
                           value={this.state.email} 
                           onChange={this.handleEmailChange}
                           style={inputStyle} />
                </div>
                <input type="submit" value="Post"  style={buttonStyle}/>
            </form>
        );
    }
}
const ulStyle = {
    padding: 0
}
const userListStyle = {
    borderBottom: '1px solid #dbdbdb',
    color: '#007272',
    cursor: 'pointer',
    listStyle: 'none',
    padding: 10
};

const formStyle = {
    padding: 10
}

const inputStyle = {
    border: 'none',
    borderBottom: '1px solid #dbdbdb'
}

const buttonStyle = {
    background: '#007272',
    borderRadius: 5,
    color: '#FFF',
    padding: 10
}

ReactDOM.render(
    <Users  url="/api/users/getusers" submitUrl="/users/new" pollInterval={2000}/>,
    document.getElementById('users')
);