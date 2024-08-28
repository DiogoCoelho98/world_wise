const styles = {
    textAlign: "center",
    fontSize: "2rem",
    width: "80%",
    margin: "2rem auto",
    fontWeight: "600"
}

export default function Message({ message }) {
    return (
        <p style={styles}>
            <span role="img">
                👋
            </span>
            <br/> 
            {message}
        </p>
    );
}