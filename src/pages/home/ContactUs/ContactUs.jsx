import { Button } from "@material-tailwind/react";
import Header from "../../../components/Shared/Header";

const ContactUs = () => {
  return (
    <section>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <Header
            title={"Get in Touch with Us"}
            description={
              "Have questions? Contact us for quick assistance and support"
            }
          />

          <Button size="sm"
            onClick={() =>
              (window.location.href = "mailto:mdtalathunnabi@gmail.com")
            }
          >
            Contact Us
          </Button>
        </div>
      </div>

      <div className="container mx-auto 2xl:px-12">
        <img
          className="w-full mt-6"
          src="https://i.ibb.co.com/yBq0zrG/group-of-people.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default ContactUs;
