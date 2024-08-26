import {useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton() {
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        navigate(-1);
    }

    return <Button type="back" onClick={handleClick}>&larr; Back</Button>

}