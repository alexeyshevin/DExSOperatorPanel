import React, { Component } from 'react';
import Modal from '../HOC/Modal/Modal';
import { LoginForm } from './forms/LoginForm/LoginForm';
import { CreateUserForm } from './forms/CreateUserForm/CreateUserForm';
import { ChangePasswordForm } from './forms/UpdateUserForm/ChangePasswordForm';
import './users.scss';
import axios from 'axios';
import { userServiceUrl } from '../../services-urls';
import { IUserModel } from '../../interfaces/IUserModel';

interface IUsersContainerProps {
};

interface IUserState {
    userList: Array<IUserModel>;
    user: IUserModel | undefined;
    isChangePasswordFormOpen: boolean;
    isCreateUserFormOpen: boolean;
    isLoginFormOpen: boolean;
    newPassword: string | undefined;
    valueToRepeat: string | undefined;
}

export class Users extends Component<IUsersContainerProps, IUserState> {
    private host: string = userServiceUrl;

    constructor (props: IUserState) {
        super(props);
        this.state = {
            userList: [],
            user: undefined,
            isChangePasswordFormOpen: false,
            isCreateUserFormOpen: false,
            isLoginFormOpen: false,
            newPassword: undefined,
            valueToRepeat: undefined
        };

        this.getAllUsers();
    };

    private handleShowCreateUserModal = () => this.setState({
        isCreateUserFormOpen: !this.state.isCreateUserFormOpen
    });

    private handleShowLoginForm = () => this.setState({
        isLoginFormOpen: !this.state.isLoginFormOpen
    });

    private handleChangePasswordForm = () => this.setState({
        isChangePasswordFormOpen: !this.state.isChangePasswordFormOpen
    });

    private handleAddUserButtonClick = () => this.setState({
        isCreateUserFormOpen: true
    });

    private createUser = async () => {
        try {
            const config = {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                data: {
                    firstName: this.state.user?.firstName,
                    secondName: this.state.user?.secondName,
                    role: this.state.user?.role,
                    password: this.state.user?.password
                }
            };

            await axios.post(`${this.host}/api/user`, config);
            this.handleShowCreateUserModal();
        } catch (error) {
            console.log(error);
        }
    };

    private getUser = () => {

    };

    private login = () => {

    };

    private getAllUsers = async () => {
        try {
            const response = await axios.get(`${this.host}/api/users`);
            this.setState({ userList: response.data });
            console.log(this.state.userList);
        } catch (error) {
            console.log(error);
        }
    };

    private updatePassword = () => {

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
                            <th>Actions</th>
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
                                            onClick={this.handleChangePasswordForm}
                                        >
                                            Change password
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            style={{ marginLeft: "4px" }}
                                        >
                                            Delete
                                        </button>
                                    </th>
                                </tr>
                            )
                        })}
                    </thead>
                </table>
            </div>
            {this.state.isLoginFormOpen && (
                <Modal>
                    <LoginForm
                        id={this.state.user?.id}
                        password={this.state.user?.password}
                        onLogin={this.login}
                        onClose={this.handleShowLoginForm}
                    />
                </Modal>
            )}
            {this.state.isCreateUserFormOpen && (
                <Modal>
                    <CreateUserForm
                        firstName={this.state.user?.firstName}
                        secondName={this.state.user?.secondName}
                        role={this.state.user?.role}
                        password={this.state.user?.password}
                        onSave={this.createUser}
                        onClose={this.handleShowCreateUserModal}
                    />
                </Modal>
            )}
            {this.state.isChangePasswordFormOpen && (
                <Modal>
                    <ChangePasswordForm
                        valueToRepeat={this.state.valueToRepeat}
                        currentPassword={this.state.user?.password}
                        newPassword={this.state.newPassword}
                        onSave={this.updatePassword}
                        onClose={this.handleChangePasswordForm}
                    />
                </Modal>
            )}
        </>
        );
    }
};
