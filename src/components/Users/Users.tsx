import React, { Component } from 'react';
import Modal from '../HOC/Modal/Modal';
import { LoginForm } from './forms/LoginForm/LoginForm';
import { CreateUserForm } from './forms/CreateUserForm/CreateUserForm';
import { ChangePasswordForm } from './forms/UpdateUserForm/ChangePasswordForm';
import './users.scss';
import axios from 'axios';
import { userServiceUrl } from '../../services-urls';

export class Users extends Component {
    private showCreateUserForm: boolean;
    private showLoginForm: boolean;
    private showChangePasswordForm: boolean;
    private host: string = userServiceUrl;

    constructor (props: any) {
        super(props);
        this.state = {
            userList: []
        };
        this.showChangePasswordForm = false;
        this.showLoginForm = false;
        this.showCreateUserForm = false;
        this.getAllUsers();
    };

    private handleShowCreateUserModal = () => !this.showCreateUserForm;
    private handleShowLoginForm = () => !this.showLoginForm;
    private handleChangePasswordForm = () => !this.showChangePasswordForm;

    private createUser = () => {

    };

    private getUser = () => {

    };

    private getAllUsers = async () => {
        try {
            const response = await axios.get(`${this.host}/api/users`);
            this.setState({ userList: response.data });
            console.log(response.data);
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
                            <th>First Name</th>
                            <th>Second Name</th>
                            <th>Role</th>
                            <th>Last Login Time</th>
                            {/* <th>
                                <button type="button" className="btn btn-primary">Change</button>
                                <button type="button" className="btn btn-danger" style={{ marginLeft: "1rem" }}>Delete</button>
                            </th> */}
                        </tr>
                    </thead>
                </table>
            </div>
            {/* {this.showLoginForm && (
                <Modal>
                    <LoginForm />
                </Modal>
            )}
            {this.showCreateUserForm && (
                <Modal>
                    <CreateUserForm />
                </Modal>
            )}
            {this.showChangePasswordForm && (
                <Modal>
                    <ChangePasswordForm />
                </Modal>
            )} */}
        </>
        );
    }
};
