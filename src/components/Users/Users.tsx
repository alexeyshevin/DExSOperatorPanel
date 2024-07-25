import React from 'react';
import './users.scss';
import styled from 'styled-components';

export const Users = () => {
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
        </>
    );
};
