import React, { Component } from 'react';
import Modal from '../HOC/Modal/Modal';
import { LoginForm } from './forms/LoginForm/LoginForm';
import { CreateUserForm } from './forms/CreateUserForm/CreateUserForm';
import { UpdateUserForm } from './forms/UpdateUserForm/UpdateUserForm';
import './users.scss';
import axios from 'axios';
import { userServiceUrl } from '../../services-urls';
import { IUserModel } from '../../interfaces/IUserModel';

interface IUsersContainerProps {
};

interface IUserState {
    userList: Array<IUserModel>;
    id: number | undefined;
    isEditUserFormOpen: boolean;
    isCreateUserFormOpen: boolean;
    isLoginFormOpen: boolean;
}

export class Users extends Component<IUsersContainerProps, IUserState> {
    private host: string = userServiceUrl;

    constructor (props: IUserState) {
        super(props);
        this.state = {
            userList: [],
            id: undefined,
            isEditUserFormOpen: false,
            isCreateUserFormOpen: false,
            isLoginFormOpen: false
        };
    };

    componentDidMount = () : void => {
        this.getAllUsers();
    };

    private handleShowCreateUserModal = () => this.setState({
        isCreateUserFormOpen: !this.state.isCreateUserFormOpen
    });

    private handleUserCreation = () => {
        this.setState({
            isCreateUserFormOpen: !this.state.isCreateUserFormOpen
        });
    };

    private handleShowEditUserForm = () => this.setState({
        isEditUserFormOpen: !this.state.isEditUserFormOpen
    });

    private handleShowLoginForm = () => this.setState({
        isLoginFormOpen: !this.state.isLoginFormOpen
    });

    private handleAddUserButtonClick = () => this.setState({
        isCreateUserFormOpen: true
    });

    // private login = () => {

    // };

    private getAllUsers = async () => {
        try {
            const response = await axios.get(`${this.host}/api/users`);
            this.setState({ userList: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    render () {
        return (
            <>
            <div className="table-responsive">
                <table className="table table-bordered table-condensed table-hover">
                    <thead>
                        <tr>
                            <th
                                style={{
                                    border: "none"
                                }}
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this.handleAddUserButtonClick}
                                >
                                    Add user
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Second Name</th>
                            <th>Role</th>
                            <th>Login Time</th>
                            <th>Edit</th>
                        </tr>
                        {this.state.userList.map((value, i) => {
                            return (
                                <tr key={`${value}_${i}`}>
                                    <th>{value.id}</th>
                                    <th>{value.firstName}</th>
                                    <th>{value.secondName}</th>
                                    <th>{value.role}</th>
                                    <th>{value.loginTime}</th>
                                    <th>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => this.setState({
                                                id: value.id,
                                                isEditUserFormOpen: !this.state.isEditUserFormOpen
                                            })}
                                        >
                                            Edit user
                                        </button>
                                    </th>
                                </tr>
                            )
                        })}
                    </thead>
                </table>
            </div>
            {/* {this.state.isLoginFormOpen && (
                <Modal>
                    <LoginForm
                        id={this.state.user?.id}
                        password={this.state.user?.password}
                        onLogin={this.login}
                        onClose={this.handleShowLoginForm}
                    />
                </Modal>
            )} */}
            {this.state.isCreateUserFormOpen && (
                <Modal>
                    <CreateUserForm
                        onCreate={this.handleUserCreation}
                        onClose={this.handleShowCreateUserModal}
                    />
                </Modal>
            )}
            {this.state.isEditUserFormOpen && (
                <Modal>
                    <UpdateUserForm
                        id={this.state.id!}
                        onSave={this.handleShowEditUserForm}
                        onClose={this.handleShowEditUserForm}
                    />
                </Modal>
            )}
        </>
        );
    }
};
