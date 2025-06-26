import { LuChartLine, LuMail, LuPhone, LuSave } from "react-icons/lu";

const Contact = () => {
  return (
    <section id="contact" className="py-10 lg:py-20">
      <div className="container">
        <div className="flex flex-wrap items-center justify-around gap-6">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-md border border-default-200 bg-white/5 text-default-950">
              <LuPhone className="h-10 w-10" />
            </div>
            <h4 className="mt-5 text-xl font-medium text-default-950">
              Call Me
            </h4>
            <p className="mt-1  text-base text-default-800">+0088 66956 66</p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-md border border-default-200 bg-white/5 text-default-950">
              <LuMail className="h-10 w-10" />
            </div>
            <h4 className="mt-5 text-xl font-medium text-default-950">
              Email me
            </h4>
            <p className="mt-1  text-base text-default-800">Dgnr@gmail.com</p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-md border border-default-200 bg-white/5 text-default-950">
              <LuChartLine className="h-10 w-10" />
            </div>
            <h4 className="mt-5 text-xl font-medium text-default-950">
              Flow Me
            </h4>
            <p className="mt-1  text-base text-default-800">Facebook.com</p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-md border border-default-200 bg-white/5 text-default-950">
              <LuSave className="h-10 w-10" />
            </div>
            <h4 className="mt-5 text-xl font-medium text-default-950">
              My Work
            </h4>
            <p className="mt-1  text-base text-default-800">Coderthemes.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
