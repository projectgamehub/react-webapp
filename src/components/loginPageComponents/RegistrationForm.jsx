import { useEffect, useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";
import useRegisterForm from "../../utils/authFunctionsAndHooks/handleForm/useRegisterForm";

const RegistrationForm = () => {
    useEffect(() => {
        document.title = "Register - GameHub";
    }, []);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleRegisterFormSubmit = useRegisterForm();

    // TODO - Implement debouncing for username

    return (
        <>
            <h1>Register</h1>
            <form
                className="form-container"
                onSubmit={(e) => handleRegisterFormSubmit(e, inputs)}
                noValidate
            >
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            person
                        </span>
                    </div>
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            alternate_email
                        </span>
                    </div>
                    <input
                        placeholder="Username"
                        className="input-field"
                        type="text"
                        name="username"
                        value={inputs.username || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            lock
                        </span>
                    </div>
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </div>
                {/* TODO - Add show/Hide password feature */}
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            lock
                        </span>
                    </div>
                    <input
                        placeholder="Confirm password"
                        className="input-field"
                        type="password"
                        name="confirmPassword"
                        value={inputs.confirmPassword || ""}
                        onChange={handleChange}
                    />
                </div>
                <button className="submit-btn" type="submit">
                    Register
                </button>
            </form>
        </>
    );
};

export default RegistrationForm;
