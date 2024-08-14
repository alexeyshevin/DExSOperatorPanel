import React, { useEffect, useState } from 'react';
import './create-user-form.scss';
import styled from 'styled-components';
import { IUserModel } from '../../../../interfaces/IUserModel';

const CreateUserFormContainer = styled.div`
    width: 32%;
    height: 24%;
    position: relative;
    top: 25%;
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
    passwordRepeat: string | undefined;
    onClose : () => void;
    onSave : () => void;
};

const roles = ["Root", "Operator"];

export const CreateUserForm = (props: Props) => {
    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const [secondName, setSecondName] = useState<string | undefined>(undefined);
    const [role, setRole] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [repeatPassword, setRepeatPassword] = useState<string | undefined>(undefined);
    const [newUser, setNewUser] = useState<IUserModel | undefined>(undefined);
    const [isPasswordEqual, setIsPasswordEqual] = useState<boolean>(false);

    const handleFirstName = (event: any) => {
        setFirstName(event.target.value);
        props.firstName = firstName;
    };

    const handleSecondName = (event: any) => {
        setSecondName(event.target.value);
        props.secondName = secondName;
    };

    const handleRole = (event:any) => {
        setRole(event.target.value);
        props.role = role;
    };

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
        props.password = password;
    };

    const handlePasswordRepeat = (event: any) => {
        setRepeatPassword(event.target.value);
        props.passwordRepeat = repeatPassword;
    };

    useEffect(() => {
        if (password !== repeatPassword) {
            setIsPasswordEqual(false);
        } else {
            setIsPasswordEqual(true);
        }
    }, [password, repeatPassword]);

    return (
        <CreateUserFormContainer>
            <div className="mb-3">
                <label htmlFor="firstNameInput" className="form-label">First name</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstNameInput"
                    placeholder="First name"
                    value={props.firstName!}
                    onChange={handleFirstName}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="secondNameInput" className="form-label">Second name</label>
                <input
                    type="text"
                    className="form-control"
                    id="secndNameInput"
                    placeholder="Second name"
                    value={props.secondName!}
                    onChange={handleSecondName}
                />
            </div>
            <div className="mb-3">
            <label htmlFor="roleSelect" className="form-label">Role</label>
                <RoleSelect id="roleSelect" defaultValue="" placeholder='Select role'>
                    {roles.map((value, id) => {
                        return <option
                            key={`${value}_${id}`}
                            value={props.role!}
                            onChange={handleRole}
                        >
                            {value}
                        </option>
                    })}
                </RoleSelect>
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input
                    type="text"
                    className="form-control"
                    id="passwordInput"
                    placeholder="Password"
                    value={props.password!}
                    onChange={handlePassword}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordRepeatInput" className="form-label">Repeat password</label>
                <input
                    type="text"
                    className="form-control"
                    id="passwordRepeatInput"
                    placeholder="Repeat password"
                    value={props.passwordRepeat}
                    onChange={handlePasswordRepeat}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={props.onSave}
                disabled={!isPasswordEqual}
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
