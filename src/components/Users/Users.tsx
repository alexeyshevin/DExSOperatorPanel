import React, { useState } from 'react';
import Modal from '../HOC/Modal/Modal';
import { LoginForm } from './forms/LoginForm/LoginForm';
import { CreateUserForm } from './forms/CreateUserForm/CreateUserForm';
import './users.scss';

export const Users = () => {
    const [showCreateUserForm, setShowCreateUserForm] = useState<boolean>(false);
    const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

    const handleShowCreateUserModal = () => setShowCreateUserForm(!showCreateUserForm);
    const handleShowLoginForm = () => setShowLoginForm(!showLoginForm);

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
        </>
    );
};
