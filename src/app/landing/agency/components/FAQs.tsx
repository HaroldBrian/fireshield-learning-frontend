import { LuChevronUp } from "react-icons/lu";

import agency11 from "@/assets/images/landing/agency/img-11.jpg";
import agency12 from "@/assets/images/landing/agency/img-12.jpg";
import { faqContents } from "../data";
import { cn } from "@/utils";
import Image from "next/image";

const FAQs = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-md border border-primary bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              FAQ
            </span>
            <h2 className="my-4 text-3xl font-medium capitalize text-default-950">
              Questions fréquentes sur la cybersécurité
            </h2>
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:block">
            <div className="before:absolute before:-start-10 before:-top-10 before:-z-10 before:h-24 before:w-24 before:rotate-180 before:bg-[url('../images/landing/agency/dot.svg')] after:absolute after:-bottom-10 after:-end-10 after:-z-10 after:h-24 after:w-24 after:bg-[url('../images/landing/agency/dot.svg')]" />
          </div>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="lg:pb-20">
              <div className="hs-accordion-group space-y-4">
                {faqContents.map((faq, idx) => {
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "hs-accordion overflow-hidden rounded-lg border  border-default-200 bg-default-50",
                        { active: idx == 0 }
                      )}
                      id={`faq-${idx}`}
                    >
                      <button
                        className="hs-accordion-toggle inline-flex w-full items-center justify-between gap-x-3 px-6 py-4 text-left capitalize text-default-950 transition-all"
                        aria-controls={`faq-accordion-${idx}`}
                      >
                        <h5 className="flex text-base font-medium">
                          {faq.title}
                        </h5>
                        <LuChevronUp className="h-4 w-4 transition-all duration-500 hs-accordion-active:-rotate-180" />
                      </button>
                      <div
                        id={`faq-accordion-${idx}`}
                        className={cn(
                          "hs-accordion-content w-full overflow-hidden transition-[height] duration-300",
                          { hidden: idx != 0 }
                        )}
                        aria-labelledby={`faq-${idx}`}
                      >
                        <div className="px-6 pb-4 pt-0">
                          <p className="text-sm">{faq.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="relative -z-10">
                <Image
                  alt="faqImg"
                  src={agency11}
                  width={432}
                  height={288}
                  className="h-full rounded-md lg:h-72"
                />
              </div>
              <div className="-mt-28 hidden text-end xl:block">
                <div className="ms-auto inline-block rounded-md bg-default-100 p-2 text-end dark:bg-default-50">
                  <Image
                    alt="faqImg"
                    src={agency12}
                    className="ms-auto rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
