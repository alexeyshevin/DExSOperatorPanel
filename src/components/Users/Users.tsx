import React, { useEffect, useState } from 'react';
import Modal from '../HOC/Modal/Modal';
import { LoginForm } from './forms/LoginForm/LoginForm';
import { CreateUserForm } from './forms/CreateUserForm/CreateUserForm';
import { ChangePasswordForm } from './forms/UpdateUserForm/ChangePasswordForm';
import { api } from './api';
import './users.scss';

export const Users = () => {
    const [showCreateUserForm, setShowCreateUserForm] = useState<boolean>(false);
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState<boolean>(false);
    const [data, setData] = useState<object | undefined>(undefined); // test instance

    const handleShowCreateUserModal = () => setShowCreateUserForm(!showCreateUserForm);
    const handleShowLoginForm = () => setShowLoginForm(!showLoginForm);
    const handleChangePasswordForm = () => setShowChangePasswordForm(!showChangePasswordForm);

    // fetch data testing
    useEffect(() => {
        const userApi = new api();
        userApi.create();
        userApi.getAll()
            .then(resp => resp.data)
            .then(data => setData(data));
    }, []);

    console.log(data);

    const createUser = () => {};

    const getUser = () => {};

    const updatePassword = () => {};

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
                        </tr>
                    </thead>
                </table>
            </div>
            {showLoginForm && (
                <Modal>
                    <LoginForm />
                </Modal>
            )}
            {showCreateUserForm && (
                <Modal>
                    <CreateUserForm />
                </Modal>
            )}
            {showChangePasswordForm && (
                <Modal>
                    <ChangePasswordForm />
                </Modal>
            )}
        </>
    );
};
