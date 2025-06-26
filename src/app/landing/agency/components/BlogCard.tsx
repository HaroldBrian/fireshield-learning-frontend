import { LuMoveRight } from "react-icons/lu";
import Link from "next/link";
import type { BlogType } from "../types";
import Image from "next/image";

const BlogCard = ({ blog }: { blog: BlogType }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-default-200">
      <div className="group p-6">
        <div className="relative overflow-hidden rounded-md">
          <Image src={blog.image} alt="blog" className="rounded-md" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="mt-6 flex gap-5">
          <div>
            <h2 className="text-3xl font-medium text-default-950">{blog.no}</h2>
            <p className="text-lg  uppercase text-default-800">Sep</p>
          </div>
          <div>
            <h2 className="text-2xl font-medium text-default-950">
              {blog.title}
            </h2>
            <p className="mb-5  mt-3 text-base">{blog.description}</p>
            <Link href="" className="text-lg font-medium text-default-950">
              Lire la suite
              <LuMoveRight className="inline-block h-6 w-6 opacity-0 transition-all duration-500 will-change-transform group-hover:translate-x-2 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
