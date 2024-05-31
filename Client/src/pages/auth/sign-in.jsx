import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Instance from "@/configs/instance.js";
import getUserRole from "@/configs/userRole.js";

export function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });

    function handleSubmit(event) {
        event.preventDefault();

        setError({ email: '', password: '' });

        let hasError = false;
        if (!email) {
            setError((prev) => ({ ...prev, email: 'Email is required' }));
            hasError = true;
        }
        if (!password) {
            setError((prev) => ({ ...prev, password: 'Password is required' }));
            hasError = true;
        }

        if (hasError) return;

        const login = { email, password };

        Instance.post("/api/Authenticate/login", login)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                if (token) {
                    Instance.defaults.headers.Authorization = `Bearer ${token}`;
                }
                const userRole = getUserRole();
                if (userRole === "Admin") {
                    navigate("/dashboard/home");
                } else if (userRole === "User") {
                    navigate("/home");
                } else {
                    console.log("Invalid role or no role specified");
                }
            })
            .catch(() => {
                setError((prev) => ({ ...prev, email: 'Invalid email or password' }));
            });
    }

    return (
        <section className="m-8 flex gap-4">
            <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Your email
                        </Typography>
                        <Input
                            type="email"
                            size="lg"
                            placeholder="name@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${error.email && '!border-red-500'}`}
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {error.email && <Typography variant="small" color="red">{error.email}</Typography>}
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${error.password && '!border-red-500'}`}
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {error.password && <Typography variant="small" color="red">{error.password}</Typography>}
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center justify-start font-medium"
                            >
                                I agree to the&nbsp;
                                <a
                                    href="#"
                                    className="font-normal text-black transition-colors hover:text-gray-900 underline"
                                >
                                    Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button type="submit" className="mt-6" fullWidth>
                        Sign In
                    </Button>

                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                        Not registered?
                        <Link to="/register" className="text-gray-900 ml-1">Create account</Link>
                    </Typography>
                </form>
            </div>
            <div className="w-2/5 h-full hidden lg:block">
                <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" alt="img" />
            </div>
        </section>
    );
}

export default SignIn;
