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

interface IUsersState {
    userList: Array<IUserModel>;
    isChangePasswordFormOpen: boolean;
    isCreateUserFormOpen: boolean;
    isLoginFormOpen: boolean;
}

export class Users extends Component<IUsersContainerProps, IUsersState> {
    private host: string = userServiceUrl;

    constructor (props: any) {
        super(props);
        this.state = {
            userList: [],
            isChangePasswordFormOpen: false,
            isCreateUserFormOpen: false,
            isLoginFormOpen: false
        };
        this.getAllUsers();
    };

    private handleShowCreateUserModal = () => this.setState({ isCreateUserFormOpen: !this.state.isCreateUserFormOpen });
    private handleShowLoginForm = () => this.setState({ isLoginFormOpen: !this.state.isLoginFormOpen });
    private handleChangePasswordForm = () => this.setState({ isChangePasswordFormOpen: !this.state.isChangePasswordFormOpen });

    private createUser = () => {

    };

    private getUser = () => {

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
                    <LoginForm />
                </Modal>
            )}
            {this.state.isCreateUserFormOpen && (
                <Modal>
                    <CreateUserForm />
                </Modal>
            )}
            {this.state.isChangePasswordFormOpen && (
                <Modal>
                    <ChangePasswordForm />
                </Modal>
            )}
        </>
        );
    }
};
