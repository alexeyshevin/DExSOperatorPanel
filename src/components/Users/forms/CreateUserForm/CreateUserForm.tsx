import React, { useState } from 'react';
import './create-user-form.scss';
import styled from 'styled-components';

const CreateUserFormContainer = styled.div`
    width: 32%;
    height: 24%;
    position: relative;
    z-index: 2;
    display: block;
    margin: 0 auto;
`;

// TODO: create reusable select component
const RoleSelect = styled.select`
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
`;

type Props = {
    firstName: string | undefined;
    secondName: string | undefined;
    role: string | undefined;
    password: string | undefined;
    onClose : () => void;
    onSave : () => void;
};

const roles = ["Root", "Operator", "Guest"]; // temporary desicion

export const CreateUserForm = (props: Props) => {
    const [passwordToRepeat, setPasswordToRepeat] = useState<string | undefined>(undefined);
    const [isPasswordEqual, setIsPasswordEqual] = useState<boolean>(false);

    return (
        <CreateUserFormContainer>
            <div className="mb-3">
                <label htmlFor="firstNameInput" className="form-label">First name</label>
                <input type="email" className="form-control" id="firstNameInput" placeholder="First name" value={props.firstName} />
            </div>
            <div className="mb-3">
                <label htmlFor="secondNameInput" className="form-label">Second name</label>
                <input type="email" className="form-control" id="secndNameInput" placeholder="Second name" value={props.secondName} />
            </div>
            <div className="mb-3">
            <label htmlFor="roleSelect" className="form-label">Role</label>
                <RoleSelect id="roleSelect">
                    <option selected>Role...</option>
                    {roles.map((value, id) => {
                        return <option key={`${value}_${id}`}>{value}</option>
                    })}
                </RoleSelect>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type="email" className="form-control" id="passwordInput" placeholder="Password" value={props.password} />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordRepeatInput" className="form-label">Repeat password</label>
                <input type="email" className="form-control" id="passwordRepeatInput" placeholder="Repeat password" value={passwordToRepeat} />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={props.onSave}
            >
                Create user
            </button>
            <button
                type="button"
                className="btn btn-danger"
                style={{ marginLeft: "1rem" }}
                onClick={props.onClose}
            >
                Cancel
            </button>
        </CreateUserFormContainer>
    );
};
