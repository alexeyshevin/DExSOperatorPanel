import React from "react";
import styled from "styled-components";

const ChangePasswordFormContainer = styled.div`
    width: 32%;
    height: 16%;
    position: relative;
    z-index: 2;
    display: block;
    margin: 0 auto;
    margin-top: 25%;
`;

type Props = {
    currentPassword: string | undefined;
    newPassword: string | undefined;
    valueToRepeat: string | undefined;
    onClose : () => void;
    onSave : () => void;
};

export const ChangePasswordForm = (props: Props) => {
    return (
        <ChangePasswordFormContainer>
            <div className="mb-3">
                <label htmlFor="currentPasswordInput" className="form-label">Current password</label>
                <input type="email" className="form-control" id="currentPasswordInput" placeholder="Current password" value={props.currentPassword} />
            </div>
            <div className="mb-3">
                <label htmlFor="newPasswordInput" className="form-label">New password</label>
                <input type="email" className="form-control" id="newPasswordInput" placeholder="New password" value={props.newPassword} />
            </div>
            <div className="mb-3">
                <label htmlFor="repeatPasswordInput" className="form-label">Repeat password</label>
                <input type="email" className="form-control" id="repeatPasswordInput" placeholder="Repeat Password" value={props.valueToRepeat} />
            </div>
            <button type="button" className="btn btn-primary">Save</button>
            <button
                type="button"
                className="btn btn-danger"
                style={{ marginLeft: "1rem" }}
                onClick={props.onClose}
            >
                Cancel
            </button>
        </ChangePasswordFormContainer>
    );
};
