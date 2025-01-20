import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Header from "../../../components/Shared/Header";

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Start the animation only once when it becomes visible
    threshold: 0.5, // Adjust the visibility threshold (50% of the element visible)
  });

  return (
    <div>
      <Header
        title={"Excellence in Numbers"}
        description={"A testament to our journey, growth, and accomplishments"}
      />

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center text-center"
      >
        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={5000} duration={3} suffix="+" />}
          </p>
          <p className="text-lg">Properties Sold</p>
        </div>

        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={10000} duration={3} suffix="+" />}
          </p>
          <p className="text-lg">Satisfied Clients</p>
        </div>

        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={300} duration={4} suffix="+" />}
          </p>
          <p className="text-lg">Trusted Agents</p>
        </div>

        <div>
          <p className="text-[56px] font-bold">
            {inView && <CountUp end={15} duration={6} suffix="+" />}
          </p>
          <p className="text-lg">Years of Excellence</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
