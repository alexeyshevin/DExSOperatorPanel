import React from "react";
import axios from "axios";

export class api {
    public create = () => axios.create({
        baseURL: "http://localhost:5005",
        timeout: 1000,
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    public getAll = () => axios.get("/get-all");
};