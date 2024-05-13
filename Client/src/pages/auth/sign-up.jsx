import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import Instance from "@/configs/instance.js";
export function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const register = {
            username: name,
            email :email,
            password :password,
        };
        Instance
            .post("/api/Authenticate/register", register)
            .then((response) => {
                console.log(response)
                navigate("/login");
            })
            .catch((err) => console.log(err))
    };
  return (
      <section className="m-8 flex">
          <div className="w-2/5 h-full hidden lg:block">
              <img
                  src="/img/pattern.png"
                  className="h-full w-full object-cover rounded-3xl"
                  alt="img"
              />
          </div>
          <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
              <div className="text-center">
                  <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
                  <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
              </div>
              <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                  <div className="mb-1 flex flex-col gap-6">
                      <Typography className="-mb-3 font-medium">
                          User Name
                      </Typography>
                      <Input
                          type="text"
                          size="lg"
                          placeholder="Enter your user name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                              className: "before:content-none after:content-none",
                          }}
                      />
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                      <Typography className="-mb-3 font-medium">
                          Your email
                      </Typography>
                      <Input
                          type="email"
                          size="lg"
                          placeholder="name@mail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                              className: "before:content-none after:content-none",
                          }}
                      />
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                      <Typography  className="-mb-3 font-medium">
                          Your Password
                      </Typography>
                      <Input
                          type="password"
                          size="lg"
                          placeholder="*********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                              className: "before:content-none after:content-none",
                          }}
                      />
                  </div>


                  <Button type="submit" className="mt-6" fullWidth>
                      Register Now
                  </Button>


                  <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                      Already have an account?
                      <Link to="/login" className="text-gray-900 ml-1">Sign in</Link>
                  </Typography>
              </form>

          </div>
      </section>
  );
}

export default SignUp;
