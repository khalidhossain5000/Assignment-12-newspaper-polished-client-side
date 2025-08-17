import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
const subscriptionOptions = [
  { duration: "1 minitue", price: 49 },
  { duration: "5 days", price: 99 },
  { duration: "10 days", price: 149 },
];

const Subscription = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const selectedDuration = watch("duration");
  const selectedPlan = subscriptionOptions.find(
    (p) => p.duration === selectedDuration
  );
  //   console.log("this is duration",selectedDuration,'selectd plsn',selectedPlan);
  const onSubmit = () => {
    navigate("/payment", {
      state: {
        amount: selectedPlan?.price,
        duration: selectedPlan?.duration,
      },
    });
  };
  return (
    <div className="bg-light-primary dark:bg-dark-primary">
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-tr from-light-text/5 via-light-primary to-light-secondary flex items-center justify-center relative overflow-hidden dark:from-dark-primary dark:via-dark-secondary dark:to-dark-secondary">
        <div className="text-center px-4">
          <h1 className="text-light-text dark:text-dark-text font-secondary text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Stay Informed. Stay Ahead.
          </h1>
          <p className="text-light-text/50 dark:text-dark-text font-primary text-lg md:text-xl mb-6">
            Go Premium and Get Access to Unlimited Articles, Unlimited Voice —
            Start Your Journey.
          </p>
          <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110">
            Subscribe Now
          </button>
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] dark:bg-dark-accent dark:opacity-40 opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] dark:bg-dark-accent dark:opacity-90 opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* 2. Subscription Form */}

      <div className="px-3 md:px-0 ">
        <div className="mt-14 lg:mt-24 w-full max-w-xl mx-auto bg-gradient-to-br from-light-primary via-light-text/10 to-light-secondary shadow-2xl p-10 rounded-2xl border-t-4 border-b-4 border-light-accent dark:from-dark-secondary dark:via-dark-secondary dark:to-dark-primary">
          <h3 className="text-3xl text-light-text font-secondary mb-8 text-center tracking-wide dark:text-dark-text">
            Choose Your Plan
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-8">
              <select
                {...register("duration")}
                defaultValue=""
                className="w-full appearance-none px-5 py-3 bg-light-primary dark:bg-dark-accent dark:text-dark-primary bg-opacity-80 border border-light-text/30 rounded-lg font-medium focus:outline-none focus:border-[#211F54] transition"
              >
                <option value="" disabled>
                  Select duration (Days)
                </option>
                {subscriptionOptions.map((opt, i) => (
                  <option key={i} value={opt.duration}>
                    {opt.duration} Days
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-6 h-6 text-light-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <p className="text-center text-xl font-semibold text-light-text mb-8">
              Price:&nbsp;
              <span className="text-light-text/90 font-primary">
                ${selectedPlan ? selectedPlan.price : 0}
              </span>
            </p>

            <button
              type="submit"
              className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-full"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* BELOW OLD CODE */}
    </div>
  );
};

export default Subscription;
