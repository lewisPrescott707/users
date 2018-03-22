import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { InputForm } from './InputForm';

// Step 1: Add an interface 
interface CounterState {
    name: string;
}

interface FetcUsersDataState {
    users: User[];
    loading: boolean;
}

interface User {
    name: string;
    surname: string;
}

interface UsersState {
    users: Array<User>;
    newUser: User;
    loading: boolean;
}

export class ChangeYourName extends React.Component<RouteComponentProps<{}>, UsersState> {
    constructor() {
        super();

        // Step 2: Set the initial state 
        this.state = {
            users: [],
            newUser: {
                name: '',
                surname: '',
            },
            loading: false,
        };

        // Step 4: Declare the event handlers on constructor
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch('api/users/')
            .then(response => response.json() as Promise<Array<User>>)
            .then(data => {
                this.setState({ users: data, loading: false });
            });
    }

    public render() {

        // Step 3 Add the for code
        let users: Array<User> = this.state.users;
        return <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) =>
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <form onSubmit={this.handleSubmit}>
                <InputForm name='name' value='' onValueChange={this.handleChange} />
                <InputForm name='surname' value='' onValueChange={this.handleChange} />
                <button>
                    Submit
            </button>
            </form>
        </div>;
    }

    // Step 4
    handleChange(input: any) {
        if (input.name !== '') {
            let userToChange = this.state.newUser;

            if (input.name === "surname") {
                userToChange.surname = input.value;
            } else {
                userToChange.name = input.value;
            }

            this.setState({ newUser: userToChange });
        }
    }

    // 
    handleSubmit(event: any) {
        console.log(this.state);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        return fetch('api/users/', {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(this.state.newUser)
        }).then((response) => {
            return response.json();
        });
    }
}