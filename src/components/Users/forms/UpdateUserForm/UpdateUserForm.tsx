import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IUserModel } from "../../../../interfaces/IUserModel";
import axios from "axios";
import { userServiceUrl } from "../../../../services-urls";

const UpdateUserFormContainer = styled.div`
    width: 32%;
    height: 16%;
    position: relative;
    top: 25%;
    z-index: 2;
    display: block;
    margin: 0 auto;
`;

type Props = {
    id: number;
    onClose : () => void;
    onSave : () => void;
};

export const UpdateUserForm = (props: Props) => {
    const [newFirstName, setNewFirstName] = useState<string | undefined>(undefined);
    const [newSecondName, setNewSecondName] = useState<string| undefined>(undefined);
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
    const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>(undefined);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUserModel | undefined>(undefined);

    const handleFirstNameInput = (event: any) => setNewFirstName(event.target.value);

    const handleSecondNameInput = (event: any) => setNewSecondName(event.target.value);

    const handlePasswordInput = (event: any) => setNewPassword(event.target.value);

    const handlePasswordConfirm = (event: any) => setPasswordConfirm(event.target.value);

    const getUser = async () => {
        const userId = props.id;
        try {
            const response = await axios.get(`${userServiceUrl}/api/user?id=${userId}`);
            setCurrentUser(response.data);
            console.log(currentUser);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const updateUser = async () => {
        try {
            const config = {
                firstName: newFirstName,
                secondName: newSecondName,
                password: newPassword
            };

            await axios.put(`${userServiceUrl}/api/user`, config);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (
            newPassword === undefined ||
            passwordConfirm === undefined ||
            newPassword !== passwordConfirm
        ) {
            setIsSaveButtonDisabled(false);
        } else {
            setIsSaveButtonDisabled(true);
        }
    }, [newPassword, passwordConfirm]);

    return (
        <UpdateUserFormContainer>
            <div className="mb-3">
                <label
                    htmlFor="newFirstNameInput"
                    className="form-label"
                >
                    New first name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="newFirstNameInput"
                    placeholder="New first name"
                    value={newFirstName}
                    onChange={handleFirstNameInput}
                />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="newSecondNameInput"
                    className="form-label"
                >
                    Current password
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="newSecondNameInput"
                    placeholder="New second name"
                    value={newSecondName}
                    onChange={handleSecondNameInput}
                />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="newPasswordInput"
                    className="form-label"
                >
                    New password
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="newPasswordInput"
                    placeholder="New password"
                    value={newPassword}
                    onChange={handlePasswordInput}
                />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="confirmPasswordInput"
                    className="form-label"
                >
                    Repeat password
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder="Confirm new password"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirm}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                disabled={isSaveButtonDisabled}
                onClick={updateUser}
            >
                Save
            </button>
            <button
                type="button"
                className="btn btn-danger"
                style={{ marginLeft: "1rem" }}
                onClick={props.onClose}
            >
                Cancel
            </button>
        </UpdateUserFormContainer>
    );
};
