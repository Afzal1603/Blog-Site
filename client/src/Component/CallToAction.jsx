import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
const CallToAction = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 p-3 border-2 border-teal-200 rounded-3xl rounded-bl-none rounded-tr-none mt-10">
      <div className="flex flex-col flex-1 text-center p-3 gap-2 justify-center items-center">
        <h1 className="text-xl font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
          doloribus? Natus repudiandae exercitationem accusamus? Iste quidem qui
          neque deleniti sint eveniet nulla.
        </p>
        <Link to={"https://portfolio-ingenium.netlify.app/"} target="_blank">
          <Button
            gradientDuoTone="purpleToPink"
            className="w-full rounded-bl-none"
          >
            Lorem ipsum dolor sit amet.
          </Button>
        </Link>
      </div>
      <div className="flex flex-1 p-2 justify-center items-center ">
        <img
          className="rounded-xl rounded-bl-none rounded-tr-none"
          src="https://nordicapis.com/wp-content/uploads/A-Short-Guide-What-Types-of-Apps-Can-Be-Built-With-React.png"
        />
      </div>
    </div>
  );
};

export default CallToAction;
