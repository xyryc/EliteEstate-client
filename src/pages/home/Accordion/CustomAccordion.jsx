import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Header from "../../../components/Shared/Header";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function CustomAccordion() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Header
        title={"Real Estate Insights"}
        description={
          "Find Clarity on Real Estate with Our Comprehensive FAQ Section"
        }
      />

      <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          What important factors should I consider when buying a property for
          investment?
        </AccordionHeader>
        <AccordionBody>
          When buying a property for investment, consider factors like the
          location's growth potential, property price trends, and the
          surrounding amenities. Research the neighborhood's safety, proximity
          to schools, transportation options, and future developments. Make sure
          the property aligns with your long-term goals, whether you're looking
          for rental income, resale value, or personal use.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={CUSTOM_ANIMATION}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How can I evaluate if a property is a good investment opportunity in
          the long run?
        </AccordionHeader>
        <AccordionBody>
          To evaluate a property's investment potential, look at its past price
          history, future market trends, and rental demand. Research the area’s
          development plans and infrastructure projects that may increase the
          property's value. Additionally, consider the property's condition,
          age, and maintenance costs. Work with experts like real estate agents
          and financial advisors to get accurate insights on whether the
          investment aligns with your portfolio goals.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={CUSTOM_ANIMATION}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Can I schedule a property viewing directly through your website or do
          I need to call first?
        </AccordionHeader>
        <AccordionBody>
          Yes, you can easily schedule a property viewing directly through our
          website by selecting your preferred time and date. You can also reach
          out to our team via email or phone call if you have any specific
          questions or need assistance in choosing the right property for
          viewing. Our team will promptly confirm the viewing schedule and
          assist you throughout the process.
        </AccordionBody>
      </Accordion>
    </div>
  );
}
